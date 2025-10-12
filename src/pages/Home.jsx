import Logo from "../assets/auth/amdLogo.png";
import Box from "../components/template/Box.jsx";
import Button from "../components/template/Button.jsx";
import Typography from "../components/template/Typography.jsx";
import {
  AuthCard,
  LogoImage,
  GradientButton,
} from "../components/Auth/AuthCard.styles";
import DialogHoc from "../components/ui/Dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RoutePaths } from "../router/routePaths";

const FeatureCard = ({ data }) => {
  return (
    <AuthCard
      height={320}
      width={340}
      sx={{
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: { xs: "20px", sm: "24px" } }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "12px", sm: "18px" },
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {data.description}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${data.actions.length}, 1fr)`,
            gap: 1.5,
            mt: "auto",
          }}
        >
          {data.actions.map((val) => (
            <GradientButton
              key={val.label}
              onClick={val.onClick}
              variant={val.variant || "outlined"}
              fullWidth
            >
              {val.label}
            </GradientButton>
          ))}
        </Box>
      </Box>
    </AuthCard>
  );
};

function Home() {
  const [tutorial, setTutorial] = useState(null);
  const navigate = useNavigate();
  const CardList = [
    {
      title: "EPYC Cloud Instance Advisor (EIA)",
      description:
        "Receive recommended instance types, sizes, and savings based on resource utilization statistics.",
      actions: [
        { label: "GET DEMO", onClick: () => setTutorial("eia") },
        {
          label: "GET START",
          variant: "contained",
          onClick: () => navigate(RoutePaths.DASHBOARD),
        },
      ],
    },
    {
      title: "EPYC Cloud Cost Advisor (CCA)",
      description:
        "Get real-time cost-saving insights when switching to AMD-powered cloud instances within the same CSP.",
      actions: [
        { label: "GET DEMO", onClick: () => setTutorial("cca") },
        {
          label: "GET START",
          variant: "contained",
          onClick: () => navigate(RoutePaths.DASHBOARD),
        },
      ],
    },
    {
      title: "EPYC Performance Portal (EPP)",
      description:
        "Obtain generation-to-generation and competitive workload performance data for leading cloud service providers.",
      actions: [
        {
          label: "GET START",
          variant: "contained",
          onClick: () => {
            alert("Not implemented yet");
          },
        }, // TODO: yet have to implement
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoImage src={Logo} alt="AMD Logo" />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "24px", sm: "31px" },
            color: "#fff",
          }}
        >
          EPYC ADVISORY
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        <DialogHoc
          open={tutorial != null}
          sx={{
            width: "100%",
            maxWidth: "100%",
          }}
          content={({ handleClose: onClose }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "80vh",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  onClose();
                  setTutorial(null);
                }}
                sx={{ alignSelf: "flex-end", m: 2 }}
              >
                Close
              </Button>

              <Box sx={{ flex: 1, borderRadius: 2, overflow: "hidden" }}>
                <iframe
                  src="https://d2008bczhvnw5c.cloudfront.net/"
                  title="EIA Dashboard"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          )}
        />

        {CardList.map((val) => (
          <FeatureCard key={val.title} data={val} />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
