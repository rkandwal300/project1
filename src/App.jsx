import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MainLayout from "./components/shared/MainLayout/MainLayout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
