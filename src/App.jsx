import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/themes";
import Header from "./components/shared/header/Header";
import BottomBar from "./components/shared/BottomBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        
        <Container maxWidth="lg" sx={{ flex: 1, display: "flex" }}> 
          <Box sx={{ flex: 1 }}>
            Main Content
          </Box>
        </Container>

        <BottomBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
