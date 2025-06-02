import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MainLayout from "./components/shared/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom"; 
import InstanceAdviceLayout from "./components/shared/InstanceAdvice/InstanceAdviceLayout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        
          <Route path="/" element={<MainLayout />} />
          <Route path="/instanceAdvice" element={<InstanceAdviceLayout />} />
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
