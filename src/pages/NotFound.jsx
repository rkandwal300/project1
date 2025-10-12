import Box from "../components/template/Box.jsx";
import Typography from "../components/template/Typography.jsx";
import { useNavigate } from "react-router";
import { GradientButton } from "../components/Auth/AuthCard.styles";
import styled from "@emotion/styled";

const NotFoundWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: white;
  overflow: hidden;
`;

const GradientText = styled(Typography)`
  font-size: 10rem;
  font-weight: 800;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  letter-spacing: -3px;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }
`;

const Subtitle = styled(Typography)`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: #e0e0e0;
  max-width: 500px;
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <GradientText variant="h1">404</GradientText>
      <Subtitle variant="h6">
        {"Oops! The page you're looking for doesn’t exist or has been moved."}
      </Subtitle>
      <GradientButton
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ px: 4, py: 1.5, fontWeight: 600 }}
      >
        Go Home
      </GradientButton>
    </NotFoundWrapper>
  );
}
