-- Migration 003 : rate limiting des soumissions de leads
-- Exécuter via : npx wrangler d1 execute serujan-leads --file=./migrations/003_add_lead_attempts.sql --remote

CREATE TABLE IF NOT EXISTS lead_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  attempted_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_lead_attempts_ip_time ON lead_attempts(ip, attempted_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time ON login_attempts(ip, attempted_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
