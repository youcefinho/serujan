import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Calculator v2 — Donut SVG animé + valeurs qui s'animent
// Sliders custom or, transitions fluides via spring
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Animation des chiffres avec spring physics
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => format(v));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className="tabular-nums">{display}</motion.span>;
}

// Donut SVG animé
function Donut({ percents }: { percents: { mortgage: number; tax: number; insurance: number } }) {
  const RADIUS = 70;
  const STROKE = 14;
  const C = 2 * Math.PI * RADIUS;

  const m = (percents.mortgage / 100) * C;
  const t = (percents.tax / 100) * C;
  const i = (percents.insurance / 100) * C;

  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 md:w-56 md:h-56 -rotate-90">
      {/* Rail gris */}
      <circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        stroke="oklch(0.22 0.012 50 / 0.10)"
        strokeWidth={STROKE}
      />

      {/* Hypothèque (or principal) */}
      <motion.circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        stroke="var(--gold)"
        strokeWidth={STROKE}
        strokeLinecap="butt"
        strokeDasharray={`${m} ${C}`}
        animate={{ strokeDasharray: `${m} ${C}` }}
        transition={{ duration: 0.8, ease }}
        style={{ filter: "drop-shadow(0 0 10px oklch(0.78 0.13 82 / 0.4))" }}
      />
      {/* Taxes (or moyen) */}
      <motion.circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        stroke="var(--gold-deep)"
        strokeWidth={STROKE}
        strokeLinecap="butt"
        strokeDasharray={`${t} ${C}`}
        strokeDashoffset={-m}
        animate={{ strokeDasharray: `${t} ${C}`, strokeDashoffset: -m }}
        transition={{ duration: 0.8, ease }}
      />
      {/* Assurance (or sourd) */}
      <motion.circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        stroke="oklch(0.45 0.08 75)"
        strokeWidth={STROKE}
        strokeLinecap="butt"
        strokeDasharray={`${i} ${C}`}
        strokeDashoffset={-(m + t)}
        animate={{ strokeDasharray: `${i} ${C}`, strokeDashoffset: -(m + t) }}
        transition={{ duration: 0.8, ease }}
      />
    </svg>
  );
}

// Slider custom or — avec input number éditable synchronisé
function GoldSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
  inputWidth = "w-28",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  unit?: string;
  inputWidth?: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2.5 gap-3">
        <label className="text-xs uppercase tracking-[0.18em] text-ink-soft flex-shrink-0">
          {label}
        </label>
        <div className="flex items-baseline gap-1.5 min-w-0">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (!Number.isNaN(n)) onChange(clamp(n));
            }}
            onBlur={(e) => {
              const n = Number(e.target.value);
              if (Number.isNaN(n)) onChange(min);
              else onChange(clamp(n));
            }}
            aria-label={label}
            className={`font-display text-base text-gold-deep tabular-nums bg-transparent border-b border-gold-deep/25 hover:border-gold-deep/45 focus:border-gold-deep/65 outline-none text-right ${inputWidth} transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {unit && <span className="text-xs text-ink-soft flex-shrink-0 tabular-nums">{unit}</span>}
        </div>
      </div>
      <div className="relative h-1.5">
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-[oklch(0.22_0.012_50/0.08)]" />
        {/* Fill or */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
          style={{ width: `${percent}%`, boxShadow: "0 0 10px oklch(0.78 0.13 82 / 0.4)" }}
        />
        {/* Range natif (invisible mais accessible) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb visuel */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
          style={{ left: `${percent}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-gold border-2 border-white shadow-gold-sm" />
        </div>
      </div>
    </div>
  );
}

