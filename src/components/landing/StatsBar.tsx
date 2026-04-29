import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// StatsBar — Statistiques commerciales avec compteur animé
// 500M$+ financés | 95% approbation | 30 jours | 1000+ projets
// ═══════════════════════════════════════════════════════════

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsBar() {
  const { ta } = useLanguage();
  const { ref } = useScrollReveal();

  const stats = ta(translations.statsBar);

  return (
    <section className="relative py-16 px-4 bg-black-card border-y border-gold/10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat: { value: string; suffix: string; label: string }, i: number) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-2">
                <AnimatedCounter target={parseInt(stat.value)} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
