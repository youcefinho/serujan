import { describe, it, expect } from "vitest";
import { translations } from "../lib/translations";

// Vérifie que TOUTES les clés de traduction ont les deux langues (FR et EN)

function checkTranslationKeys(obj: Record<string, unknown>, path = ""): string[] {
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
    } else if (value && typeof value === "object" && !Array.isArray(value) && !("fr" in value)) {
      errors.push(...checkTranslationKeys(value as Record<string, unknown>, currentPath));
    }
  }

  return errors;
}

describe("Système i18n — Intégrité des traductions (Serujan)", () => {
  it("toutes les clés de traduction ont une version FR et EN", () => {
    const errors = checkTranslationKeys(translations as unknown as Record<string, unknown>);
    if (errors.length > 0) {
      throw new Error(`Traductions manquantes :\n${errors.map((e) => `  - ${e}`).join("\n")}`);
    }
    expect(errors).toHaveLength(0);
  });

  it("les sections commerciales principales existent", () => {
    const requiredSections = [
      "hero",
      "approche",
      "footer",
      "services",
      "process",
      "calculator",
      "leadForm",
      "nav",
    ];

    for (const section of requiredSections) {
      expect(translations, `Section "${section}" manquante dans translations.ts`).toHaveProperty(
        section,
      );
    }
  });

  it("le hero a un titre tripartite FR et EN distincts", () => {
    expect(translations.hero.titleLead.fr).toBeTruthy();
    expect(translations.hero.titleLead.en).toBeTruthy();
    expect(translations.hero.titleEmphasis.fr).toBeTruthy();
    expect(translations.hero.titleTail.fr).toBeTruthy();
    expect(translations.hero.titleLead.fr).not.toBe(translations.hero.titleLead.en);
  });

  it("le process a 4 étapes en FR et EN", () => {
    expect(translations.process.steps.fr).toHaveLength(4);
    expect(translations.process.steps.en).toHaveLength(4);
  });

  it("services a 3 piliers", () => {
    expect(translations.services.pillar1.title.fr).toBeTruthy();
    expect(translations.services.pillar2.title.fr).toBeTruthy();
    expect(translations.services.pillar3.title.fr).toBeTruthy();
  });
});
