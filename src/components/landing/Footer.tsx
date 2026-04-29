import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Footer — Serujan, services, contact, liens Elev8, réseaux sociaux
// ═══════════════════════════════════════════════════════════

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black-deep border-t border-gold/10 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Logo + description */}
          <div className="md:col-span-1">
            {clientConfig.logoUrl && (
              <img
                src={clientConfig.logoUrl}
                alt={clientConfig.teamName}
                className="h-14 w-auto mb-4"
              />
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(translations.footer.desc)}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-widest mb-4">
              {t(translations.footer.servicesTitle)}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  {t(translations.services.pillar1.title)}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  {t(translations.services.pillar2.title)}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  {t(translations.services.pillar3.title)}
                </a>
              </li>
              <li>
                <a href="#elev8" className="hover:text-gold transition-colors">
                  Méthode Elev8
                </a>
              </li>
              <li>
                <a
                  href={clientConfig.elev8EventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Événement Elev8 2025
                </a>
              </li>
              <li>
                <a href="#simulateur" className="hover:text-gold transition-colors">
                  {t(translations.nav.simulateur)}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-widest mb-4">
              {t(translations.footer.contactTitle)}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold/50 flex-shrink-0" />
                <a href={`mailto:${clientConfig.email}`} className="hover:text-gold transition-colors">
                  {clientConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold/50 flex-shrink-0" />
                <a href={`tel:+${clientConfig.phone.international}`} className="hover:text-gold transition-colors">
                  {clientConfig.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold/50 flex-shrink-0 mt-0.5" />
                <span>
                  {clientConfig.address.street}
                  <br />
                  {clientConfig.address.suite}, {clientConfig.address.city}, {clientConfig.address.province}
                </span>
              </li>
            </ul>
          </div>

          {/* Liens utiles + Réseaux */}
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-widest mb-4">
              {t(translations.footer.usefulLinks)}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>
                <a
                  href={clientConfig.elev8AcademyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Elev8 Academy
                </a>
              </li>
              <li>
                <a
                  href={clientConfig.elev8EventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Événement Elev8
                </a>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <h4 className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
              {t(translations.footer.followMe)}
            </h4>
            <div className="flex gap-3">
              {clientConfig.socials.instagram && (
                <a
                  href={clientConfig.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gold" />
                </a>
              )}
              {clientConfig.socials.facebook && (
                <a
                  href={clientConfig.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {clientConfig.socials.linkedin && (
                <a
                  href={clientConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gold" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gold/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>© {year} {t(translations.footer.copyright)}</p>
          <p>{t(translations.footer.madeIn)}</p>
          <div className="flex gap-4">
            <span>{t(translations.footer.mentions)}</span>
            <span>{t(translations.footer.confidentialite)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
