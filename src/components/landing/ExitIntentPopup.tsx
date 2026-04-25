import { useEffect, useState, useCallback } from "react";
import { Calendar, X } from "lucide-react";
import { openCalendly } from "@/lib/calendly";

const DELAY_SECONDS = 30;
const STORAGE_KEY = "exit_popup_dismissed";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let timer: ReturnType<typeof setTimeout>;
    let didFire = false;

    const fire = () => {
      if (didFire) return;
      didFire = true;
      setShow(true);
    };

    // Timer: show after 30 seconds
    timer = setTimeout(fire, DELAY_SECONDS * 1000);

    // Mouse leave: desktop only
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) fire();
    };
    document.addEventListener("mouseout", onLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-border rounded-2xl max-w-md w-full p-8 shadow-elevate animate-in zoom-in-95 duration-300"
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-crimson flex items-center justify-center shadow-crimson">
            <Calendar className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Avant de partir…
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Obtenez votre <span className="text-foreground font-semibold">évaluation gratuite</span> en
            30 secondes. Aucun engagement.
          </p>
          <button
            onClick={(e) => { dismiss(); openCalendly(e); }}
            className="w-full py-4 bg-gradient-crimson text-primary-foreground font-bold uppercase tracking-widest rounded-md shadow-crimson hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Obtenir mon évaluation gratuite
          </button>
          <a
            href="tel:8199183409"
            className="block text-sm text-muted-foreground hover:text-crimson transition"
          >
            ou appelez directement le 819-918-3409
          </a>
        </div>
      </div>
    </div>
  );
}
