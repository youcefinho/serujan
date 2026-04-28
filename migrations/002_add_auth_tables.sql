-- Migration D1 — Ajout des tables de sécurité admin
-- Pour les bases de données existantes (déjà en production)
-- Exécuter via : npx wrangler d1 execute NOM-DB-LEADS --file=./migrations/002_add_auth_tables.sql

-- Sessions admin avec expiration
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- Tentatives de connexion pour rate limiting (5/h par IP)
CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  attempted_at TEXT DEFAULT (datetime('now'))
);
