import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { trackWhatsAppClick } from "@/lib/analytics";
import { clientConfig } from "@/lib/config";

export function WhatsAppButton() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t(translations.whatsapp.message));

  return (
    <a
      href={`https://wa.me/${clientConfig.phone.international}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      onClick={() => trackWhatsAppClick()}
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 group flex items-center gap-3"
    >
      <span className="hidden md:inline-flex opacity-0 group-hover:opacity-100 transition-opacity bg-navy-deep border border-border text-foreground text-sm px-4 py-2 rounded-lg shadow-elevate whitespace-nowrap pointer-events-none">
        {t(translations.whatsapp.tooltip)}
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
