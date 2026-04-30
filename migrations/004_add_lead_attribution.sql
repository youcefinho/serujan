-- Migration 004 — Attribution leads + sync GoHighLevel
-- Ajoute les colonnes nécessaires pour : multi-tenant GHL, source tracking,
-- UTM/referrer/language capture, et statut de sync vers le webhook GHL.
--
-- Toutes les colonnes sont additives avec DEFAULT '' → 0 risque sur les rows existantes.
-- Application : npx wrangler d1 execute serujan-leads --file=./migrations/004_add_lead_attribution.sql --remote

-- Source attribution (entrée du tunnel + UTM + contexte navigateur)
ALTER TABLE leads ADD COLUMN source           TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN utm_source       TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN utm_medium       TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN utm_campaign     TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN utm_term         TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN utm_content      TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN referrer         TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN language         TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN tags             TEXT DEFAULT '';

-- GHL sync tracking (set asynchronement après le forward webhook)
ALTER TABLE leads ADD COLUMN synced_to_ghl_at TEXT;
ALTER TABLE leads ADD COLUMN ghl_status       TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN ghl_response     TEXT DEFAULT '';

-- Index pour filtrage admin rapide
CREATE INDEX IF NOT EXISTS idx_leads_source     ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_ghl_status ON leads(ghl_status);
