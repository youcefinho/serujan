import { Play, Instagram } from "lucide-react";

export function InstagramReels() {
  const reels = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
      views: "12.4k",
      caption: "3 erreurs fatales lors de la première visite 🏠❌",
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
      views: "8.2k",
      caption: "Le marché à Gatineau ce mois-ci : ce qu'il faut savoir 📊",
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
      views: "15.1k",
      caption: "Pourquoi l'inspection pré-achat est non négociable 🔍",
    },
  ];

  return (
    <section className="py-24 bg-navy-deep overflow-hidden border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 md:text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] mb-6">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance uppercase tracking-widest">
            Suivez mon actualité immobilière sur Instagram
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conseils, analyses de marché et coulisses de l'immobilier en Outaouais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href="https://www.instagram.com/mathis_guimont/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group bg-navy shadow-elevate block"
            >
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Play className="w-4 h-4" />
                  {reel.views}
                </div>
                <p className="font-medium text-sm leading-snug line-clamp-2 text-white/90">
                  {reel.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/mathis_guimont/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-elevate"
          >
            <Instagram className="w-5 h-5" />
            Voir tous mes Reels
          </a>
        </div>
      </div>
    </section>
  );
}
