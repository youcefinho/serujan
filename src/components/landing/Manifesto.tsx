const blocks = [
  {
    num: "01",
    title: "URGENCE",
    desc: "Le marché bouge vite. Les bonnes occasions ne reviennent pas. Agir maintenant, c'est sécuriser votre avenir.",
  },
  {
    num: "02",
    title: "RÉBELLION",
    desc: "Refuser les compromis. Casser les règles dépassées de l'immobilier traditionnel. Vous méritez mieux que le statu quo.",
  },
  {
    num: "03",
    title: "FACILITÉ",
    desc: "Un processus clair, des étapes simples, un courtier qui répond. L'achat d'une maison ne devrait jamais être un casse-tête.",
  },
];

export function Manifesto() {
  return (
    <section className="bg-navy-deep">
      <div className="grid md:grid-cols-3">
        {blocks.map((b, i) => (
          <div
            key={b.title}
            className={`relative p-10 lg:p-14 group overflow-hidden ${
              i === 1 ? "bg-crimson text-primary-foreground" : "bg-navy-deep"
            } ${i < 2 ? "md:border-r border-border" : ""} border-b md:border-b-0 border-border`}
          >
            <div className="space-y-6">
              <div
                className={`text-7xl lg:text-8xl font-black opacity-30 ${
                  i === 1 ? "text-primary-foreground" : "text-crimson"
                }`}
              >
                {b.num}
              </div>
              <h3 className="text-4xl lg:text-5xl font-black tracking-tighter">{b.title}</h3>
              <p
                className={`leading-relaxed ${
                  i === 1 ? "text-primary-foreground/90" : "text-muted-foreground"
                }`}
              >
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
