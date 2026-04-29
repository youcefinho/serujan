import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { Mail, Phone, MapPin, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Footer v2 — épuré, éditorial, signature en bas
// ═══════════════════════════════════════════════════════════

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black-deep border-t border-gold/10 pt-20 pb-10 px-6">
      {/* Halo subtil */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 82 / 0.08) 0%, transparent 60%)", filter: "blur(60px)" }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Bloc principal */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          {/* Colonne identité */}
          <div className="lg:col-span-5">
            {clientConfig.logoUrl && (
              <img src={clientConfig.logoUrl} alt={clientConfig.teamName} loading="lazy" decoding="async" className="h-12 w-auto mb-6 opacity-90" />
            )}
            <p className="font-display text-xl md:text-2xl leading-tight text-foreground/85 max-w-md text-balance">
              {t(translations.footer.desc)}
            </p>

            {/* Réseaux */}
            <div className="mt-8 flex gap-3">
              {clientConfig.socials.instagram && (
                <SocialLink href={clientConfig.socials.instagram.url} label="Instagram">
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </SocialLink>
              )}
              {clientConfig.socials.facebook && (
                <SocialLink href={clientConfig.socials.facebook.url} label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialLink>
              )}
              {clientConfig.socials.linkedin && (
                <SocialLink href={clientConfig.socials.linkedin} label="LinkedIn">
                  <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                </SocialLink>
              )}
            </div>
          </div>

          {/* Colonne contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold-light mb-5">
              {t(translations.footer.contactTitle)}
            </h4>
            <ul className="space-y-3.5 text-sm text-foreground/65">
              <li>
                <a
                  href={`tel:+${clientConfig.phone.international}`}
                  className="flex items-center gap-2.5 hover:text-gold transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors" />
                  <span className="tabular-nums">{clientConfig.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clientConfig.email}`}
                  className="flex items-center gap-2.5 hover:text-gold transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors" />
                  <span className="break-all">{clientConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold/60 flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  {clientConfig.address.street}<br />
                  {clientConfig.address.suite}<br />
                  {clientConfig.address.city}, {clientConfig.address.province}
                </span>
              </li>
            </ul>
          </div>

          {/* Colonne navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold-light mb-5">
              {t(translations.footer.servicesTitle)}
            </h4>
            <ul className="space-y-3 text-sm text-foreground/65">
              <FooterLink href="#services">{t(translations.nav.services)}</FooterLink>
              <FooterLink href="#approche">{t(translations.nav.approche)}</FooterLink>
              <FooterLink href="#processus">{t(translations.nav.processus)}</FooterLink>
              <FooterLink href="#simulateur">{t(translations.nav.simulateur)}</FooterLink>
              <FooterLink href="#contact">{t(translations.nav.contact)}</FooterLink>
            </ul>
          </div>

          {/* Colonne Elev8 */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold-light mb-5">
              {t(translations.footer.usefulLinks)}
            </h4>
            <ul className="space-y-3 text-sm text-foreground/65">
              <li>
                <a
                  href={clientConfig.elev8EventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold transition-colors group"
                >
                  <span>{t(translations.footer.elev8Event)}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={clientConfig.elev8AcademyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gold transition-colors group"
                >
                  <span>Elev8 Academy</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <FooterLink href="#elev8">{t(translations.footer.elev8Method)}</FooterLink>
            </ul>
          </div>
        </div>

        {/* Filet doré */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" aria-hidden />

        {/* Mention légale en bas */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/40">
          <p className="tracking-wide">
            © {year} {t(translations.footer.copyright)}
          </p>
          <p className="font-display italic text-foreground/50">
            {t(translations.footer.madeIn)}
          </p>
          <div className="flex gap-5">
            <Link to="/mentions-legales" className="hover:text-gold transition-colors">
              {t(translations.footer.mentions)}
            </Link>
            <Link to="/confidentialite" className="hover:text-gold transition-colors">
              {t(translations.footer.confidentialite)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-black-elevated/60 border border-gold/15 flex items-center justify-center text-gold/80 hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-all duration-300"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="hover:text-gold transition-colors">
        {children}
      </a>
    </li>
  );
}
