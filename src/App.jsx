import { getTheme } from "./lib/theme";
import { useRoutes } from "react-router";
import { routes } from "./router/router";
import { Suspense, useState, useEffect } from "react";
import LoadingPage from "./components/Loading/LoadingPage.jsx";
import { store } from "./store/store.js";
import CustomSnackbar from "./components/CustomSnackbar.jsx";
import { Provider } from "react-redux";
import { ThemeProvider,CssBaseline } from "./components/template/index.js"; 
function App() {
  const theme = getTheme();
  const routeElements = useRoutes(routes);
  const [hydration, setHydration] = useState(false);
  useEffect(() => {
    setHydration(true);
  }, []);

  if (!hydration) return null;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LoadingPage />}>{routeElements}</Suspense>
        <CustomSnackbar />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
