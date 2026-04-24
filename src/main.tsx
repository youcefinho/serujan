import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { attachCalendlyListener } from "./lib/calendly";
import "./styles.css";

// Create the router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
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

// Start listening for Calendly booking events
attachCalendlyListener();

// Mount the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
