import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Process from "@/components/landing/Process";
import Bio from "@/components/landing/Bio";
import Calculator from "@/components/landing/Calculator";
import Elev8Event from "@/components/landing/Elev8Event";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import MobileStickyBar from "@/components/landing/MobileStickyBar";
import { ScrollProgressBar } from "@/components/landing/ScrollProgressBar";
import { BackToTop } from "@/components/landing/BackToTop";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";

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
      <Services />
      <About />
      <Process />
      <Bio />
      <Calculator />
      <Elev8Event />
      <LeadForm />
      <Footer />
      <MobileStickyBar />
      <BackToTop />
      <Toaster />
    </main>
  );
}
