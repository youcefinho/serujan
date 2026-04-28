import { describe, it, expect } from "vitest";
import { translations } from "../lib/translations";

// Vérifie que TOUTES les clés de traduction ont les deux langues (FR et EN)

// Fonction récursive pour vérifier les clés de traduction
function checkTranslationKeys(
  obj: Record<string, unknown>,
  path = ""
): string[] {
  const errors: string[] = [];

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const currentPath = path ? `${path}.${key}` : key;

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "fr" in value &&
      "en" in value
    ) {
      // C'est une paire de traduction { fr, en }
      const pair = value as { fr: unknown; en: unknown };

      if (pair.fr === undefined || pair.fr === null || pair.fr === "") {
        errors.push(`${currentPath}.fr est vide`);
      }
      if (pair.en === undefined || pair.en === null || pair.en === "") {
        errors.push(`${currentPath}.en est vide`);
      }
    } else if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !("fr" in value)
    ) {
      // C'est un objet imbriqué — descendre
      errors.push(
        ...checkTranslationKeys(value as Record<string, unknown>, currentPath)
      );
    }
  }

  return errors;
}

describe("Système i18n — Intégrité des traductions", () => {
  it("toutes les clés de traduction ont une version FR et EN", () => {
    const errors = checkTranslationKeys(
      translations as unknown as Record<string, unknown>
    );
    if (errors.length > 0) {
      throw new Error(
        `Traductions manquantes :\n${errors.map((e) => `  - ${e}`).join("\n")}`
      );
    }
    expect(errors).toHaveLength(0);
  });

  it("les sections principales existent", () => {
    const requiredSections = [
      "hero",
      "about",
      "footer",
      "faq",
      "testimonials",
      "pillars",
      "process",
      "fears",
      "triggers",
      "enemy",
      "manifesto",
      "leadMagnet",
      "statsBar",
      "marketStats",
      "team",
      "instagram",
    ];

    for (const section of requiredSections) {
      expect(
        translations,
        `Section "${section}" manquante dans translations.ts`
      ).toHaveProperty(section);
    }
  });

  it("le hero contient un titre FR et EN", () => {
    expect(translations.hero.title.fr).toBeTruthy();
    expect(translations.hero.title.en).toBeTruthy();
    expect(translations.hero.title.fr).not.toBe(translations.hero.title.en);
  });

  it("les tableaux FR et EN ont la même longueur", () => {
    // Vérifier les FAQ
    if (translations.faq?.items) {
      const frItems = translations.faq.items.fr;
      const enItems = translations.faq.items.en;
      if (Array.isArray(frItems) && Array.isArray(enItems)) {
        expect(
          frItems.length,
          "FAQ: nombre d'items FR ≠ EN"
        ).toBe(enItems.length);
      }
    }

    // Vérifier les témoignages
    if (translations.testimonials?.items) {
      const frItems = translations.testimonials.items.fr;
      const enItems = translations.testimonials.items.en;
      if (Array.isArray(frItems) && Array.isArray(enItems)) {
        expect(
          frItems.length,
          "Testimonials: nombre d'items FR ≠ EN"
        ).toBe(enItems.length);
      }
    }
  });
});