export default function Calculator() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [propertyPrice, setPropertyPrice] = useState(2_500_000);
  const [downPayment, setDownPayment] = useState(500_000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [propertyTax, setPropertyTax] = useState(25_000);
  const [insurance, setInsurance] = useState(5_000);

  const calc = useMemo(() => {
    const loanAmount = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = amortization * 12;
    const monthlyMortgage =
      loanAmount === 0
        ? 0
        : monthlyRate === 0
          ? loanAmount / numPayments
          : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance;
    const totalMortgage = monthlyMortgage * numPayments;
    const totalInterest = Math.max(0, totalMortgage - loanAmount);
    const ltv = propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;
    return {
      loanAmount,
      monthlyMortgage,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      totalMortgage,
      totalInterest,
      ltv,
      mortgagePercent: totalMonthly > 0 ? (monthlyMortgage / totalMonthly) * 100 : 0,
      taxPercent: totalMonthly > 0 ? (monthlyTax / totalMonthly) * 100 : 0,
      insurancePercent: totalMonthly > 0 ? (monthlyInsurance / totalMonthly) * 100 : 0,
    };
  }, [propertyPrice, downPayment, interestRate, amortization, propertyTax, insurance]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(n);

  const fmtPct = (n: number) =>
    `${new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 1 }).format(n)} %`;

  return (
    <section
      id="simulateur"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-off-white bg-stars-light overflow-hidden"
    >
      {/* Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.62 0.14 75 / 0.10) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold-deep/60" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep inline-flex items-center gap-2">
              <CalcIcon className="w-3 h-3" />
              {t(translations.calculator.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-ink">{t(translations.calculator.titleLead)} </span>
            <span className="text-gold-gradient-animated italic font-display-italic">
              {t(translations.calculator.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.calculator.subtitle)}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="p-8 md:p-10 rounded-2xl bg-off-white-elevated border border-gold-deep/15 shadow-[0_30px_80px_-30px_oklch(0.22_0.012_50/0.12)] space-y-7"
          >
            <GoldSlider
              label={t(translations.calculator.propertyPrice)}
              value={propertyPrice}
              min={500_000}
              max={50_000_000}
              step={50_000}
              onChange={setPropertyPrice}
              unit="$ CAD"
              inputWidth="w-32"
            />
            <GoldSlider
              label={t(translations.calculator.downPayment)}
              value={downPayment}
              min={0}
              max={Math.max(downPayment, propertyPrice)}
              step={25_000}
              onChange={setDownPayment}
              unit="$ CAD"
              inputWidth="w-32"
            />
            <GoldSlider
              label={t(translations.calculator.interestRate)}
              value={interestRate}
              min={1}
              max={15}
              step={0.1}
              onChange={setInterestRate}
              unit="%"
              inputWidth="w-20"
            />
            <GoldSlider
              label={t(translations.calculator.amortization)}
              value={amortization}
              min={5}
              max={30}
              step={1}
              onChange={setAmortization}
              unit={t(translations.common.years)}
              inputWidth="w-20"
            />
            <GoldSlider
              label={t(translations.calculator.propertyTax)}
              value={propertyTax}
              min={5_000}
              max={200_000}
              step={1_000}
              onChange={setPropertyTax}
              unit="$ CAD"
              inputWidth="w-28"
            />
            <GoldSlider
              label={t(translations.calculator.insurance)}
              value={insurance}
              min={1_000}
              max={50_000}
              step={500}
              onChange={setInsurance}
              unit="$ CAD"
              inputWidth="w-28"
            />
          </motion.div>

          {/* Résultats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="space-y-6"
          >
            {/* Donut + total mensuel */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-off-white-elevated border border-gold-deep/25 shadow-[0_30px_80px_-30px_oklch(0.22_0.012_50/0.18)]">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Donut
                  percents={{
                    mortgage: calc.mortgagePercent,
                    tax: calc.taxPercent,
                    insurance: calc.insurancePercent,
                  }}
                />
                <div className="flex-1 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold-deep/80 mb-3">
                    {t(translations.calculator.totalMonthly)}
                  </p>
                  <div className="font-display text-4xl md:text-5xl text-gold-gradient leading-none mb-2">
                    <AnimatedNumber value={calc.totalMonthly} format={fmt} />
                  </div>
                  <p className="text-xs text-ink-soft mt-3">
                    {t(translations.calculator.includingTaxInsurance)}
                  </p>
                </div>
              </div>
            </div>

            {/* Ventilation */}
            <div className="p-6 md:p-7 rounded-2xl bg-off-white-elevated border border-gold-deep/15 shadow-[0_20px_60px_-25px_oklch(0.22_0.012_50/0.10)] space-y-4">
              <Breakdown
                label={t(translations.calculator.mortgage)}
                value={fmt(calc.monthlyMortgage)}
                percent={calc.mortgagePercent}
                color="var(--gold)"
              />
              <Breakdown
                label={t(translations.calculator.taxes)}
                value={fmt(calc.monthlyTax)}
                percent={calc.taxPercent}
                color="var(--gold-deep)"
              />
              <Breakdown
                label={t(translations.calculator.insuranceLabel)}
                value={fmt(calc.monthlyInsurance)}
                percent={calc.insurancePercent}
                color="oklch(0.45 0.08 75)"
              />
            </div>

            {/* Vue d'ensemble du financement — totaux + LTV */}
            <div className="p-6 md:p-7 rounded-2xl bg-off-white-elevated border border-gold-deep/20 shadow-[0_20px_60px_-25px_oklch(0.22_0.012_50/0.10)]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-gold-deep/85 mb-5">
                {t(translations.calculator.totalsTitle)}
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <TotalCell
                  label={t(translations.calculator.loanAmount)}
                  value={fmt(calc.loanAmount)}
                />
                <TotalCell
                  label={t(translations.calculator.totalInterest)}
                  value={fmt(calc.totalInterest)}
                />
                <TotalCell
                  label={t(translations.calculator.totalMortgage)}
                  value={fmt(calc.totalMortgage)}
                />
              </div>
              <div className="mt-5 pt-5 border-t border-gold-deep/15">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                    {t(translations.calculator.ltv)}
                  </span>
                  <span className="font-display text-2xl md:text-3xl text-gold-gradient tabular-nums leading-none">
                    {fmtPct(calc.ltv)}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-ink-soft leading-relaxed">
                  {t(translations.calculator.ltvHelp)}
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="group relative overflow-hidden block w-full p-5 rounded-xl bg-gradient-gold text-black-deep font-semibold text-center transition-all duration-300 hover:-translate-y-0.5 shadow-gold hover:shadow-gold-sm btn-shine btn-glow"
            >
              <span className="inline-flex items-center gap-2">
                {t(translations.calculator.cta)}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>

            <p className="text-[11px] text-ink-soft leading-relaxed">
              {t(translations.calculator.disclaimer)}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TotalCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-1.5 leading-tight">
        {label}
      </div>
      <div className="font-display text-base md:text-lg text-ink tabular-nums leading-tight">
        {value}
      </div>
    </div>
  );
}

function Breakdown({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline text-sm mb-1.5">
        <span className="flex items-center gap-2 text-ink-muted">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          {label}
        </span>
        <span className="font-display text-ink tabular-nums">{value}</span>
      </div>
      <div className="relative h-1 rounded-full bg-[oklch(0.22_0.012_50/0.08)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
