-- Migration — Ajouter les colonnes manquantes à la table leads
-- Exécuter via : npx wrangler d1 execute mathis-guimont-leads --file=./migration-leads.sql --remote

ALTER TABLE leads ADD COLUMN budget TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN timeline TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN address TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN property_type TEXT DEFAULT '';
