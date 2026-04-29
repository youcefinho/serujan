import { useEffect, useState } from "react";

/**
 * Retourne `true` si `window.scrollY > threshold`.
 *
 * Optimisation perf : le scroll handler est throttlé via requestAnimationFrame
 * et `setState` n'est appelé QUE quand on franchit le seuil — pas à chaque pixel.
 * Évite le jank de scroll dû aux re-renders React en cascade quand plusieurs
 * composants flottants écoutent la position de scroll.
 */
export function useScrollThreshold(threshold: number): boolean {
  const [crossed, setCrossed] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > threshold : false,
  );

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;
    let last = window.scrollY > threshold;
    setCrossed(last);

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        const now = window.scrollY > threshold;
        if (now !== last) {
          last = now;
          setCrossed(now);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return crossed;
}
