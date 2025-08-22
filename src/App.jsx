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
import CostAdviceLayout from "./components/shared/cca/costAdvice/CostAdviceLayout";
import CCAMainContent from "./components/shared/cca/MainLayout/MainContent";
import CloudUsageReports from "./components/shared/cca/CloudUsageReport";
import CloudInstances from "./components/shared/cca/CloudInstances";
import { isEIA, ROUTES } from "./lib/router";

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

const App = () => {
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
    if (matchPath(ROUTES.TELEMETRY_DETAIL, pathname))
      return TelemetryDetailBottomBar;
    if (pathname.startsWith(ROUTES.TELEMETRY)) return TelemetryBottomBar;
    if (pathname === ROUTES.INSTANCE_ADVICE || pathname == ROUTES.COST_ADVISORY)
      return InstanceAdviceBottomBar;
    if (pathname === ROUTES.CLOUD_USAGE_REPORT) return () => <></>;
    if (pathname === ROUTES.EXPLORER) return () => <></>;
    return BottomBar;
  }, [pathname]);
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
            {![ROUTES.SUPPORT, ROUTES.RELEASE_NOTES,ROUTES.EXPLORER].includes(pathname) && (
              <Sidebar />
            )}
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
                  path={ROUTES.ROOT}
                  element={isEIA() ? <MainContent /> : <CCAMainContent />}
                />

                <Route
                  path={ROUTES.CLOUD_USAGE_REPORT}
                  element={<CloudUsageReports />}
                />
                <Route
                  path={ROUTES.CLOUD_USAGE_REPORT_DETAILS}
                  element={<CloudInstances />}
                />
                <Route
                  path={ROUTES.COST_ADVISORY}
                  element={<CostAdviceLayout />}
                />
                <Route path={ROUTES.EXPLORER} element={<Explorer />} />
                <Route path={ROUTES.SUPPORT} element={<Support />} />
                <Route
                  path={ROUTES.RELEASE_NOTES}
                  element={<ReleaseNotesPage />}
                />
                <Route
                  path={ROUTES.DETAIL}
                  element={isEIA() ? <MainContent /> : <CCAMainContent />}
                />
                <Route
                  path={ROUTES.INSTANCE_ADVICE}
                  element={<InstanceAdviceLayout />}
                />
                <Route path={ROUTES.TELEMETRY} element={<TelemetryLayout />} />
                <Route
                  path={ROUTES.TELEMETRY_DETAIL}
                  element={<TelemetryDetail />}
                />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
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
