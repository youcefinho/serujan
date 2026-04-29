import { motion, useScroll, useSpring } from "motion/react";

/**
 * Scroll progress bar — fine ligne or en haut de page.
 * Utilise motion's useScroll + useSpring : pas de re-render React,
 * écriture directe sur le transform GPU. Aucun coût pendant le scroll.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-gold pointer-events-none"
      style={{ scaleX }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de la page"
    />
  );
}
