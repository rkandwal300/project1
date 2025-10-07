import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../lib/theme";

const AVAILABLE_MODES = ["light", "dark"];
const ThemeModeContext = createContext({
  mode: "light",
  setMode: () => {},
  availableModes: AVAILABLE_MODES,
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("app_theme_mode");
      return saved || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_theme_mode", mode);
    } catch {}
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const contextValue = useMemo(() => ({ mode, setMode, availableModes: AVAILABLE_MODES }), [mode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
