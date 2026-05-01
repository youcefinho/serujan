import { useEffect } from "react";
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import { GhlPixel } from "@/components/GhlPixel";
import { MetaPixel } from "@/components/MetaPixel";
import { ClarityTag } from "@/components/ClarityTag";
import { CookieBanner } from "@/components/CookieBanner";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { useTimeOnPage } from "@/hooks/useTimeOnPage";

function NotFoundComponent() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black-deep px-6 overflow-hidden">
      {/* Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-lg text-center">
        <div className="font-display text-[8rem] md:text-[10rem] leading-none text-gold-gradient italic tabular-nums">
          404
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-px bg-gold/50" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
            {isEn ? "Page not found" : "Page introuvable"}
          </span>
          <span className="w-8 h-px bg-gold/50" aria-hidden />
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight text-balance">
          {isEn ? "This page does not exist." : "Cette page n'existe pas."}
        </h1>
        <p className="mt-5 text-foreground/55 leading-relaxed text-pretty">
          {isEn
            ? "The page you are looking for has been moved or never existed."
            : "La page que vous cherchez a été déplacée ou n'a jamais existé."}
        </p>
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>{isEn ? "Back to home" : "Retour à l'accueil"}</span>
        </Link>
      </div>
    </main>
  );
}

function SkipLink() {
  const { lang } = useLanguage();
  return (
    <a
      href="#hero"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-black-deep focus:font-semibold focus:rounded-md focus:shadow-gold"
    >
      {lang === "en" ? "Skip to content" : "Aller au contenu"}
    </a>
  );
}

function RootComponent() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Tracking engagement enrichi (scroll depth + time on page)
  useScrollDepth();
  useTimeOnPage();

  return (
    <LanguageProvider>
      <SkipLink />
      <GhlPixel />
      <MetaPixel />
      <ClarityTag />
      <Outlet />
      <CookieBanner />
    </LanguageProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});
