import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhySerujan from "@/components/landing/WhySerujan";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Process from "@/components/landing/Process";
import LendersNetwork from "@/components/landing/LendersNetwork";
import Bio from "@/components/landing/Bio";
import Testimonials from "@/components/landing/Testimonials";
import Calculator from "@/components/landing/Calculator";
import Faq from "@/components/landing/Faq";
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
      <WhySerujan />
      <Services />
      <About />
      <Process />
      <LendersNetwork />
      <Bio />
      <Testimonials />
      <Calculator />
      <Faq />
      <Elev8Event />
      <LeadForm />
      <Footer />
      <MobileStickyBar />
      <BackToTop />
      <Toaster />
    </main>
  );
}
