import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import BottomBar from "./components/shared/BottomBar";
import Header from "./components/shared/header/Header";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import PortfolioBody from "./components/shared/PortfolioBody";
import Footer from "./components/shared/Footer/Footer/Footer";
import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import InstanceForm from "./components/shared/Form/InstanceForm";
import { Suspense } from "react";
import FormSkeleton from "./components/shared/Form/FormSkeleton";
import { useSelector } from "react-redux";
import { selectHideInstances } from "./redux/features/form/formData.selector";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
}

function MainLayout() {
  const themeColor = useTheme();
  const showTable = useSelector(selectHideInstances)
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: themeColor.palette.background.default,
      }}
    >
      {/* #0000ff */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <ErrorBoundary fallback={"Header component has some Errors"}>
          <Header />
        </ErrorBoundary>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-start",
            mt: 8,
            p: 0,
          }}
        >
          <ErrorBoundary fallback={"Sidebar component has some Errors"}>
            <Sidebar />
          </ErrorBoundary>

          <Box
            sx={{
              flex: 1,
              p: 0,
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                overflowY: "auto", 
                bgcolor: "primary.contrastText",
                boxShadow: 3,
                borderRadius: "0 0 14px  14px ",
              }}
            >
              <ErrorBoundary
                fallback={"Instance form component has some Errors"}
              >
             <Suspense fallback={<FormSkeleton />}>
                <InstanceForm />
              </Suspense>
              </ErrorBoundary>
              <ErrorBoundary
                fallback={"Portfolio form component has some Errors"}
              > 
               {showTable== false && <PortfolioBody />}
              </ErrorBoundary>
            </Box>
          </Box>
        </Box>
        <ErrorBoundary fallback={"Bottom bar component has some Errors"}>
          <BottomBar />
        </ErrorBoundary>
      </Box>
      <ErrorBoundary fallback={"Bottom bar component has some Errors"}>
        <Footer />
      </ErrorBoundary>
    </Box>
  );
}

export default App;
