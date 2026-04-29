import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import { Calendar, ExternalLink, Play } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Elev8Event — Section événement avec vidéo + compte à rebours
// ═══════════════════════════════════════════════════════════

// Date de l'événement Elev8 2025 (à ajuster)
const EVENT_DATE = new Date("2025-11-15T09:00:00-05:00");

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export default function Elev8Event() {
  const { t } = useLanguage();
  const ref = useScrollReveal();
  const countdown = useCountdown(EVENT_DATE);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const countdownItems = [
    { value: countdown.days, label: t(translations.elev8Event.days) },
    { value: countdown.hours, label: t(translations.elev8Event.hours) },
    { value: countdown.minutes, label: t(translations.elev8Event.minutes) },
    { value: countdown.seconds, label: t(translations.elev8Event.seconds) },
  ];

  return (
    <section id="elev8" className="relative py-24 px-4 bg-black-deep overflow-hidden" ref={ref}>
      {/* Accent doré en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            <Calendar className="w-3.5 h-3.5" />
            {t(translations.elev8Event.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-4xl md:text-5xl font-bold text-center uppercase tracking-widest text-gold mb-8">
          {t(translations.elev8Event.title)}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Texte */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              {t(translations.elev8Event.description)}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t(translations.elev8Event.details)}
            </p>
            <a
              href={clientConfig.elev8EventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-black-deep font-bold uppercase tracking-widest rounded-lg shadow-gold hover:shadow-gold-sm hover:scale-[1.02] transition-all duration-300"
            >
              {t(translations.elev8Event.ctaVisit)}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Vidéo */}
          <div className="relative rounded-2xl overflow-hidden bg-black-card border border-gold/10 aspect-video">
            {clientConfig.elev8VideoUrl && !isVideoPlaying ? (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              >
                {/* Thumbnail overlay */}
                <div className="absolute inset-0 bg-black-deep/50" />
                <div className="relative z-10 w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center group-hover:bg-gold/30 transition-all duration-300">
                  <Play className="w-8 h-8 text-gold ml-1" fill="currentColor" />
                </div>
                <span className="absolute bottom-4 left-4 text-sm text-gold/70 z-10">
                  Vidéo Elev8 Event
                </span>
              </button>
            ) : clientConfig.elev8VideoUrl ? (
              <video
                src={clientConfig.elev8VideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-12 h-12 text-gold/30" />
              </div>
            )}
          </div>
        </div>

        {/* Compte à rebours */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground">
            {t(translations.elev8Event.countdownTitle)}
          </h3>
          <p className="text-muted-foreground">
            {t(translations.elev8Event.countdownSubtitle)}
          </p>

          {/* Timer */}
          <div className="flex justify-center gap-4 md:gap-8">
            {countdownItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-black-card border border-gold/20 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gold tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs mt-2 text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href={clientConfig.elev8EventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 mt-4 border-2 border-gold text-gold font-bold uppercase tracking-widest rounded-lg hover:bg-gold hover:text-black-deep transition-all duration-300"
          >
            {t(translations.elev8Event.ctaReserve)}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
