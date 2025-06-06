import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import react from "@vitejs/plugin-react-swc";

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
          // Customize chunk splitting
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("@mui")) return "mui";
            if (id.includes("zod")) return "zod";
            if (id.includes("shepherd.js")) return "tour";
            if (id.includes("react-hook-form")) return "forms";
          }
        },
      },
    },
  },
});

// add manual chunks
// convert img to avif
