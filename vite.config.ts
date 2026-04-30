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
    // Pas de manualChunks custom : Vite/Rollup gèrent le code-splitting
    // automatiquement par route (TanStack autoCodeSplitting) + dynamic imports.
    // Le manuel a causé 2 bugs d'init order (React Activity, motion ReferenceError)
    // car il sépare des modules qui se référencent en cycle.
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
