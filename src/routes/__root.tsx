import { useEffect } from "react";
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";

function NotFoundComponent() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {isEn ? "Page not found" : "Page introuvable"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEn
            ? "The page you are looking for does not exist or has been moved."
            : "La page que vous cherchez n'existe pas ou a été déplacée."}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isEn ? "Back to home" : "Retour à l'accueil"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force le scroll en haut au chargement
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});
