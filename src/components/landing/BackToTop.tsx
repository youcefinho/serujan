import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// BackToTop — apparaît après 800px de scroll, smooth-scroll
// vers le haut. Caché sur mobile pour ne pas chevaucher la
// MobileStickyBar (déjà présente avec bouton CTA principal).
// ═══════════════════════════════════════════════════════════

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="hidden md:flex fixed bottom-6 right-6 z-40 w-12 h-12 items-center justify-center rounded-full glass border border-gold/30 text-gold hover:bg-gold/15 hover:border-gold/60 hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
