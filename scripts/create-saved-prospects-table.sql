-- Table pour stocker les prospects sauvegardés par utilisateur
CREATE TABLE IF NOT EXISTS saved_prospects (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES wct_users(id) ON DELETE CASCADE,
  siren           TEXT NOT NULL,
  siret_siege     TEXT,
  nom             TEXT NOT NULL,
  sigle           TEXT,
  code_naf        TEXT,
  libelle_activite TEXT,
  secteur         TEXT,
  date_creation   TEXT,
  adresse         TEXT,
  code_postal     TEXT,
  ville           TEXT,
  departement     TEXT,
  categorie       TEXT,
  effectif        TEXT,
  dirigeant       TEXT,
  chiffre_affaires TEXT,
  resultat_net    TEXT,
  statut          TEXT,
  nature_juridique TEXT,
  labels          TEXT[] DEFAULT '{}',
  fiche_annuaire  TEXT,
  fiche_pappers   TEXT,
  notes           TEXT DEFAULT '',
  tags            TEXT[] DEFAULT '{}',
  saved_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, siren)
);

CREATE INDEX IF NOT EXISTS idx_saved_prospects_user ON saved_prospects(user_id);
