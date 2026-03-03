export type Fiche = {
  siren: string
  siret_siege: string | null
  nom: string
  sigle: string | null
  code_naf: string | null
  libelle_activite: string | null
  secteur: string | null
  date_creation: string | null
  adresse: string | null
  code_postal: string | null
  ville: string | null
  departement: string | null
  latitude: number | null
  longitude: number | null
  categorie: string | null
  effectif: string | null
  nb_etablissements: number | null
  dirigeant: string | null
  nb_dirigeants: number | null
  chiffre_affaires: string | null
  resultat_net: string | null
  annee_finance: string | null
  statut: string | null
  nature_juridique: string | null
  labels: string[]
  fiche_annuaire: string | null
  fiche_pappers: string | null
}

export type SavedProspect = Fiche & {
  id: number
  user_id: number
  notes: string
  tags: string[]
  saved_at: string
}
