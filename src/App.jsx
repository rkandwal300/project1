import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo } from "react";
import {
  Route,
  Routes,
  useLocation,
  matchPath,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentInstance } from "./redux/features/instanceList/instanceList.selector";
import {
  fetchInstanceType,
  setProvider,
} from "./redux/features/providerData/providerData.slice";
import InstanceAdviceBottomBar from "./components/shared/InstanceAdvice/InstanceAdviceBottomBar";
import BottomBar from "./components/shared/BottomBar";
import Header from "./components/shared/header/Header";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import Footer from "./components/shared/Footer/Footer";
import MainContent from "./components/shared/MainLayout/MainContent";
import InstanceAdviceLayout from "./components/shared/InstanceAdvice/InstanceAdviceLayout";
import TelemetryBottomBar from "./components/shared/Telemetry/TelemetryBottomBar";
import TelemetryLayout from "./components/shared/Telemetry/TelemetryLayout";
import TelemetryDetail from "./components/shared/Telemetry/TelemetryDetail";
import { getProviderConfig } from "./lib/utils";
import TelemetryDetailBottomBar from "./components/shared/TelemetryDetailBottombar";

// Helper to get provider config

const NotFound = () => (
  <Box
    sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    404 page not found
  </Box>
);

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentInstance = useSelector(selectCurrentInstance);

  // Memoize search params and routes
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const type = searchParams.get("type") || "";
  const routes = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );
  const pathname = location.pathname;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      import("@/tour/tour").then((tour) => {
        tour.default.start();
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    dispatch(fetchInstanceType());
  }, [dispatch]);

  useEffect(() => {
    if (pathname === "/" && !currentInstance) {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const provider = getProviderConfig(routes, type);
    dispatch(setProvider(provider));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes.join(","), type]);

  const BottomBarComponent = useMemo(() => {
    if (matchPath("/telemetry/:id", pathname))
      return TelemetryDetailBottomBar;
    if (pathname.startsWith("/telemetry")) return TelemetryBottomBar;
    if (pathname === "/instanceAdvice") return InstanceAdviceBottomBar;
    return BottomBar;
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
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
              <Route
                path="/instanceAdvice"
                element={<InstanceAdviceLayout />}
              />
              <Route path="/telemetry" element={<TelemetryLayout />} />
              <Route path="/telemetry/:id" element={<TelemetryDetail />} />
              <Route path="*" element={<NotFound />} />
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
