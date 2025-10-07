import { createTheme } from "@mui/material/styles";

const palette = {
  mode: "light",
  primary: { main: "#116bd9", contrastText: "#fff" },
  secondary: { main: "#2b2d2e", contrastText: "#5c5c5c", default: '#999' },
  background: { default: "#000000ff", paper: "#1f1f1f" },
  text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)" },
};

const themeModes = {
  light: {
    palette,
  },
  dark: {
    palette,
  },
};

const commonSettings = {
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
  },
};

export const getTheme = (mode = "light") => {
  const themeConfig = themeModes[mode] || themeModes.light;
  return createTheme({
    ...commonSettings,
    ...themeConfig,
  });
};
