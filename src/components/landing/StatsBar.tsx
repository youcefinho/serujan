import { useEffect, useRef, useState, useCallback } from "react";
import { Star, Users, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const icons = [Star, Users, MapPin, Clock];
const values = [50, 200, undefined, 7];

const DURATION = 2000;

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / DURATION, 1);
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

function StatItem({ icon: Icon, value, suffix, label, visible }: {
  icon: typeof Star;
  value?: number;
  suffix: string;
  label: string;
  visible: boolean;
}) {
  const count = useCountUp(value ?? 0, visible);

  return (
    <div className="flex items-center gap-3 justify-center md:justify-start">
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm md:text-base font-semibold tracking-wide">
        {value != null ? (
          <>
            <span className="tabular-nums">{count}</span>
            {suffix}{" "}{label}
          </>
        ) : (
          label
        )}
      </span>
    </div>
  );
}

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { ta } = useLanguage();
  const stats = ta(translations.statsBar) as { suffix: string; label: string }[];

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
      aria-label="Stats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <StatItem
            key={stat.label}
            icon={icons[i]}
            value={values[i]}
            suffix={stat.suffix}
            label={stat.label}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}
