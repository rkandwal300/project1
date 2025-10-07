import { getTheme } from "./lib/theme";
import { useRoutes } from "react-router";
import { routes } from "./router/router";
import { Suspense, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LoadingSkeleton from "./components/Loading/LoadingSkeleton";
import { AuthProvider } from "./context/AuthContext.jsx";

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
        <Suspense fallback={<LoadingSkeleton />}>{routeElements}</Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
