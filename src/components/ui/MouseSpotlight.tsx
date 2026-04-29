import { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// MouseSpotlight — Halo lumineux qui suit le curseur
// Effet inspiré de intralys.com — radial-gradient diffus
// Respecte prefers-reduced-motion (désactivé si activé).
// ═══════════════════════════════════════════════════════════

export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vérifier prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ne pas activer sur mobile / tablette (pas de souris)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number;

    function handleMouseMove(e: MouseEvent) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (el) {
          el.style.setProperty("--mx", `${e.clientX}px`);
          el.style.setProperty("--my", `${e.clientY}px`);
          el.style.opacity = "1";
        }
      });
    }

    function handleMouseLeave() {
      if (el) el.style.opacity = "0";
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), oklch(0.78 0.10 82 / 0.06), transparent 60%)",
      }}
    />
  );
}
