import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { LanguageToggle } from "./LanguageToggle";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ExternalLink } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Navbar — Navigation premium noir/or pour Serujan
// ═══════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { key: "services", href: "#services" },
  { key: "approche", href: "#approche" },
  { key: "processus", href: "#processus" },
  { key: "elev8", href: "#elev8" },
  { key: "simulateur", href: "#simulateur" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black-deep/95 backdrop-blur-xl border-b border-gold/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          {clientConfig.logoUrl ? (
            <img
              src={clientConfig.logoUrl}
              alt={clientConfig.teamName}
              className="h-10 w-auto"
            />
          ) : (
            <span className="text-xl font-bold text-gold uppercase tracking-wider">
              {clientConfig.teamName}
            </span>
          )}
        </a>

        {/* Navigation desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs font-medium text-foreground/70 hover:text-gold transition-colors duration-200 uppercase tracking-wide whitespace-nowrap"
            >
              {t(translations.nav[item.key])}
            </a>
          ))}

          {/* Lien externe Elev8 */}
          <a
            href={clientConfig.elev8EventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors uppercase tracking-wider"
          >
            {t(translations.nav.inscription)}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Actions desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle />
          <a
            href={`tel:+${clientConfig.phone.international}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {clientConfig.phone.display}
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-gold text-black-deep text-sm font-bold uppercase tracking-widest rounded-lg hover:scale-[1.02] transition-transform"
          >
            {t(translations.nav.cta)}
          </a>
        </div>

        {/* Burger menu mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="lg:hidden bg-black-deep/98 backdrop-blur-xl border-t border-gold/10 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-foreground/80 hover:text-gold transition-colors uppercase tracking-wider text-sm font-medium"
              >
                {t(translations.nav[item.key])}
              </a>
            ))}
            <a
              href={clientConfig.elev8EventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-gold font-semibold uppercase tracking-wider text-sm"
            >
              {t(translations.nav.inscription)} →
            </a>
            <div className="pt-4 space-y-3 border-t border-gold/10">
              <a
                href={`tel:+${clientConfig.phone.international}`}
                className="flex items-center justify-center gap-2 py-3 border border-gold/30 text-gold rounded-lg font-medium"
              >
                <Phone className="w-4 h-4" />
                {clientConfig.phone.display}
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block py-3 bg-gradient-gold text-black-deep text-center font-bold uppercase tracking-widest rounded-lg"
              >
                {t(translations.nav.cta)}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
