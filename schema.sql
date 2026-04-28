-- Cloudflare D1 — Schéma de la table leads
-- Exécuter dans la console D1 du Dashboard Cloudflare
-- ou via : npx wrangler d1 execute NOM-DB-LEADS --file=./schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT DEFAULT '',
  type TEXT CHECK (type IN ('buy', 'sell')) DEFAULT 'buy',
  budget TEXT DEFAULT '',
  timeline TEXT DEFAULT '',
  address TEXT DEFAULT '',
  property_type TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
