import { useState, useEffect } from "react";
import { Phone, Calendar, Menu, X } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import logoEquipe from "@/assets/logo-equipe-color.png";

const links = [
  { label: "À propos", href: "#apropos" },
  { label: "Services", href: "#services" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-navy-deep/95 backdrop-blur-lg shadow-lg border-b border-white/10"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="shrink-0" aria-label="Accueil — Mathis Guimont">
          <div className="bg-white rounded-md p-1.5 shadow-lg">
            <img
              src={logoEquipe}
              alt="L'Équipe Xavier Charron & Ali Al"
              className="h-8 md:h-10 w-auto"
              loading="eager"
              decoding="async"
            />
          </div>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground rounded-md hover:bg-white/5 transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:8199183409"
            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition"
            aria-label="Appeler le 819-918-3409"
          >
            <Phone className="w-4 h-4" />
            819-918-3409
          </a>
          <button
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-crimson text-primary-foreground text-xs font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform cursor-pointer uppercase tracking-wider"
            aria-label="Rencontre stratégique gratuite"
          >
            <Calendar className="w-4 h-4" />
            Rencontre stratégique
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 pb-6 pt-2 space-y-1" aria-label="Navigation mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="block px-4 py-3 text-lg font-semibold text-foreground/90 hover:text-crimson hover:bg-white/5 rounded-lg transition"
            >
              {l.label}
            </a>
          ))}

          <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
            <a
              href="tel:8199183409"
              className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-crimson transition"
              aria-label="Appeler le 819-918-3409"
            >
              <Phone className="w-5 h-5 text-crimson" />
              <span className="font-semibold">819-918-3409</span>
            </a>
            <button
              onClick={(e) => { close(); openCalendly(e); }}
              className="block w-full text-center py-3.5 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson cursor-pointer uppercase tracking-wider"
              aria-label="Rencontre stratégique gratuite"
            >
              Rencontre stratégique gratuite
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
