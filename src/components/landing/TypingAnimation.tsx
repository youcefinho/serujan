import { useEffect, useState } from "react";

/**
 * Typing animation — types out an array of words/phrases one character at a time,
 * with a blinking cursor. After completing all phrases, it stops on the last one.
 */
export function TypingAnimation({
  phrases,
  className = "",
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseAfterPhrase = 1200,
}: {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterPhrase?: number;
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const currentPhrase = phrases[phraseIndex] ?? "";

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Finished typing current phrase
      if (phraseIndex === phrases.length - 1) {
        // Last phrase — stop
        setDone(true);
        return;
      }
      // Pause then delete
      const timer = setTimeout(() => setIsDeleting(true), pauseAfterPhrase);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next phrase
      setIsDeleting(false);
      setPhraseIndex((i) => i + 1);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(() => {
      setCharIndex((c) => c + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases, done, typingSpeed, deletingSpeed, pauseAfterPhrase]);

  const currentPhrase = phrases[phraseIndex] ?? "";
  const displayText = currentPhrase.slice(0, charIndex);

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block w-[2px] h-[0.9em] bg-crimson ml-0.5 align-baseline"
        style={{
          animation: done ? "none" : "blink 0.7s step-end infinite",
          opacity: done ? 0 : 1,
        }}
      />
    </span>
  );
}
