import { describe, it, expect } from "vitest";
import { translations } from "../lib/translations";

// Vérifie que TOUTES les clés de traduction ont les deux langues (FR et EN)

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
      errors.push(
        ...checkTranslationKeys(value as Record<string, unknown>, currentPath)
      );
    }
  }

  return errors;
}

describe("Système i18n — Intégrité des traductions (Serujan)", () => {
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

  it("les sections commerciales principales existent", () => {
    const requiredSections = [
      "hero",
      "approche",
      "footer",
      "valueCards",
      "services",
      "process",
      "calculator",
      "freeConsultation",
      "leadForm",
      "statsBar",
      "nav",
      "exitIntent",
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

  it("les value cards ont 3 items en FR et EN", () => {
    expect(translations.valueCards.cards.fr).toHaveLength(3);
    expect(translations.valueCards.cards.en).toHaveLength(3);
  });

  it("le process a 4 étapes en FR et EN", () => {
    expect(translations.process.steps.fr).toHaveLength(4);
    expect(translations.process.steps.en).toHaveLength(4);
  });
});
