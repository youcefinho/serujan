import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhySerujan from "@/components/landing/WhySerujan";
import Testimonials from "@/components/landing/Testimonials";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Process from "@/components/landing/Process";
import LendersNetwork from "@/components/landing/LendersNetwork";
import Bio from "@/components/landing/Bio";
import MidPageCTA from "@/components/landing/MidPageCTA";
import Calculator from "@/components/landing/Calculator";
import Faq from "@/components/landing/Faq";
import Elev8Event from "@/components/landing/Elev8Event";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import MobileStickyBar from "@/components/landing/MobileStickyBar";
import ExitIntent from "@/components/landing/ExitIntent";
import { ScrollProgressBar } from "@/components/landing/ScrollProgressBar";
import { BackToTop } from "@/components/landing/BackToTop";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";

// ═══════════════════════════════════════════════════════════
// Tunnel de conversion v3 — ordre AIDA optimisé
// 1. Hero (attention + offre claire)
// 2. WhySerujan (intérêt — preuve réseau/expertise/résultats)
// 3. Testimonials (preuve sociale tôt — capitalise sur la curiosité)
// 4. Services (intérêt — quoi exactement)
// 5. About (désir — vision / méthodologie)
// 6. Process (rassurer — comment ça se passe)
// 7. LendersNetwork (autorité — accès qui fait la différence) [desktop only]
// 8. Bio (désir — qui est Serujan)
// 9. MidPageCTA (capture intermédiaire 2-champs)
// 10. Calculator (engagement + capture email léger)
// 11. Faq (lever les dernières objections)
// 12. Elev8Event (community + écosystème)
// 13. LeadForm (action — formulaire qualifié 3 obligatoires)
// + ExitIntent (rattrapage si départ imminent)
//
// Sections masquées sur mobile pour raccourcir le scroll : About, LendersNetwork
// (contenu déjà couvert par WhySerujan/Bio/FAQ).
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
      <Hero />
      <WhySerujan />
      <Testimonials />
      <Services />
      <div className="hidden md:block">
        <About />
      </div>
      <Process />
      <div className="hidden md:block">
        <LendersNetwork />
      </div>
      <Bio />
      <MidPageCTA />
      <Calculator />
      <Faq />
      <Elev8Event />
      <LeadForm />
      <Footer />
      <MobileStickyBar />
      <BackToTop />
      <WhatsAppFab />
      <ExitIntent />
      <Toaster />
    </main>
  );
}
