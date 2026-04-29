import { useEffect, useState } from "react";

/**
 * Scroll progress bar — thin crimson line at the very top of the page.
 * Purely CSS-driven width via scaleX for GPU-accelerated performance.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-gold pointer-events-none"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de la page"
    />
  );
}
