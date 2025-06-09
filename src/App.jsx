import "./index.css";
import theme from "./lib/themes";
import "shepherd.js/dist/css/shepherd.css";
import {  CssBaseline, ThemeProvider } from "@mui/material";
import MainLayout from "./components/shared/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import InstanceAdviceLayout from "./components/shared/InstanceAdvice/InstanceAdviceLayout";
import { useEffect ,useRef } from "react";

function App() {
  const ref = useRef(null)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
     if( ref?.current?.click) {
        ref.current.click();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [ref?.current?.click]);
  // const handleStartTour = () => {
  //    import("@/tour/tour").then((tour) => {
  //       tour.default.start();
  //     });
  //   }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    {/* <button ref={ref}   onClick={handleStartTour} style={{
      display: "none",
    }}></button> */}
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/instanceAdvice" element={<InstanceAdviceLayout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
