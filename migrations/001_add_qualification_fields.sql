-- Migration D1 — Ajout des colonnes de qualification des leads
-- Pour les bases de données existantes (déjà en production)
-- Exécuter via : npx wrangler d1 execute NOM-DB-LEADS --file=./migrations/001_add_qualification_fields.sql

ALTER TABLE leads ADD COLUMN budget TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN timeline TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN address TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN property_type TEXT DEFAULT '';
