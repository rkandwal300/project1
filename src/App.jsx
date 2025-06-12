import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentInstance } from "./redux/features/instanceList/instanceList.selector";
import Header from "./components/shared/header/Header";
import Footer from "./components/shared/Footer/Footer";
import BottomBar from "./components/shared/BottomBar";
import InstanceAdviceBottomBar from "./components/shared/InstanceAdvice/InstanceAdviceBottomBar";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import MainContent from "./components/shared/MainLayout/MainContent";
import InstanceAdviceLayout from "./components/shared/InstanceAdvice/InstanceAdviceLayout";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentInstance = useSelector(selectCurrentInstance);
 
  const pathname = useMemo(() => location.pathname, [location]);
 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      import("@/tour/tour").then((tour) => {
        tour.default.start();
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
 
  useEffect(() => {
    if (pathname == "/" && currentInstance== null) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const BottomBarComponent = pathname === "/instanceAdvice"
    ? InstanceAdviceBottomBar
    : BottomBar;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <Box display="flex" flexDirection="column" flex={1}>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-start",
              mt: 8,
              p: 0,
            }}
          >
            <Sidebar />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/:id" element={<MainContent />} />
              <Route path="/instanceAdvice" element={<InstanceAdviceLayout />} />
              <Route path="/instanceAdvice/:id" element={<p>404 page not found</p>} />
            </Routes>
          </Box>
          <BottomBarComponent />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
