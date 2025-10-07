import Logo from "../assets/auth/amdLogo.png";
import { Box, Typography, Link } from "@mui/material";
import { AuthCard, LogoImage, GradientButton, LinkRow } from "../components/Auth/AuthCard.styles";
import { useAuth } from "../context/AuthContext";

function Signin() {
  const { login } = useAuth();

  const handleLogin = () => {
    login({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleRegister = () => {
    login({ name: 'John Doe', email: 'john@example.com' });
  }
  return (
    <AuthCard>

      <LogoImage src={Logo} alt="AMD Logo" />

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        EPYC ADVISORY
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <GradientButton onClick={handleLogin} variant="contained" fullWidth>OKTA LOGIN</GradientButton>

        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          or
        </Typography>

        <GradientButton onClick={handleRegister} variant="contained" fullWidth>Register</GradientButton>
      </Box>


      <LinkRow>
        {["Help", "Terms of Use", "Policy"].map((text) => (
          <Link
            key={text}
            href="#"
            underline="hover"
            sx={{ color: "#2d6aeb", cursor: "pointer" }}
          >
            {text}
          </Link>
        ))}
      </LinkRow>
    </AuthCard>
  );
}

export default Signin;
