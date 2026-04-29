import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ValueCards from "@/components/landing/ValueCards";
import StatsBar from "@/components/landing/StatsBar";
import Elev8Event from "@/components/landing/Elev8Event";
import Podcast from "@/components/landing/Podcast";
import Process from "@/components/landing/Process";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Elev8Academy from "@/components/landing/Elev8Academy";
import Calculator from "@/components/landing/Calculator";
import FreeConsultation from "@/components/landing/FreeConsultation";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import MobileStickyBar from "@/components/landing/MobileStickyBar";
import { ScrollProgressBar } from "@/components/landing/ScrollProgressBar";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import ExitIntentPopup from "@/components/landing/ExitIntentPopup";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <ScrollProgressBar />
      <Navbar />
      <Hero />

      {/* — VALEUR AJOUTÉE — */}
      <section id="value-cards">
        <ScrollReveal>
          <ValueCards />
        </ScrollReveal>
      </section>
      <StatsBar />

      {/* — ELEV8 — */}
      <ScrollReveal>
        <Elev8Event />
      </ScrollReveal>
      <Podcast />

      {/* — PROCESSUS & APPROCHE — */}
      <ScrollReveal>
        <Process />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>

      {/* — SERVICES — */}
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <Elev8Academy />
      </ScrollReveal>

      {/* — SIMULATEUR — */}
      <ScrollReveal>
        <Calculator />
      </ScrollReveal>

      {/* — CONVERSION — */}
      <ScrollReveal>
        <FreeConsultation />
      </ScrollReveal>
      <ScrollReveal>
        <LeadForm />
      </ScrollReveal>

      <Footer />
      <MobileStickyBar />
      <ExitIntentPopup />
      <Toaster />
    </main>
  );
}
