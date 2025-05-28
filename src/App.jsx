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
import PortfolioForm from "./components/shared/PortfolioForm/PortfolioForm";

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
  const bgcolor = themeColor.palette.grey[100];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bgcolor,
      }}
    >
      <ErrorBoundary fallback={"Header component has some Errors"}>
        <Header />
      </ErrorBoundary>

      <Box paddingLeft={"15px"} sx={{ display: "flex", flex: 1 }}>
        <ErrorBoundary fallback={"Sidebar component has some Errors"}>
          <Sidebar />
        </ErrorBoundary>

        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 7 }}>
            <ErrorBoundary
              fallback={"Portfolio form component has some Errors"}
            >
              <PortfolioForm />
              <PortfolioBody />
            </ErrorBoundary>
          </Box>
        </Box>
      </Box>

      <ErrorBoundary fallback={"Bottom bar component has some Errors"}>
        <BottomBar />
      </ErrorBoundary>
      <ErrorBoundary fallback={"Bottom bar component has some Errors"}>
        <Footer />
      </ErrorBoundary>
    </Box>
  );
}

export default App;
