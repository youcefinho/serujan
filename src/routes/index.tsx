import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

// Sync — above-the-fold critique (chargés avec le main bundle)
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhySerujan from "@/components/landing/WhySerujan";
import MobileStickyBar from "@/components/landing/MobileStickyBar";
import { ScrollProgressBar } from "@/components/landing/ScrollProgressBar";
import { BackToTop } from "@/components/landing/BackToTop";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";

// Lazy — bottom-of-fold (capturés en chunks séparés, chargés à la demande)
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const Services = lazy(() => import("@/components/landing/Services"));
const Process = lazy(() => import("@/components/landing/Process"));
const MidPageCTA = lazy(() => import("@/components/landing/MidPageCTA"));
const Calculator = lazy(() => import("@/components/landing/Calculator"));
const Bio = lazy(() => import("@/components/landing/Bio"));
const Faq = lazy(() => import("@/components/landing/Faq"));
const Elev8Event = lazy(() => import("@/components/landing/Elev8Event"));
const About = lazy(() => import("@/components/landing/About"));
const LendersNetwork = lazy(() => import("@/components/landing/LendersNetwork"));
const LeadForm = lazy(() => import("@/components/landing/LeadForm"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const ExitIntent = lazy(() => import("@/components/landing/ExitIntent"));

// ═══════════════════════════════════════════════════════════
// Tunnel de conversion v4 — ordre AIDA resserré
// 1. Hero (attention — offre claire en 3s + typewriter sous-titre)
// 2. WhySerujan (intérêt — 3 trust signals chiffrés)
// 3. Testimonials (preuve sociale — tôt dans le scroll)
// 4. Services (intérêt — quoi exactement)
// 5. Process (rassurer — comment ça se passe)
// 6. MidPageCTA (capture warm — 2 champs)
// 7. Calculator (engagement — outil interactif + capture email)
// 8. Bio (désir — qui est Serujan)
// 9. Faq (lever objections)
// 10. Elev8Event (bonus — écosystème)
// -- About + LendersNetwork (desktop only, non essentiels au tunnel)
// 11. LeadForm (action — formulaire 3 champs + accordéon)
// + ExitIntent (rattrapage si départ imminent)
// ═══════════════════════════════════════════════════════════

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <MouseSpotlight />
      <ScrollProgressBar />
      <Navbar />

      {/* ═══ TUNNEL AIDA RESSERRÉ ═══ */}

      {/* 1. ATTENTION — offre claire en 3 secondes */}
      <Hero />

      {/* 2. INTÉRÊT — 3 trust signals immédiats */}
      <WhySerujan />

      {/* 3. PREUVE SOCIALE — visible dès scroll 15-20% */}
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>

      {/* 4. INTÉRÊT — quoi exactement */}
      <Suspense fallback={null}>
        <Services />
      </Suspense>

      {/* 5. RASSURER — comment ça se passe */}
      <Suspense fallback={null}>
        <Process />
      </Suspense>

      {/* 6. CAPTURE WARM — 2 champs, visiteurs à mi-scroll */}
      <Suspense fallback={null}>
        <MidPageCTA />
      </Suspense>

      {/* 7. ENGAGEMENT — outil interactif + capture email */}
      <Suspense fallback={null}>
        <Calculator />
      </Suspense>

      {/* 8. DÉSIR — qui est Serujan */}
      <Suspense fallback={null}>
        <Bio />
      </Suspense>

      {/* 9. LEVER OBJECTIONS */}
      <Suspense fallback={null}>
        <Faq />
      </Suspense>

      {/* 10. BONUS — écosystème Elev8 (desktop + mobile) */}
      <Suspense fallback={null}>
        <Elev8Event />
      </Suspense>

      {/* Desktop only — contenu enrichi non essentiel au tunnel */}
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <About />
        </Suspense>
      </div>
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <LendersNetwork />
        </Suspense>
      </div>

      {/* 11. ACTION — formulaire principal */}
      <Suspense fallback={null}>
        <LeadForm />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <MobileStickyBar />
      <BackToTop />
      <WhatsAppFab />

      {/* Modal lazy — rattrapage si départ imminent */}
      <Suspense fallback={null}>
        <ExitIntent />
      </Suspense>
      <Toaster />
    </main>
  );
}
