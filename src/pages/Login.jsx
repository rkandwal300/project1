// LoginPage.jsx
import React, { useState } from "react";
import Box from "../components/template/Box.jsx";
import Button from "../components/template/Button.jsx";
import TextField from "../components/template/TextField.jsx";
import Typography from "../components/template/Typography.jsx";
import Card from "../components/template/Card.jsx";
import CardContent from "../components/template/CardContent.jsx";
import CardActions from "../components/template/CardActions.jsx";
import InputAdornment from "../components/template/InputAdornment.jsx";
import IconButton from "../components/template/IconButton.jsx";
import amdLogo from "../assets/auth/amdLogo-dark.png";
import Cookies from "js-cookie";
import apiClient from "../service/apiService";
import { RoutePaths } from "../router/routePaths";
import { useDispatch } from "react-redux";
import { setUserData, toggleUserLoggedIn } from "../store/slice/uiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "../schemas/login.schema";
import { VisibilityIcon, VisibilityOffIcon } from "../components/template/icons.js";
import { showSnackbar, SNACKBAR_TYPE } from "../store/slice/snackbarSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prev) => !prev);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    // const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    try {
      const encryptedPassword = btoa(password);
      const loginData = { email, password: encryptedPassword };
      const response = await apiClient.LoginAPI(loginData);

      if (response?.response?.status === 401) {
        dispatch(
          showSnackbar({
            message: "Username and password are invalid",
            type: SNACKBAR_TYPE.ERROR,
          })
        );
        return;
      }

      if (response.data.ErrorCode === -1) {
        dispatch(
          showSnackbar({
            message: response.data.Message,
            type: SNACKBAR_TYPE.ERROR,
          })
        );
        return;
      }
      const userInfoResponse = await fetch(
        `${import.meta.env.VITE_CS_API}/getUserToken`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: `Bearer ${response.data.jwtToken}`,
          },
          body: JSON.stringify({ application: "CCA" }), //TODO: This is hard code value remove this
        }
      );

      const userInfo = await userInfoResponse.json();
      dispatch(
        showSnackbar({
          message: "User Logged in successfully",
          type: SNACKBAR_TYPE.SUCCESS,
        })
      );
      const cookieOptions = { expires: 1, secure: true, sameSite: "strict" };

      Cookies.set(
        "jwt_token",
        userInfo.Data.UserData.accessToken,
        cookieOptions
      );
      Cookies.set("email", userInfo.Data.UserData.userEmail, cookieOptions);
      Cookies.set("username", userInfo.Data.UserData.userEmail, cookieOptions);
      dispatch(toggleUserLoggedIn(true));
      dispatch(setUserData(userInfo.Data));
      setTimeout(() => {
        window.location.href = RoutePaths.HOME;
      }, 1000);
    } catch (error) {
      console.log({ error });
      dispatch(
        showSnackbar({
          message: "Login failed. Please try again.",
          type: SNACKBAR_TYPE.ERROR,
        })
      );
    }
  };

  return (
    <Card
      sx={{
        minWidth: 400,
        maxWidth: "80%",
        color: "background.default",
        bgcolor: "primary.contrastText",
        pb: 6,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="h2">
          <Box component="img" src={amdLogo} alt={"AMD"} width={120} />
        </Box>
        <Typography gutterBottom variant="h4" fontWeight={600}>
          Sign-In
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "0.3rem",
          }}
        >
          <Typography variant="subtitle1" component="div">
            Email
          </Typography>
          <TextField
            type="email"
            placeholder="enduser@amd.com"
            variant="outlined"
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "background.default",
                },
                "&:hover fieldset": {
                  borderColor: "background.default",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "background.default",
                },
                "& input": {
                  color: "background.default",
                },
              },
            }}
          />

          {/* Password field */}
          <Typography variant="subtitle1" component="div" mt="1rem">
            Password
          </Typography>
          <TextField
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="*****"
            size="small"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              color: "background.default",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "background.default",
                },
                "&:hover fieldset": {
                  borderColor: "background.default",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "background.default",
                },
                "& input": {
                  color: "background.default",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggle}
                    edge="end"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button
          type="submit"
          sx={{
            fontWeight: 500,
            color: "primary.contrastText",
            bgcolor: "background.default",
          }}
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginPage;
