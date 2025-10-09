import { getTheme } from "./lib/theme";
import { useRoutes } from "react-router";
import { routes } from "./router/router";
import { Suspense, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
 import { AuthProvider } from "./context/AuthContext.jsx";
import LoadingPage from "./components/Loading/LoadingPage.jsx";

function App() {
  const theme = getTheme();
  const routeElements = useRoutes(routes);
  const [hydration, setHydration] = useState(false);
  useEffect(() => {
    setHydration(true);
  }, []);

  if (!hydration) return null;
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LoadingPage />}>{routeElements}</Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
