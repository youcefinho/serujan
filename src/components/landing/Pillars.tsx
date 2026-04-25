import { ShieldCheck, Crosshair, BookOpen, MapPin } from "lucide-react";

export function Pillars() {
  const pillars = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Service de A à Z",
      text: "Je coordonne inspecteur, notaire, courtier hypothécaire et évaluateur.",
    },
    {
      num: "02",
      icon: Crosshair,
      title: "Négociation agressive en votre faveur",
      text: "Je me bats pour le meilleur prix possible.",
    },
    {
      num: "03",
      icon: BookOpen,
      title: "Éducation avant la transaction",
      text: "Vous comprendrez ce que vous achetez avant de signer.",
    },
    {
      num: "04",
      icon: MapPin,
      title: "Ancrage communautaire Gatineau",
      text: "Je connais chaque quartier, chaque rue, chaque dynamique locale.",
    },
  ];

  return (
    <section className="py-24 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            4 Piliers de mon service
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mon approche est structurée pour vous offrir le maximum de protection et de résultats, sans compromis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-crimson rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-card h-full p-8 rounded-xl border border-border flex flex-col items-start">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground/10 to-transparent absolute top-4 right-6 pointer-events-none">
                  {pillar.num}
                </span>
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center mb-6 border border-crimson/20">
                  <pillar.icon className="w-6 h-6 text-crimson" />
                </div>
                <h3 className="text-xl font-bold mb-3 pr-8">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed mt-auto">
                  {pillar.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
