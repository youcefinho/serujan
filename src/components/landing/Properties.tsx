import { MapPin, Bed, Bath, ExternalLink } from "lucide-react";

// Section Propriétés — Standard Intralys §10.4
// Placeholder avec lien vers la page Centris du courtier
const CENTRIS_URL = "https://www.centris.ca/fr";

// Propriétés placeholder — à remplacer par les vraies données du courtier
const properties = [
  {
    price: 425000,
    address: "123 Rue de l'Exemple, Gatineau",
    beds: 3,
    baths: 2,
    type: "Maison unifamiliale",
  },
  {
    price: 349000,
    address: "456 Boulevard Placeholder, Hull",
    beds: 2,
    baths: 1,
    type: "Condo",
  },
  {
    price: 575000,
    address: "789 Avenue Modèle, Aylmer",
    beds: 4,
    baths: 3,
    type: "Maison unifamiliale",
  },
];

const fmt = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(v);

export function Properties() {
  return (
    <section className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">Propriétés</span>
          <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">
            Découvrez nos propriétés
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Voici un aperçu de nos inscriptions. Consultez notre page complète pour voir toutes les propriétés disponibles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {properties.map((prop, i) => (
            <div
              key={i}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-crimson transition"
            >
              {/* Image placeholder — gradient au lieu d'une vraie image */}
              <div className="relative h-48 bg-gradient-to-br from-navy-deep via-card to-navy-deep overflow-hidden">
                <div className="absolute inset-0 bg-crimson/5 group-hover:bg-crimson/10 transition" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-crimson text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  {prop.type}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-2xl font-black text-crimson">{fmt(prop.price)}</div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-crimson" />
                  <span>{prop.address}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" /> {prop.beds} ch.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" /> {prop.baths} sdb.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={CENTRIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform uppercase tracking-widest"
            aria-label="Voir toutes les propriétés sur Centris"
          >
            <ExternalLink className="w-5 h-5" />
            Voir toutes les propriétés sur Centris
          </a>
        </div>
      </div>
    </section>
  );
}
