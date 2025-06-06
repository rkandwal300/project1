import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";


const MainLayout = lazy(() => import("./components/shared/MainLayout/MainLayout"));
const InstanceAdviceLayout = lazy(() => import("./components/shared/InstanceAdvice/InstanceAdviceLayout"));

function App() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      import("@/tour/tour").then((tour) => {
        tour.default.start();
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/instanceAdvice" element={<InstanceAdviceLayout />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
