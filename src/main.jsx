import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      fallback={"Sorry, due to technical reason an error occurred "}
      children={<App />}
    />
  </StrictMode>
);
