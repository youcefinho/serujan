import { describe, it, expect } from "vitest";
import {
  sanitizeHtml,
  sanitizeInput,
  isValidEmail,
  isLikelyBot,
  buildSecurityHeaders,
  CSP_DIRECTIVES,
  MIN_FORM_FILL_MS,
  MAX_INPUT_LENGTH,
} from "../lib/security";

describe("sanitizeHtml — protection XSS pour les emails", () => {
  it("échappe les caractères dangereux", () => {
    expect(sanitizeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
    );
  });

  it("échappe les guillemets et &", () => {
    expect(sanitizeHtml('Tom & "Jerry"')).toBe("Tom &amp; &quot;Jerry&quot;");
  });

  it("ne modifie pas un texte sans caractères spéciaux", () => {
    expect(sanitizeHtml("Hello World 123")).toBe("Hello World 123");
  });

  it("traite la chaîne vide", () => {
    expect(sanitizeHtml("")).toBe("");
  });
});

describe("sanitizeInput — trim + cap longueur", () => {
  it("trim les espaces en début/fin", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });

  it("retourne '' pour undefined", () => {
    expect(sanitizeInput(undefined)).toBe("");
  });

  it("retourne '' pour chaîne vide", () => {
    expect(sanitizeInput("")).toBe("");
  });

  it("respecte la limite de longueur custom", () => {
    expect(sanitizeInput("abcdefghij", 5)).toBe("abcde");
  });

  it("respecte la limite par défaut", () => {
    const long = "x".repeat(MAX_INPUT_LENGTH + 100);
    expect(sanitizeInput(long).length).toBe(MAX_INPUT_LENGTH);
  });
});

describe("isValidEmail — validation RFC simplifiée", () => {
  it.each([
    ["jean@example.com", true],
    ["jean.dupont+tag@sub.example.co.uk", true],
    ["a@b.c", true],
    ["", false],
    ["pas-un-email", false],
    ["@example.com", false],
    ["jean@", false],
    ["jean@example", false],
    ["jean @example.com", false],
    ["jean@example .com", false],
  ])("valide '%s' → %s", (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });

  it("rejette les emails trop longs (> 200 chars)", () => {
    const long = "a".repeat(195) + "@b.com"; // 201 chars total
    expect(isValidEmail(long)).toBe(false);
  });
});

describe("isLikelyBot — détection bot par honeypot + timing", () => {
  it("retourne true si le honeypot est rempli", () => {
    expect(isLikelyBot({ hp: "spam-content" })).toBe(true);
  });

  it("ignore le honeypot vide ou ne contenant que des espaces", () => {
    expect(isLikelyBot({ hp: "" })).toBe(false);
    expect(isLikelyBot({ hp: "   " })).toBe(false);
  });

  it(`retourne true si elapsed_ms < ${MIN_FORM_FILL_MS}`, () => {
    expect(isLikelyBot({ elapsed_ms: 500 })).toBe(true);
    expect(isLikelyBot({ elapsed_ms: 2999 })).toBe(true);
  });

  it("retourne false si elapsed_ms >= seuil", () => {
    expect(isLikelyBot({ elapsed_ms: 3000 })).toBe(false);
    expect(isLikelyBot({ elapsed_ms: 15_000 })).toBe(false);
  });

  it("retourne false sans honeypot ni timing (legacy/test)", () => {
    expect(isLikelyBot({})).toBe(false);
  });

  it("retourne true si honeypot ET timing échouent", () => {
    expect(isLikelyBot({ hp: "x", elapsed_ms: 100 })).toBe(true);
  });
});

describe("buildSecurityHeaders + CSP", () => {
  const headers = buildSecurityHeaders(CSP_DIRECTIVES);

  it("inclut les headers fondamentaux", () => {
    expect(headers).toHaveProperty("Content-Security-Policy");
    expect(headers).toHaveProperty("Strict-Transport-Security");
    expect(headers).toHaveProperty("X-Frame-Options", "DENY");
    expect(headers).toHaveProperty("X-Content-Type-Options", "nosniff");
    expect(headers).toHaveProperty("Referrer-Policy");
    expect(headers).toHaveProperty("Permissions-Policy");
  });

  it("HSTS active includeSubDomains et preload", () => {
    expect(headers["Strict-Transport-Security"]).toContain("includeSubDomains");
    expect(headers["Strict-Transport-Security"]).toContain("preload");
  });

  it("CSP refuse object-src et frame-ancestors par défaut", () => {
    expect(CSP_DIRECTIVES).toContain("object-src 'none'");
    expect(CSP_DIRECTIVES).toContain("frame-ancestors 'none'");
  });

  it("CSP whitelist Calendly et Google Analytics", () => {
    expect(CSP_DIRECTIVES).toContain("https://assets.calendly.com");
    expect(CSP_DIRECTIVES).toContain("https://*.google-analytics.com");
  });

  it("CSP autorise les fonts self-hosted (data: pour woff2 inline)", () => {
    expect(CSP_DIRECTIVES).toContain("font-src 'self' data:");
  });
});
