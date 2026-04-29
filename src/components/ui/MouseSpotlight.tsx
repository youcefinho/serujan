import { useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// MouseSpotlight — Petit halo doré à la taille du curseur
// + 3-4 traînées qui suivent avec un délai (effet étoile)
// Désactivé sur mobile et prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════

const TRAIL_COUNT = 4;
const TRAIL_SIZES = [6, 5, 4, 3]; // px
const TRAIL_OPACITIES = [0.7, 0.45, 0.28, 0.15];
const TRAIL_DELAYS = [0, 40, 90, 150]; // ms de retard — réduits pour plus de fluidité

export function MouseSpotlight() {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const positions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const mousePos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const assignRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) dotsRef.current[i] = el;
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dots = dotsRef.current;

    // Écoute souris
    function handleMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current && containerRef.current) {
        containerRef.current.style.opacity = "1";
        visible.current = true;
      }
    }

    function handleMouseLeave() {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        visible.current = false;
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop — chaque point suit le précédent avec un retard
    let rafId: number;
    let lastTime = 0;

    function animate(time: number) {
      rafId = requestAnimationFrame(animate);

      // Limiter à ~60fps
      if (time - lastTime < 16) return;
      lastTime = time;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? mousePos.current : positions.current[i - 1];
        const current = positions.current[i];

        // Lerp — le premier suit quasi-instantanément, les suivants avec un léger retard
        const speed = i === 0 ? 0.85 : 0.45 - i * 0.08;
        current.x += (target.x - current.x) * speed;
        current.y += (target.y - current.y) * speed;

        const dot = dots[i];
        if (dot) {
          dot.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
        }
      }
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-500"
    >
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => assignRef(el, i)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${TRAIL_SIZES[i]}px`,
            height: `${TRAIL_SIZES[i]}px`,
            borderRadius: "50%",
            background: `oklch(0.82 0.14 82 / ${TRAIL_OPACITIES[i]})`,
            boxShadow: `0 0 ${TRAIL_SIZES[i] * 2}px ${TRAIL_SIZES[i]}px oklch(0.78 0.13 82 / ${TRAIL_OPACITIES[i] * 0.5})`,
            transitionDelay: `${TRAIL_DELAYS[i]}ms`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
