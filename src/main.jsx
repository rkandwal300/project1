import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { basePath, ROUTES } from "./lib/router";

const pathname = window.location.pathname;

// Redirect manually before React Router renders
if (pathname === "/") {
  window.location.replace(ROUTES.ROOT);
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        fallback={"Sorry, due to technical reason an error occurred "}
      >
        <BrowserRouter  basePath={basePath}>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
