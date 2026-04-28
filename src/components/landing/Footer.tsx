import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logoEquipe from "@/assets/logo-equipe-white.png";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.29Z" />
    </svg>
  );
}

export function Footer() {
  const { t, ta } = useLanguage();

  // Construction dynamique des réseaux sociaux depuis config
  const socialLinks = [
    clientConfig.socials.facebook && {
      icon: Facebook,
      label: "Facebook",
      href: clientConfig.socials.facebook.url,
    },
    clientConfig.socials.instagram && {
      icon: Instagram,
      label: "Instagram",
      href: clientConfig.socials.instagram.url,
    },
    clientConfig.socials.tiktok && {
      icon: TikTokIcon,
      label: "TikTok",
      href: clientConfig.socials.tiktok.url,
    },
  ].filter(Boolean) as { icon: React.ElementType; label: string; href: string }[];

  return (
    <footer className="bg-navy-deep border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-border">
          <div className="space-y-4">
            <img src={logoEquipe} alt={clientConfig.banner.name} className="h-20 w-auto" loading="lazy" decoding="async" />
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              {t(translations.footer.desc)}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-crimson">{t(translations.footer.contact)}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${clientConfig.phone.raw}`} className="flex items-center gap-3 hover:text-crimson transition" aria-label={clientConfig.phone.display}>
                  <Phone className="w-4 h-4" />
                  <span>{clientConfig.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${clientConfig.email}`} className="flex items-center gap-3 hover:text-crimson transition" aria-label={clientConfig.email}>
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{clientConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{clientConfig.address.street}<br />{clientConfig.address.city}, {clientConfig.address.region}</span>
              </li>
            </ul>
          </div>

          {/* Secteurs — SEO local */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-crimson">{t(translations.footer.sectorsTitle)}</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              {(ta(translations.footer.sectors) as string[]).map((sector) => (
                <li key={sector} className="hover:text-foreground transition">{sector}</li>
              ))}
            </ul>
            {/* Lien Google Reviews */}
            <a
              href={clientConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-crimson transition mt-2"
            >
              ★★★★★ {t(translations.footerReview)}
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-crimson">{t(translations.footer.followMe)}</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center border border-border rounded-md hover:bg-crimson hover:border-crimson transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            {clientConfig.socials.instagram && (
              <p className="text-xs text-muted-foreground pt-2">
                <a href={clientConfig.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition" aria-label="Instagram">{clientConfig.socials.instagram.handle}</a>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {t(translations.footer.available)}
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {t(translations.footer.copyright)}</p>
          <p>{t(translations.footer.madeIn)}</p>
        </div>
      </div>
    </footer>
  );
}
