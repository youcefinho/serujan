import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { About } from "@/components/landing/About";
import { ParentTeam } from "@/components/landing/ParentTeam";
import { InstagramReels } from "@/components/landing/InstagramReels";
import { Pillars } from "@/components/landing/Pillars";
import { Services } from "@/components/landing/Services";
import { Properties } from "@/components/landing/Properties";
import { MarketStats } from "@/components/landing/MarketStats";
import { Deliverables } from "@/components/landing/Deliverables";
import { Testimonials } from "@/components/landing/Testimonials";
import { Process } from "@/components/landing/Process";
import { Calculator } from "@/components/landing/Calculator";
import { LeadMagnet } from "@/components/landing/LeadMagnet";
import { FreeConsultation } from "@/components/landing/FreeConsultation";
import { LeadForm } from "@/components/landing/LeadForm";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Fears } from "@/components/landing/Fears";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { MobileStickyBar } from "@/components/landing/MobileStickyBar";
import { ScrollProgressBar } from "@/components/landing/ScrollProgressBar";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { PropertyAlerts } from "@/components/landing/PropertyAlerts";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-navy text-foreground">
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <StatsBar />

      {/* — QUI EST MATHIS — */}
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <ParentTeam />
      </ScrollReveal>

      {/* — SON APPROCHE — */}
      <ScrollReveal>
        <Fears />
      </ScrollReveal>
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <Process />
      </ScrollReveal>
      <ScrollReveal>
        <Pillars />
      </ScrollReveal>

      {/* — PREUVES — */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <Properties />
      </ScrollReveal>
      <PropertyAlerts />
      <ScrollReveal>
        <InstagramReels />
      </ScrollReveal>

      {/* — OUTILS — */}
      <ScrollReveal>
        <Calculator />
      </ScrollReveal>
      <ScrollReveal>
        <MarketStats />
      </ScrollReveal>

      {/* — CONVERSION — */}
      <ScrollReveal>
        <Deliverables />
      </ScrollReveal>
      <ScrollReveal>
        <LeadMagnet />
      </ScrollReveal>
      <ScrollReveal>
        <FreeConsultation />
      </ScrollReveal>
      <ScrollReveal>
        <LeadForm />
      </ScrollReveal>
      <ScrollReveal>
        <Faq />
      </ScrollReveal>

      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
      <ExitIntentPopup />
      <Toaster />
    </main>
  );
}
