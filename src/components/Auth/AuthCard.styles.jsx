import Box from "src/components/template/Box.jsx";
import Button from "src/components/template/Button.jsx";
import { styled } from "src/components/template/styled.jsx";

export const GRADIENT_MAIN = "linear-gradient(90deg, #08B1D0 0%, #006879 100%)";
export const GRADIENT_HOVER = "linear-gradient(90deg, #06a0bb 0%, #005a6a 100%)";


export const AuthCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== "height" && prop !== "width",
})(({ theme, height, width }) => ({
    width: width || 395,
    height: height || 375,
    backgroundColor: "rgba(168, 161, 161, 0.36)",
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(4),
    textAlign: "center",
    color: "#fff",
    backdropFilter: "blur(8px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

export default AuthCard;


export const LogoImage = styled("img")({
    marginBottom: 8,
    marginInline: "auto",
    height: 40,
});

export const GradientButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "variant",
})(({ variant }) => ({
    width: "100%",
    padding: "12px 0",
    textTransform: "none",
border: "1px solid #0490A9",
    ...(variant === "contained"
        ? {
            background: GRADIENT_MAIN,
            color: "#fff",
            "&:hover": { background: GRADIENT_HOVER },
        }
        : {
            background: "transparent",
            color: "#08B1D0",
            "&:hover": {
                background: "rgba(8, 177, 208, 0.1)",
            },
        }),
}));

export const LinkRow = styled(Box)({
    display: "flex",
    justifyContent: "center",
    gap: "34px",
    marginTop: "16px",
    fontSize: "14px",
    fontWeight: 600,
});
