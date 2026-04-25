import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Manifesto } from "@/components/landing/Manifesto";
import { Testimonials } from "@/components/landing/Testimonials";
import { Process } from "@/components/landing/Process";
import { Calculator } from "@/components/landing/Calculator";
import { LeadForm } from "@/components/landing/LeadForm";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { MobileStickyBar } from "@/components/landing/MobileStickyBar";
import { ScrollProgressBar } from "@/components/landing/ScrollProgressBar";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";

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
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <Manifesto />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <Process />
      </ScrollReveal>
      <ScrollReveal>
        <Calculator />
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
