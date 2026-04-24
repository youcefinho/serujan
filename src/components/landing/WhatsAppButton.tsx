import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = "18199183409";
  const message = encodeURIComponent(
    "Bonjour Mathis ! J'aimerais en savoir plus sur vos services de courtier immobilier."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Mathis sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      <span className="hidden md:inline-flex opacity-0 group-hover:opacity-100 transition-opacity bg-navy-deep border border-border text-foreground text-sm px-4 py-2 rounded-lg shadow-elevate whitespace-nowrap pointer-events-none">
        Écrivez-moi sur WhatsApp
      </span>

      <span className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
        <span className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-2xl transition-all hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white fill-white" strokeWidth={1.5} />
        </span>
      </span>
    </a>
  );
}
