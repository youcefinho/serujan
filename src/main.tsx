// Entrée de l'app : monte React + TanStack Router, importe les polices
// self-hosted, retire le loader HTML.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { initWebVitals } from "@/lib/web-vitals";

// Polices self-hosted (zéro appel réseau, immune aux blocages CSP)
import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/inter/index.css";

import "./styles.css";

// Create the router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  defaultPreload: "intent", // Hover prefetch — pages pre-loadées au hover des liens
});

// Register the router for type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Remove loading spinner once React mounts
const loader = document.getElementById("app-loader");
if (loader) {
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 300);
}

// Initialize Web Vitals reporting (RUM → GA4)
initWebVitals();

// Mount the app — wrapped in ErrorBoundary pour filet de sécurité runtime
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
