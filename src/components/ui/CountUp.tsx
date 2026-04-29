import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { motion } from "motion/react";

// ═══════════════════════════════════════════════════════════
// CountUp — anime un nombre de 0 → cible quand l'élément
// entre dans le viewport. Conserve préfixe et suffixe textuels
// (ex: "500M$+" → anime 0→500, garde "M$+" en suffixe).
// Respecte prefers-reduced-motion (affiche directement la valeur).
// ═══════════════════════════════════════════════════════════

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(raw: string): { prefix: string; number: number; suffix: string; locale: boolean } {
  const match = raw.match(/^([^\d-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw, locale: false };
  const [, prefix, numStr, suffix] = match;
  const normalized = (numStr ?? "").replace(",", ".");
  const number = Number(normalized);
  const locale = number >= 1000;
  return { prefix: prefix ?? "", number: Number.isFinite(number) ? number : 0, suffix: suffix ?? "", locale };
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = prefersReducedMotion();

  const parsed = parseValue(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 18,
    duration: duration * 1000,
  });
  const display = useTransform(spring, (v) => {
    const n = parsed.number % 1 === 0 ? Math.round(v) : Number(v.toFixed(1));
    return parsed.locale ? n.toLocaleString("fr-CA") : String(n);
  });

  const [text, setText] = useState<string>(parsed.locale ? "0".toLocaleString("fr-CA") : "0");

  useEffect(() => {
    if (reduced) {
      setText(parsed.locale ? parsed.number.toLocaleString("fr-CA") : String(parsed.number));
      return;
    }
    if (inView) motionValue.set(parsed.number);
  }, [inView, parsed.number, parsed.locale, motionValue, reduced]);

  useEffect(() => {
    if (reduced) return;
    return display.on("change", (v) => setText(v));
  }, [display, reduced]);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      <motion.span className="tabular-nums">{text}</motion.span>
      {parsed.suffix}
    </span>
  );
}
