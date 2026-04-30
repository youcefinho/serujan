import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  splitName,
  toE164,
  deriveTags,
  buildGhlPayload,
  forwardToGhl,
} from "@/worker/ghl";
import type { GhlConfig } from "@/worker/ghl";

const CFG: GhlConfig = {
  enabled: true,
  sourcePrefix: "serujan",
  clientName: "Serujan",
  defaultTags: ["site-lead"],
  defaultCountry: "CA",
};

describe("splitName", () => {
  it("split 'Serujan Kaneshalingam' en first + last", () => {
    expect(splitName("Serujan Kaneshalingam")).toEqual({
      firstName: "Serujan",
      lastName: "Kaneshalingam",
    });
  });

  it("split 'Jean-Pierre Tremblay-Lavoie' garde le 2e nom complet", () => {
    expect(splitName("Jean-Pierre Tremblay-Lavoie")).toEqual({
      firstName: "Jean-Pierre",
      lastName: "Tremblay-Lavoie",
    });
  });

  it("3 tokens : firstName = 1er, lastName = reste", () => {
    expect(splitName("Marie Claire Dubois")).toEqual({
      firstName: "Marie",
      lastName: "Claire Dubois",
    });
  });

  it("nom unique : lastName vide", () => {
    expect(splitName("Madonna")).toEqual({ firstName: "Madonna", lastName: "" });
  });

  it("vide ou whitespace : tout vide", () => {
    expect(splitName("")).toEqual({ firstName: "", lastName: "" });
    expect(splitName("   ")).toEqual({ firstName: "", lastName: "" });
  });

  it("normalise les espaces multiples", () => {
    expect(splitName("Jean    Pierre")).toEqual({ firstName: "Jean", lastName: "Pierre" });
  });
});

describe("toE164", () => {
  it("10 digits CA → +1XXXXXXXXXX", () => {
    expect(toE164("(514) 701-6171", "CA")).toBe("+15147016171");
  });

  it("11 digits commençant par 1 → +1...", () => {
    expect(toE164("15147016171", "CA")).toBe("+15147016171");
  });

  it("strip espaces et caractères non-digit", () => {
    expect(toE164("514 701 6171", "CA")).toBe("+15147016171");
    expect(toE164("(514) 701.6171", "CA")).toBe("+15147016171");
  });

  it("vide → vide", () => {
    expect(toE164("", "CA")).toBe("");
  });

  it("non-CA digits arbitraires → prepend +", () => {
    expect(toE164("33612345678", "FR")).toBe("+33612345678");
  });
});

describe("deriveTags", () => {
  it("source + lang + defaults", () => {
    const tags = deriveTags({
      source: "leadform",
      language: "fr-CA",
      prefix: "serujan",
      defaultTags: ["site-lead"],
    });
    expect(tags).toContain("serujan-leadform");
    expect(tags).toContain("lang-fr");
    expect(tags).toContain("site-lead");
  });

  it("ajoute UTM tags", () => {
    const tags = deriveTags({
      source: "calculator",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "spring 2026",
      prefix: "serujan",
      defaultTags: [],
    });
    expect(tags).toContain("utm-google");
    expect(tags).toContain("utm-medium-cpc");
    expect(tags).toContain("campaign-spring-2026");
  });

  it("dedup case-insensitive", () => {
    const tags = deriveTags({
      source: "leadform",
      utmSource: "Google",
      prefix: "serujan",
      defaultTags: ["serujan-leadform", "SITE-LEAD"],
    });
    // serujan-leadform doit apparaître 1× même si dans defaults
    const lower = tags.map((t) => t.toLowerCase());
    expect(lower.filter((t) => t === "serujan-leadform")).toHaveLength(1);
  });

  it("cap à 10 tags max", () => {
    const tags = deriveTags({
      source: "leadform",
      language: "fr-CA",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "x",
      prefix: "serujan",
      defaultTags: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    });
    expect(tags.length).toBeLessThanOrEqual(10);
  });

  it("normalise les accents et espaces (kebab)", () => {
    const tags = deriveTags({
      source: "leadform",
      utmCampaign: "Été Été 2026",
      prefix: "serujan",
      defaultTags: [],
    });
    expect(tags).toContain("campaign-ete-ete-2026");
  });
});

