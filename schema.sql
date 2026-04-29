-- Cloudflare D1 — Schéma pour un site client commercial Intralys
-- Exécuter via : npx wrangler d1 execute NOM-DB-LEADS --file=./schema.sql --remote

-- Table principale : leads (contacts entrants)
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  estimated_amount TEXT DEFAULT '',
  message TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Table sécurité : sessions admin (token + expiration)
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- Table sécurité : tentatives de connexion (rate limiting)
CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  attempted_at TEXT DEFAULT (datetime('now'))
);
