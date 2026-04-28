import { describe, it, expect } from "vitest";

// Test de la formule hypothécaire canadienne (semi-annual compounding)
// Reproduit la logique exacte de Calculator.tsx
function calculateMortgage(price: number, downPercent: number, rate: number, years: number): number {
  const principal = price * (1 - downPercent / 100);
  const r = Math.pow(1 + rate / 100 / 2, 1 / 6) - 1;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Calcul du coût mensuel total (hypothèque + taxes + assurance)
function calculateTotalMonthly(
  price: number,
  downPercent: number,
  rate: number,
  years: number,
  propertyTax: number,
  insurance: number,
): number {
  const mortgage = calculateMortgage(price, downPercent, rate, years);
  return mortgage + propertyTax / 12 + insurance / 12;
}

describe("Calculatrice hypothécaire canadienne", () => {
  it("calcule correctement un paiement mensuel standard", () => {
    // 450 000$ prix, 10% mise de fonds, 5.25% taux, 25 ans
    const monthly = calculateMortgage(450000, 10, 5.25, 25);
    // Le paiement mensuel devrait être autour de 2400-2500$ pour ces paramètres
    expect(monthly).toBeGreaterThan(2300);
    expect(monthly).toBeLessThan(2600);
  });

  it("retourne un montant plus bas avec une mise de fonds plus élevée", () => {
    const low = calculateMortgage(450000, 5, 5.25, 25);
    const high = calculateMortgage(450000, 20, 5.25, 25);
    expect(high).toBeLessThan(low);
  });

  it("retourne un montant plus bas avec un taux plus bas", () => {
    const highRate = calculateMortgage(450000, 10, 7, 25);
    const lowRate = calculateMortgage(450000, 10, 3, 25);
    expect(lowRate).toBeLessThan(highRate);
  });

  it("retourne un montant plus bas avec un amortissement plus long", () => {
    const short = calculateMortgage(450000, 10, 5.25, 15);
    const long = calculateMortgage(450000, 10, 5.25, 30);
    expect(long).toBeLessThan(short);
  });

  it("gère un taux de 0% sans erreur", () => {
    const monthly = calculateMortgage(300000, 20, 0, 25);
    // 240000 / 300 mois = 800$/mois
    expect(monthly).toBeCloseTo(800, 0);
  });

  it("calcule correctement avec une mise de fonds minimale de 5%", () => {
    const monthly = calculateMortgage(300000, 5, 5, 25);
    // Principal = 285000$, devrait donner environ 1650-1700$/mois
    expect(monthly).toBeGreaterThan(1500);
    expect(monthly).toBeLessThan(1800);
  });
});

describe("Ventilation mensuelle totale (hypothèque + taxes + assurance)", () => {
  it("additionne correctement les 3 composantes", () => {
    const mortgage = calculateMortgage(450000, 10, 5.25, 25);
    const propertyTax = 4000; // 4000$/an
    const insurance = 1800;   // 1800$/an

    const total = calculateTotalMonthly(450000, 10, 5.25, 25, propertyTax, insurance);
    const expected = mortgage + 4000 / 12 + 1800 / 12;

    expect(total).toBeCloseTo(expected, 2);
  });

  it("inclut les taxes foncières divisées par 12", () => {
    const withoutTax = calculateTotalMonthly(450000, 10, 5.25, 25, 0, 0);
    const withTax = calculateTotalMonthly(450000, 10, 5.25, 25, 6000, 0);

    expect(withTax - withoutTax).toBeCloseTo(500, 0); // 6000/12 = 500$/mois
  });

  it("inclut l'assurance divisée par 12", () => {
    const withoutInsurance = calculateTotalMonthly(450000, 10, 5.25, 25, 0, 0);
    const withInsurance = calculateTotalMonthly(450000, 10, 5.25, 25, 0, 2400);

    expect(withInsurance - withoutInsurance).toBeCloseTo(200, 0); // 2400/12 = 200$/mois
  });

  it("le total est toujours supérieur à l'hypothèque seule", () => {
    const mortgage = calculateMortgage(450000, 10, 5.25, 25);
    const total = calculateTotalMonthly(450000, 10, 5.25, 25, 3000, 1200);

    expect(total).toBeGreaterThan(mortgage);
  });
});
