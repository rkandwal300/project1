import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/themes";
import Header from "./components/shared/header/Header";
import BottomBar from "./components/shared/BottomBar";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import ErrorBoundary from "./components/shared/ErrorBoundary";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        x={{ backgroundColor: "#f5f5f5" }}
      >
        <ErrorBoundary fallback={"Header component has some Errors"}>
          <Header />
        </ErrorBoundary>

        <Box display="flex" flex={1} minHeight="0" marginLeft={"15px"}>
          <ErrorBoundary fallback={"Header component has some Errors"}>
            <Sidebar />
          </ErrorBoundary>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 7 }}>
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
    </ThemeProvider>
  );
}

export default App;
