import { describe, it, expect } from "vitest";

// Test de la formule hypothécaire canadienne (semi-annual compounding)
// Adapté pour le simulateur commercial (montants plus élevés)
function calculateMortgage(
  price: number,
  downPercent: number,
  rate: number,
  years: number,
): number {
  const principal = price * (1 - downPercent / 100);
  const r = Math.pow(1 + rate / 100 / 2, 1 / 6) - 1;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Calcul du coût mensuel total
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

describe("Simulateur hypothécaire commercial", () => {
  it("calcule correctement un paiement sur un immeuble commercial de 2M$", () => {
    const monthly = calculateMortgage(2000000, 25, 5.5, 25);
    expect(monthly).toBeGreaterThan(8000);
    expect(monthly).toBeLessThan(11000);
  });

  it("retourne un montant plus bas avec une mise de fonds plus élevée", () => {
    const low = calculateMortgage(2000000, 20, 5.5, 25);
    const high = calculateMortgage(2000000, 35, 5.5, 25);
    expect(high).toBeLessThan(low);
  });

  it("retourne un montant plus bas avec un taux plus bas", () => {
    const highRate = calculateMortgage(5000000, 25, 7, 25);
    const lowRate = calculateMortgage(5000000, 25, 4, 25);
    expect(lowRate).toBeLessThan(highRate);
  });

  it("gère un taux de 0% sans erreur", () => {
    const monthly = calculateMortgage(1000000, 25, 0, 25);
    // 750000 / 300 mois = 2500$/mois
    expect(monthly).toBeCloseTo(2500, 0);
  });

  it("calcule un gros montant (50M$)", () => {
    const monthly = calculateMortgage(50000000, 30, 5, 25);
    expect(monthly).toBeGreaterThan(180000);
    expect(monthly).toBeLessThan(220000);
  });
});

describe("Ventilation mensuelle totale", () => {
  it("additionne correctement les 3 composantes", () => {
    const mortgage = calculateMortgage(3000000, 25, 5.5, 25);
    const propertyTax = 40000;
    const insurance = 12000;
    const total = calculateTotalMonthly(3000000, 25, 5.5, 25, propertyTax, insurance);
    const expected = mortgage + 40000 / 12 + 12000 / 12;
    expect(total).toBeCloseTo(expected, 2);
  });

  it("le total est toujours supérieur à l'hypothèque seule", () => {
    const mortgage = calculateMortgage(3000000, 25, 5.5, 25);
    const total = calculateTotalMonthly(3000000, 25, 5.5, 25, 30000, 8000);
    expect(total).toBeGreaterThan(mortgage);
  });
});
