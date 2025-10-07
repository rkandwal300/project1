import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router";

/**
 * @param {string} _url
 */
export function render(_url) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={_url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html };
}
