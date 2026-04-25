import { Home, TrendingUp, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "ACHETER",
    desc: "Trouvez la propriété parfaite à Gatineau. Accompagnement complet du premier visite jusqu'à la remise des clés.",
    points: ["Recherche ciblée", "Négociation experte", "Inspection accompagnée"],
  },
  {
    icon: TrendingUp,
    title: "VENDRE",
    desc: "Maximisez la valeur de votre propriété grâce à une stratégie marketing puissante et un large réseau d'acheteurs.",
    points: ["Évaluation gratuite", "Marketing premium", "Photos professionnelles"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">Services</span>
          <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold">Deux missions. Une expertise.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, desc, points }) => (
            <div
              key={title}
              className="group relative bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 overflow-hidden hover:border-crimson transition"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-crimson/10 rounded-full blur-3xl group-hover:bg-crimson/20 transition" />
              <div className="relative space-y-6">
                <Icon className="w-12 h-12 text-crimson" strokeWidth={1.5} />
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-px bg-crimson" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-crimson font-bold group-hover:gap-4 transition-all"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
