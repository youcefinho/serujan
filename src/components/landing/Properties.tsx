import { MapPin, Bed, Bath, Maximize, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

// Propriétés vedettes — données réelles de la démo Mathis
const properties = [
  {
    price: 649000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    location: "Sector Plateau, Gatineau",
    type: { fr: "Maison unifamiliale", en: "Single family home" },
    badge: { fr: "NOUVELLE", en: "JUST LISTED" },
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    price: 825000,
    beds: 5,
    baths: 4,
    sqft: 3100,
    location: "Aylmer Waterfront, Gatineau",
    type: { fr: "Maison unifamiliale", en: "Single family home" },
    badge: { fr: "EXCLUSIVE", en: "EXCLUSIVE" },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    price: 499000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    location: "Hull Central, Gatineau",
    type: { fr: "Condo", en: "Condo" },
    badge: { fr: "VENDU", en: "SOLD" },
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
];

const fmt = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(v);

export function Properties() {
  const { t } = useLanguage();
  const tr = translations.properties;

  return (
    <section id="properties" className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* En-tête avec lien Centris */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
            <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(tr.title)}</h2>
          </div>
          <a
            href={clientConfig.centrisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-crimson font-bold uppercase tracking-wider text-sm hover:underline shrink-0"
            aria-label={t(tr.cta)}
          >
            {t(tr.cta)} →
          </a>
        </div>

        {/* Grille propriétés */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {properties.map((prop, i) => {
            const isSold = prop.badge.fr === "VENDU";
            return (
              <div
                key={i}
                className={`group bg-card border rounded-2xl overflow-hidden transition ${isSold ? "border-border/50 opacity-80" : "border-border hover:border-crimson"}`}
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={`${t(prop.type)} — ${prop.location}`}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSold ? "grayscale" : ""}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                    isSold 
                      ? "bg-muted-foreground/80 text-white" 
                      : prop.badge.fr === "EXCLUSIVE" 
                        ? "bg-crimson text-white border border-crimson" 
                        : "bg-emerald-500 text-white"
                  }`}>
                    {t(prop.badge)}
                  </div>
                </div>

                {/* Infos */}
                <div className="p-6 space-y-3">
                  <div className="text-2xl font-black text-crimson">{fmt(prop.price)}</div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-crimson" />
                    <span>{prop.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {prop.beds} {t(tr.beds)}</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {prop.baths} {t(tr.baths)}</span>
                    <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {prop.sqft} pi²</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Centris */}
        <div className="text-center">
          <a
            href={clientConfig.centrisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform uppercase tracking-widest"
            aria-label={t(tr.cta)}
          >
            <ExternalLink className="w-5 h-5" />{t(tr.cta)}
          </a>
        </div>
      </div>
    </section>
  );
}
