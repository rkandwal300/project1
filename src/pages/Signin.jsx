import Logo from "../assets/auth/amdLogo.png";
import Box from "src/components/template/Box.jsx";
import Typography from "src/components/template/Typography.jsx";
import Link from "src/components/template/Link.jsx";
import {
  AuthCard,
  LogoImage,
  GradientButton,
  LinkRow,
} from "../components/Auth/AuthCard.styles";
import { RoutePaths } from "../router/routePaths";
import { useNavigate } from "react-router";

function Signin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(RoutePaths.LOG_IN);
  };

  const handleRegister = () => {
    navigate(RoutePaths.LOG_IN);
  };
  return (
    <AuthCard>
      <LogoImage src={Logo} alt="AMD Logo" />

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        EPYC ADVISORY
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <GradientButton onClick={handleLogin} variant="contained" fullWidth>
          OKTA LOGIN
        </GradientButton>

        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          or
        </Typography>

        <GradientButton onClick={handleRegister} variant="contained" fullWidth>
          REGISTER
        </GradientButton>
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
