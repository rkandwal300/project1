import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MainLayout from "./components/shared/MainLayout/MainLayout";
import InstanceAdviceLayout from "./components/shared/InstanceAdvice/InstanceAdviceLayout";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentInstance } from "./redux/features/instanceList/instanceList.selector";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const currentInstance = useSelector(selectCurrentInstance);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      import("@/tour/tour").then((tour) => {
        tour.default.start();
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (pathname !== "/" && currentInstance == null) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/:id" element={<MainLayout />} />
        <Route path="/instanceAdvice" element={<InstanceAdviceLayout />} />
        <Route path="/instanceAdvice/:id" element={<p>404 page not found</p>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
