// Hook IntersectionObserver. Retourne `{ ref, visible }` — `visible` passe
// à true une seule fois quand l'élément entre dans le viewport.
// Utilisé surtout par `<ScrollReveal>` — les sections v2 utilisent `useInView`
// de motion/react directement.

import { useEffect, useRef, useState } from "react";
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}
