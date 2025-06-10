import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react")) return "react";
          if (id.includes("@mui") || id.includes("@emotion")) return "mui";
          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) return "redux";
          if (id.includes("react-router-dom")) return "router";
          if (id.includes("zod")) return "zod";
          if (id.includes("shepherd.js")) return "tour";
          if (id.includes("react-hook-form") || id.includes("@hookform/resolvers")) return "forms";
          if (id.includes("@tanstack/react-table")) return "table";
          return "vendor";
        },
      },
    },
  },
});