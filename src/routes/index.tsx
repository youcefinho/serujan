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

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-navy text-foreground">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <Manifesto />
      <Testimonials />
      <Process />
      <Calculator />
      <LeadForm />
      <Faq />
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </main>
  );
}
