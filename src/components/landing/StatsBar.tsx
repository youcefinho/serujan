import { Star, Users, MapPin, Clock } from "lucide-react";

const stats = [
  { icon: Star, label: "50+ avis 5 étoiles" },
  { icon: Users, label: "Grand réseau" },
  { icon: MapPin, label: "Gatineau · Outaouais" },
  { icon: Clock, label: "Disponible 7j/7" },
];

export function StatsBar() {
  return (
    <section className="relative bg-crimson text-primary-foreground py-6 border-y border-crimson-glow" aria-label="Statistiques clés">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 justify-center md:justify-start">
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm md:text-base font-semibold tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
