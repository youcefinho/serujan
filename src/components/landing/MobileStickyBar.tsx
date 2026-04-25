import { Phone, Calendar } from "lucide-react";
import { openCalendly } from "@/lib/calendly";

export function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-deep/95 backdrop-blur-lg border-t border-white/10 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href="tel:8199183409"
          className="flex items-center justify-center gap-2 py-3 border-2 border-foreground/40 text-foreground font-bold rounded-md text-sm"
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
        <button
          onClick={openCalendly}
          className="flex items-center justify-center gap-2 py-3 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson text-sm"
        >
          <Calendar className="w-4 h-4" />
          Rendez-vous
        </button>
      </div>
    </div>
  );
}
