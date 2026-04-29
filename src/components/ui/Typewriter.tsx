import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════
// Typewriter — cycle entre plusieurs phrases avec effet
// machine à écrire : tape la phrase, pause, efface, suivante.
// Curseur clignotant. Respecte prefers-reduced-motion (affiche
// la première phrase fixe, sans animation).
// ═══════════════════════════════════════════════════════════

interface TypewriterProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
  cursorClassName?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Typewriter({
  phrases,
  typeSpeed = 55,
  deleteSpeed = 30,
  pauseAfterType = 1800,
  pauseAfterDelete = 350,
  className = "",
  cursorClassName = "",
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "between">("typing");
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  useEffect(() => {
    if (reduced || phrases.length === 0) {
      setText(phrases[0] ?? "");
      return;
    }

    const current = phrases[phraseIdx % phrases.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 0);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        timeout = setTimeout(() => setPhase("between"), 0);
      }
    } else if (phase === "between") {
      timeout = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, pauseAfterDelete);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, reduced]);

  return (
    <span className={className} aria-live="polite">
      <span>{text}</span>
      <span className={`inline-block w-[1px] h-[1em] align-middle ml-0.5 bg-current animate-pulse ${cursorClassName}`} aria-hidden />
    </span>
  );
}
