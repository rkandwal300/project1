import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { basePath } from "./lib/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        fallback={"Sorry, due to technical reason an error occurred "}
      >
        <BrowserRouter  basename={basePath}>
          <App basePath={basePath} />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
