import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logoEquipe from "@/assets/logo-equipe-white.png";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.29Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-border">
          <div className="space-y-4">
            <img src={logoEquipe} alt="L'Équipe Xavier Charron & Ali Al" className="h-20 w-auto" loading="lazy" decoding="async" />
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Mathis Guimont · Courtier immobilier résidentiel en Outaouais. Spécialisé pour les premiers acheteurs et investisseurs.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-crimson">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:8199183409" className="flex items-center gap-3 hover:text-crimson transition" aria-label="Appeler le 819-918-3409">
                  <Phone className="w-4 h-4" />
                  <span>819-918-3409</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@mathisguimont.com" className="flex items-center gap-3 hover:text-crimson transition" aria-label="Envoyer un courriel à info@mathisguimont.com">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">info@mathisguimont.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>225 boul. de la Gappe, suite 102<br />Gatineau, Outaouais</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-crimson">Suivez-moi</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/mathis.guimont/reels/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mathis_guimont/" },
                { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@mathisguimont" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 flex items-center justify-center border border-border rounded-md hover:bg-crimson hover:border-crimson transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              <a href="https://instagram.com/mathis_guimont" className="hover:text-crimson transition" aria-label="Voir le profil Instagram de Mathis Guimont">@mathis_guimont</a>
            </p>
            <p className="text-xs text-muted-foreground">
              Disponible 7j/7 pour répondre à vos questions.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mathis Guimont · Courtier immobilier résidentiel</p>
          <p>Conçu avec passion à Gatineau</p>
        </div>
      </div>
    </footer>
  );
}
