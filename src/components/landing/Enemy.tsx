export function Enemy() {
  return (
    <section className="py-24 bg-navy-deep relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-crimson rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-crimson mb-8">
          L'ennemi commun
        </h2>
        
        <div className="space-y-6 text-2xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-tight lg:leading-tight text-balance">
          <p className="text-foreground/50 text-xl md:text-3xl lg:text-4xl">
            Pas un intermédiaire passif. Pas un ouvreur de portes.
          </p>
          <p className="text-foreground pt-4">
            Un accompagnateur de A à Z, disponible, objectif, qui met vos intérêts avant les siens — <span className="text-crimson">et qui vous prépare à défendre votre choix même face à la tante Carole du dimanche.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
