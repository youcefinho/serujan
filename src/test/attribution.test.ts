import { describe, it, expect, beforeEach } from "vitest";
import { captureOnce, getAttribution, clearAttribution } from "@/lib/attribution";

describe("attribution", () => {
  beforeEach(() => {
    sessionStorage.clear();
    // Reset URL via history (jsdom)
    window.history.replaceState({}, "", "/");
  });

  it("retourne objet vide si rien n'a été capturé", () => {
    const attr = getAttribution();
    expect(attr.utm_source).toBe("");
    expect(attr.utm_medium).toBe("");
    expect(attr.referrer).toBe("");
  });

  it("capture les UTM depuis l'URL au premier appel", () => {
    window.history.replaceState(
      {},
      "",
      "/?utm_source=google&utm_medium=cpc&utm_campaign=spring2026&utm_term=courtier&utm_content=hero",
    );
    captureOnce();
    const attr = getAttribution();
    expect(attr.utm_source).toBe("google");
    expect(attr.utm_medium).toBe("cpc");
    expect(attr.utm_campaign).toBe("spring2026");
    expect(attr.utm_term).toBe("courtier");
    expect(attr.utm_content).toBe("hero");
  });

  it("ne ré-écrase PAS l'attribution si captureOnce appelé 2 fois", () => {
    window.history.replaceState({}, "", "/?utm_source=facebook&utm_medium=social");
    captureOnce();

    // Simulation : l'utilisateur navigue vers une autre page sans UTM
    window.history.replaceState({}, "", "/page2");
    captureOnce(); // doit être no-op

    const attr = getAttribution();
    expect(attr.utm_source).toBe("facebook");
    expect(attr.utm_medium).toBe("social");
  });

  it("capture la langue navigateur", () => {
    captureOnce();
    const attr = getAttribution();
    // jsdom default = "en-US"
    expect(attr.language).toMatch(/[a-z]{2}/);
  });

  it("captured_at est un ISO 8601 valide", () => {
    captureOnce();
    const attr = getAttribution();
    expect(() => new Date(attr.captured_at).toISOString()).not.toThrow();
  });

  it("clearAttribution permet une re-capture", () => {
    window.history.replaceState({}, "", "/?utm_source=email");
    captureOnce();
    expect(getAttribution().utm_source).toBe("email");

    clearAttribution();
    window.history.replaceState({}, "", "/?utm_source=linkedin");
    captureOnce();
    expect(getAttribution().utm_source).toBe("linkedin");
  });

  it("tronque les UTM trop longs (anti-pollution payload)", () => {
    const long = "x".repeat(500);
    window.history.replaceState({}, "", `/?utm_source=${long}`);
    captureOnce();
    expect(getAttribution().utm_source.length).toBeLessThanOrEqual(100);
  });

  it("getAttribution est tolérant aux données corrompues en sessionStorage", () => {
    sessionStorage.setItem("serujan-attribution", "{not valid json");
    const attr = getAttribution();
    expect(attr.utm_source).toBe("");
  });
});
