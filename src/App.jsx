import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import theme from "./lib/themes";
import Header from "./components/shared/header/Header";
import BottomBar from "./components/shared/BottomBar";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import ErrorBoundary from "./components/shared/ErrorBoundary";

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

      <Box paddingLeft={'15px'} sx={{ display: "flex", flex: 1, }}>
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 7  }}>
            {Array.from({ length: 11 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  flex: "1 1 200px",
                  minHeight: 100,
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  boxShadow: 1,
                  p: 2,
                }}
              >
                Main Content {i + 1}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <ErrorBoundary fallback={"Bottom bar component has some Errors"}>
        <BottomBar />
      </ErrorBoundary>
    </Box>
  );
}

export default App;
