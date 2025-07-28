import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { Box, CssBaseline, Skeleton, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, Suspense, lazy } from "react";
import {
  Route,
  Routes,
  useLocation,
  matchPath,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentInstance } from "./redux/features/instanceList/instanceList.selector";
import {
  fetchInstanceType,
  setProvider,
} from "./redux/features/providerData/providerData.slice";
import { getProviderConfig } from "./lib/utils";
import Footer from "./components/shared/Footer/Footer";
import Header from "./components/shared/header/Header";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import NotFound from "./components/shared/NotFound";
import { selectCurrentProviderName } from "./redux/features/providerData/providerData.selector";
import Support from "./components/shared/Support";
import ReleaseNotesPage from "./components/shared/ReleaseNotesPage";
import Explorer from "./components/shared/cca/Explorer/Explorer";
import { CCA_LINKS } from "./components/shared/header/CCATitle";
import CostAdviceLayout from "./components/shared/cca/costAdvice/CostAdviceLayout";
import CCAMainContent from "./components/shared/cca/MainLayout/MainContent";
import CloudUsageReports from "./components/shared/cca/CloudUsageReport";
import CloudInstances from "./components/shared/cca/CloudInstances";
import { basePath, ROUTES } from "./lib/router";

// Lazy loaded components
const MainContent = lazy(() =>
  import("./components/shared/MainLayout/MainContent")
);
const InstanceAdviceLayout = lazy(() =>
  import("./components/shared/InstanceAdvice/InstanceAdviceLayout")
);
const TelemetryLayout = lazy(() =>
  import("./components/shared/Telemetry/TelemetryLayout")
);
const TelemetryDetail = lazy(() =>
  import("./components/shared/Telemetry/TelemetryDetail")
);
const InstanceAdviceBottomBar = lazy(() =>
  import("./components/shared/InstanceAdvice/InstanceAdviceBottomBar")
);
const BottomBar = lazy(() => import("./components/shared/BottomBar"));
const TelemetryBottomBar = lazy(() =>
  import("./components/shared/Telemetry/TelemetryBottomBar")
);
const TelemetryDetailBottomBar = lazy(() =>
  import("./components/shared/TelemetryDetailBottombar")
);

// NotFound can be inline since it's very small

const App = ({ basePath }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentInstance = useSelector(selectCurrentInstance);

  const type = useSelector(selectCurrentProviderName);
  const routes = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );
  const pathname = location.pathname;

  useEffect(() => {
    window.speechSynthesis.cancel();
    const timeoutId = setTimeout(() => {
      import("@/tour/tour").then((tour) => {
        tour.default?.start();
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
    if (matchPath("/telemetry/:id", pathname)) return TelemetryDetailBottomBar;
    if (pathname.startsWith("/telemetry")) return TelemetryBottomBar;
    if (pathname === "/instanceAdvice" || pathname == "/cca-costAdvisory")
      return InstanceAdviceBottomBar;
    if (pathname === CCA_LINKS.CLOUD_USAGE_REPORT) return () => <></>;
    if (pathname === CCA_LINKS.EXPLORER) return () => <></>;
    return BottomBar;
  }, [pathname]);
 
  console.log("hellow app");
  if (location.pathname === '/') {
    return <Navigate to={basePath} replace />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box height={"100vh"} display="flex" flexDirection="column" flex={1}>
          <Box
            sx={{
              display: "flex",
              flex: 1,

              justifyContent: "flex-start",
              mt: 8,
              p: 0,
            }}
          >
            {!["/support", "/release-notes"].includes(pathname) && <Sidebar />}
            <Suspense
              fallback={
                <Box
                  flex={1}
                  p={3}
                  gap="20px"
                  display="flex"
                  flexDirection="column"
                >
                  <Skeleton variant="rectangular" width="100%" height={80} />
                  <Skeleton variant="rectangular" width="100%" height={80} />
                  <Skeleton variant="rectangular" width="100%" height={80} />
                  <Skeleton variant="rectangular" width="100%" height={80} />
                </Box>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    basePath !== "/" ? (
                      <Navigate to={basePath} replace />
                    ) : (
                      <MainContent />
                    )
                  }
                />

                <Route
                  path={CCA_LINKS.MANAGE_PORTFOLIO}
                  element={<CCAMainContent />}
                />
                <Route
                  path={CCA_LINKS.CLOUD_USAGE_REPORT}
                  element={<CloudUsageReports />}
                />
                <Route
                  path={CCA_LINKS.CLOUD_USAGE_REPORT_DETAILS}
                  element={<CloudInstances />}
                />
                <Route
                  path="/cca-costAdvisory"
                  element={<CostAdviceLayout />}
                />
                <Route path="/cca-explorer" element={<Explorer />} />
                <Route path="/support" element={<Support />} />
                <Route path="/release-notes" element={<ReleaseNotesPage />} />
                <Route path="/:id" element={<MainContent />} />
                <Route
                  path="/instanceAdvice"
                  element={<InstanceAdviceLayout />}
                />
                <Route path="/telemetry" element={<TelemetryLayout />} />
                <Route path="/telemetry/:id" element={<TelemetryDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Box>
          <Suspense fallback={null}>
            <BottomBarComponent />
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
