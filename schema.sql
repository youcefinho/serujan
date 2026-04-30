-- Cloudflare D1 — Schéma Serujan v2
-- Exécuter via : npx wrangler d1 execute serujan-leads --file=./schema.sql --remote

-- Table principale : leads commerciaux
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  estimated_amount TEXT DEFAULT '',
  message TEXT DEFAULT '',
  -- Attribution (migration 004)
  source TEXT DEFAULT '',           -- leadform | midpage_cta | exit_intent | calculator
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  utm_term TEXT DEFAULT '',
  utm_content TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  language TEXT DEFAULT '',
  tags TEXT DEFAULT '',              -- JSON array stringifié
  -- GHL sync tracking (migration 004)
  synced_to_ghl_at TEXT,             -- ISO 8601 nullable
  ghl_status TEXT DEFAULT '',        -- ok | error | skipped | pending
  ghl_response TEXT DEFAULT '',      -- payload retour GHL truncated 500 chars
  created_at TEXT DEFAULT (datetime('now'))
);

-- Sessions admin (token + expiration)
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- Rate limiting login admin
CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  attempted_at TEXT DEFAULT (datetime('now'))
);

-- Rate limiting soumissions de leads (max 10/h par IP)
CREATE TABLE IF NOT EXISTS lead_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  attempted_at TEXT DEFAULT (datetime('now'))
);

-- Index pour accélérer les lookups par IP/temps
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time ON login_attempts(ip, attempted_at);
CREATE INDEX IF NOT EXISTS idx_lead_attempts_ip_time ON lead_attempts(ip, attempted_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source     ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_ghl_status ON leads(ghl_status);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