describe("buildGhlPayload", () => {
  const baseLead = {
    name: "Serujan Kaneshalingam",
    email: "x@y.com",
    phone: "(514) 701-6171",
    project_type: "Acquisition",
    estimated_amount: "5 000 000 $",
    message: "Hello",
    source: "leadform",
  };
  const baseAttr = {
    utm_source: "google",
    language: "fr-CA",
  };

  it("structure complète", () => {
    const p = buildGhlPayload(baseLead, baseAttr, CFG);
    expect(p.firstName).toBe("Serujan");
    expect(p.lastName).toBe("Kaneshalingam");
    expect(p.email).toBe("x@y.com");
    expect(p.phone).toBe("+15147016171");
    expect(p.source).toBe("serujan-leadform");
    expect(p.tags).toContain("serujan-leadform");
    expect(p.tags).toContain("lang-fr");
    expect(p.tags).toContain("utm-google");
    expect(p.customFields.project_type).toBe("Acquisition");
    expect(p.customFields.site_source).toBe("Serujan");
  });

  it("omet les customFields vides", () => {
    const p = buildGhlPayload(
      { ...baseLead, project_type: "", estimated_amount: "", message: "" },
      {},
      CFG,
    );
    expect(p.customFields.project_type).toBeUndefined();
    expect(p.customFields.estimated_amount).toBeUndefined();
    expect(p.customFields.message).toBeUndefined();
    expect(p.customFields.site_source).toBe("Serujan"); // toujours présent
  });

  it("pas d'email/phone si non fournis", () => {
    const p = buildGhlPayload({ ...baseLead, email: "", phone: "" }, {}, CFG);
    expect(p.email).toBeUndefined();
    expect(p.phone).toBeUndefined();
  });

  it("submitted_at est ISO 8601", () => {
    const p = buildGhlPayload(baseLead, {}, CFG);
    expect(() => new Date(p.customFields.submitted_at).toISOString()).not.toThrow();
  });
});

describe("forwardToGhl", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const lead = {
    name: "Test User",
    email: "test@x.com",
    phone: "5147016171",
    project_type: "",
    estimated_amount: "",
    message: "",
    source: "leadform",
  };

  it("status='skipped' si webhookUrl absent", async () => {
    const r = await forwardToGhl(undefined, CFG, lead, {});
    expect(r.status).toBe("skipped");
    expect(r.attempts).toBe(0);
  });

  it("status='skipped' si cfg.enabled=false", async () => {
    const r = await forwardToGhl("https://x.test", { ...CFG, enabled: false }, lead, {});
    expect(r.status).toBe("skipped");
  });

  it("status='ok' au 1er essai si réponse 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("OK", { status: 200 })),
    );
    const r = await forwardToGhl("https://x.test", CFG, lead, {});
    expect(r.status).toBe("ok");
    expect(r.attempts).toBe(1);
  });

  it("retry une fois si 1er échec, status='ok' au 2e", async () => {
    let calls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() => {
        calls++;
        if (calls === 1) return Promise.resolve(new Response("err", { status: 500 }));
        return Promise.resolve(new Response("OK", { status: 200 }));
      }),
    );
    const r = await forwardToGhl("https://x.test", CFG, lead, {});
    expect(r.status).toBe("ok");
    expect(r.attempts).toBe(2);
  });

  it("status='error' si 2 échecs", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 500 })),
    );
    const r = await forwardToGhl("https://x.test", CFG, lead, {});
    expect(r.status).toBe("error");
    expect(r.attempts).toBe(2);
    expect(r.response).toContain("500");
  });
});
