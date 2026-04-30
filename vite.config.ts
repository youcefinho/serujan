import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("/motion/")) return "vendor-motion";
            if (id.includes("/@tanstack/")) return "vendor-tanstack";
            if (id.includes("/lucide-react/")) return "vendor-icons";
            // React 19 + ses dépendances directes doivent être dans le MÊME chunk.
            // Sinon scheduler/use-sync-external-store init avant React et tente
            // d'accéder à des APIs (ex: Activity) qui ne sont pas encore définies
            // → "Cannot set properties of undefined (setting 'Activity')".
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/") ||
              id.includes("/use-sync-external-store/")
            ) {
              return "vendor-react";
            }
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
