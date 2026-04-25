import { useEffect, useRef, useState, useCallback } from "react";
import { Star, Users, MapPin, Clock } from "lucide-react";

interface Stat {
  icon: typeof Star;
  value?: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Star, value: 50, suffix: "+", label: "avis 5 étoiles" },
  { icon: Users, value: 200, suffix: "+", label: "clients accompagnés" },
  { icon: MapPin, label: "Outaouais", suffix: "" },
  { icon: Clock, value: 7, suffix: "j/7", label: "disponible" },
];

const DURATION = 2000; // 2 seconds

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / DURATION, 1);
      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, target]);

  return count;
}


function StatItem({ stat, visible }: { stat: Stat; visible: boolean }) {
  const count = useCountUp(stat.value ?? 0, visible);
  const Icon = stat.icon;

  return (
    <div className="flex items-center gap-3 justify-center md:justify-start">
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm md:text-base font-semibold tracking-wide">
        {stat.value != null ? (
          <>
            <span className="tabular-nums">{count}</span>
            {stat.suffix}{" "}{stat.label}
          </>
        ) : (
          stat.label
        )}
      </span>
    </div>
  );
}

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
      rootMargin: "0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-crimson text-primary-foreground py-6 border-y border-crimson-glow"
      aria-label="Statistiques clés"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} visible={visible} />
        ))}
      </div>
    </section>
  );
}
