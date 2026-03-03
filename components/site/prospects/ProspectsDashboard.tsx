'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { searchNafCodes, type NafEntry } from '@/lib/naf-codes'

// ── Proxy Next.js → N8N ──────────────────────────────────────────────────────
const WEBHOOK_URL = '/api/prospection/webhook'

// ── Référentiels ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { code: '', label: 'Toutes catégories' },
  { code: 'PME', label: 'PME — Petite et moyenne entreprise' },
  { code: 'ETI', label: 'ETI — Entreprise de taille intermédiaire' },
  { code: 'GE', label: 'GE — Grande entreprise' },
]

const EFFECTIFS = [
  { code: '', label: 'Tous les effectifs' },
  { code: '00', label: '0 salarié' },
  { code: '01', label: '1–2 salariés' },
  { code: '02', label: '3–5 salariés' },
  { code: '11', label: '10–19 salariés' },
  { code: '21', label: '50–99 salariés' },
  { code: '31', label: '200–249 salariés' },
  { code: '41', label: '500–999 salariés' },
  { code: '53', label: '10 000+ salariés' },
]

const CHECKBOXES = [
  { key: 'est_bio', label: 'Bio' },
  { key: 'est_rge', label: 'RGE' },
  { key: 'est_qualiopi', label: 'Qualiopi' },
  { key: 'est_ess', label: 'ESS' },
  { key: 'est_association', label: 'Association' },
  { key: 'est_organisme_formation', label: 'Organisme de formation' },
  { key: 'est_societe_mission', label: 'Société à mission' },
  { key: 'est_entrepreneur_individuel', label: 'Entrepreneur individuel' },
] as const

type CheckboxKey = (typeof CHECKBOXES)[number]['key']

// ── Types formulaire ──────────────────────────────────────────────────────────

type Form = {
  q: string
  departement: string
  region: string
  code_postal: string
  activite_principale: string
  categorie_entreprise: string
  tranche_effectif_salarie: string
  ca_min: string
  ca_max: string
  per_page: string
  est_bio: boolean
  est_rge: boolean
  est_qualiopi: boolean
  est_ess: boolean
  est_association: boolean
  est_organisme_formation: boolean
  est_societe_mission: boolean
  est_entrepreneur_individuel: boolean
}

const INITIAL: Form = {
  q: '',
  departement: '',
  region: '',
  code_postal: '',
  activite_principale: '',
  categorie_entreprise: '',
  tranche_effectif_salarie: '',
  ca_min: '',
  ca_max: '',
  per_page: '10',
  est_bio: false,
  est_rge: false,
  est_qualiopi: false,
  est_ess: false,
  est_association: false,
  est_organisme_formation: false,
  est_societe_mission: false,
  est_entrepreneur_individuel: false,
}

function buildPayload(form: Form): Record<string, unknown> {
  const p: Record<string, unknown> = {}
  if (form.q.trim()) p.q = form.q.trim()
  if (form.departement.trim()) p.departement = form.departement.trim()
  if (form.region.trim()) p.region = form.region.trim()
  if (form.code_postal.trim()) p.code_postal = form.code_postal.trim()
  if (form.activite_principale.trim()) p.activite_principale = form.activite_principale.trim().toUpperCase()
  if (form.categorie_entreprise) p.categorie_entreprise = form.categorie_entreprise
  if (form.tranche_effectif_salarie) p.tranche_effectif_salarie = form.tranche_effectif_salarie
  if (form.ca_min) p.ca_min = Number(form.ca_min)
  if (form.ca_max) p.ca_max = Number(form.ca_max)
  p.per_page = Math.min(Math.max(Number(form.per_page) || 10, 1), 25)
  CHECKBOXES.forEach(({ key }) => { if (form[key as CheckboxKey]) p[key] = true })
  return p
}

// ── Types réponse webhook ─────────────────────────────────────────────────────

type Fiche = {
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

type WebhookResponse = {
  total_resultats: number
  page_actuelle: number
  par_page: number
  nb_fiches: number
  fiches: Fiche[]
}

function isWebhookResponse(data: unknown): data is WebhookResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'fiches' in data &&
    Array.isArray((data as WebhookResponse).fiches)
  )
}

// ── Types erreur structurée ──────────────────────────────────────────────────

type ApiErrorResponse = {
  success: false
  code: string
  message: string
  suggestion: string
  status: number
}

function isApiError(data: unknown): data is ApiErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    (data as ApiErrorResponse).success === false &&
    'code' in data
  )
}

const ERROR_ICONS: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  RATE_LIMIT: {
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
  },
  TIMEOUT: {
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
  },
  INVALID_PARAMS: {
    icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
  },
  SERVER_OFFLINE: {
    icon: 'M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
  },
  UPSTREAM_ERROR: {
    icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
  },
  UNKNOWN: {
    icon: 'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
  },
}

// ── Styles partagés ─────────────��─────────────────────────────────────────────

const inputCls =
  'w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700 disabled:opacity-50'

const selectCls =
  'w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700 disabled:opacity-50'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
      {children}
    </p>
  )
}

// ── Badges ────────────────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: string | null }) {
  if (!statut) return null
  const active = statut.toLowerCase().includes('activ') || statut.includes('\u2705')
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
      active
        ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400'
        : 'border bg-muted text-muted-foreground'
    }`}>
      <span className={`size-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-muted-foreground/50'}`} />
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}

function CategoryBadge({ categorie }: { categorie: string | null }) {
  if (!categorie) return null
  const lower = categorie.toLowerCase()
  let label = categorie
  let cls = 'border bg-muted text-muted-foreground'
  if (lower.includes('grande') || lower === 'ge') {
    label = 'GE'
    cls = 'border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400'
  } else if (lower.includes('interm') || lower === 'eti') {
    label = 'ETI'
    cls = 'border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-400'
  } else if (lower.includes('pme') || lower.includes('petite')) {
    label = 'PME'
    cls = 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400'
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}>{label}</span>
  )
}

// ── Avatar entreprise ─────────────────────────────────────────────────────────

function CompanyAvatar({ nom }: { nom: string }) {
  const initials = nom
    .split(/\s+/)
    .filter((w) => /[a-zA-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w.replace(/[^a-zA-Z]/g, '')[0])
    .join('')
    .toUpperCase() || nom.slice(0, 2).toUpperCase()

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
      {initials}
    </div>
  )
}

// ── Export CSV ────────────────────────────────────────────────────────────────

function exportCSV(fiches: Fiche[], query: string) {
  const headers = [
    'SIREN', 'SIRET si\u00e8ge', 'Nom', 'Sigle', 'Code NAF', 'Activit\u00e9', 'Secteur',
    'Date cr\u00e9ation', 'Adresse', 'CP', 'Ville', 'D\u00e9partement',
    'Cat\u00e9gorie', 'Effectif', 'Nb \u00e9tablissements',
    'Dirigeant', 'Nb dirigeants',
    "Chiffre d'affaires", 'R\u00e9sultat net', 'Ann\u00e9e finance',
    'Statut', 'Nature juridique', 'Labels',
    'Fiche annuaire', 'Fiche Pappers',
  ]
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = fiches.map((f) => [
    f.siren, f.siret_siege, f.nom, f.sigle, f.code_naf, f.libelle_activite, f.secteur,
    f.date_creation, f.adresse, f.code_postal, f.ville, f.departement,
    f.categorie, f.effectif, f.nb_etablissements,
    f.dirigeant, f.nb_dirigeants,
    f.chiffre_affaires, f.resultat_net, f.annee_finance,
    f.statut, f.nature_juridique, (f.labels ?? []).join(' | '),
    f.fiche_annuaire, f.fiche_pappers,
  ])
  const csv = [headers, ...rows].map((r) => r.map(esc).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `prospects-${(query || 'export').replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Autocomplete NAF ─────────────────────────────────────────────────────────

function NafAutocomplete({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (val: string) => void
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<NafEntry[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(v)
    const results = searchNafCodes(v, 8)
    setSuggestions(results)
    setOpen(results.length > 0)
  }

  const pick = (entry: NafEntry) => {
    onChange(entry.code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => { if (value && suggestions.length) setOpen(true) }}
        placeholder="Ex : 6201Z ou programmation"
        className={inputCls}
        disabled={disabled}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-auto rounded-xl border bg-background shadow-lg">
          {suggestions.map((entry) => (
            <button
              key={entry.code}
              type="button"
              onClick={() => pick(entry)}
              className="flex w-full items-start gap-3 px-3 py-2 text-left text-sm transition hover:bg-violet-50 dark:hover:bg-violet-950/30"
            >
              <span className="shrink-0 rounded bg-violet-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                {entry.code}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-foreground">{entry.label}</span>
                <span className="block text-[10px] text-muted-foreground">{entry.section}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Error Panel ──────────────────────────────────────────────────────────────

function ErrorPanel({
  error,
  onRetry,
  loading,
}: {
  error: ApiErrorResponse
  onRetry: () => void
  loading: boolean
}) {
  const style = ERROR_ICONS[error.code] ?? ERROR_ICONS.UNKNOWN

  return (
    <div className={`flex gap-4 rounded-2xl border p-5 ${style.bg} ${style.border}`}>
      <div className={`mt-0.5 shrink-0 ${style.color}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={`font-semibold text-sm ${style.color}`}>{error.message}</p>
          <span className="rounded-full border px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
            {error.code}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{error.suggestion}</p>
        <button
          type="button"
          onClick={onRetry}
          disabled={loading}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-background/80 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          </svg>
          R\u00e9essayer
        </button>
      </div>
    </div>
  )
}

function NetworkErrorPanel({
  message,
  onRetry,
  loading,
}: {
  message: string
  onRetry: () => void
  loading: boolean
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-800 dark:bg-red-950/30">
      <div className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm text-red-600 dark:text-red-400">Erreur de connexion</p>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          disabled={loading}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-background/80 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          </svg>
          R\u00e9essayer
        </button>
      </div>
    </div>
  )
}

// ── Aside explicatif ─────────────────────────────────────────────────────────

type FieldHint = { title: string; description: string; example?: string }

const FIELD_HINTS: Record<string, FieldHint> = {
  default: {
    title: 'Guide de recherche',
    description: 'Utilisez les champs ci-contre pour filtrer les entreprises fran\u00e7aises. Combinez plusieurs crit\u00e8res pour affiner vos r\u00e9sultats.',
  },
  q: {
    title: 'Recherche libre',
    description: 'Recherchez par nom d\'entreprise, mot-cl\u00e9 du secteur, m\u00e9tier ou adresse. La recherche est effectu\u00e9e en texte int\u00e9gral sur l\'ensemble des donn\u00e9es.',
    example: 'boulangerie, ACME SAS, plombier lyon',
  },
  departement: {
    title: 'D\u00e9partement',
    description: 'Code \u00e0 2 ou 3 chiffres du d\u00e9partement fran\u00e7ais. Pour les DOM-TOM, utilisez le code \u00e0 3 chiffres.',
    example: '75 (Paris), 13 (Bouches-du-Rh\u00f4ne), 974 (R\u00e9union)',
  },
  region: {
    title: 'R\u00e9gion (code INSEE)',
    description: 'Code num\u00e9rique de la r\u00e9gion selon la nomenclature INSEE. Permet de cibler une r\u00e9gion enti\u00e8re.',
    example: '11 (\u00cele-de-France), 84 (Auvergne-Rh\u00f4ne-Alpes), 93 (PACA)',
  },
  code_postal: {
    title: 'Code postal',
    description: 'Code postal \u00e0 5 chiffres pour cibler une commune pr\u00e9cise. Plus restrictif que le d\u00e9partement.',
    example: '75001, 69001, 33000',
  },
  activite_principale: {
    title: 'Code NAF / APE',
    description: 'Code de la Nomenclature d\'Activit\u00e9s Fran\u00e7aise (4 chiffres + 1 lettre). Identifie le secteur d\'activit\u00e9 principal de l\'entreprise. Tapez un mot-cl\u00e9 pour voir les suggestions.',
    example: '6201Z (Programmation), 4120A (Construction maisons)',
  },
  categorie_entreprise: {
    title: 'Cat\u00e9gorie d\'entreprise',
    description: 'Classification par taille : PME (< 250 salari\u00e9s, CA < 50M\u20ac), ETI (250-4999 salari\u00e9s), GE (5000+ salari\u00e9s ou CA > 1,5Md\u20ac).',
  },
  tranche_effectif_salarie: {
    title: 'Effectif salari\u00e9',
    description: 'Tranche d\'effectif selon la d\u00e9claration INSEE. Permet de cibler des entreprises par taille de personnel.',
  },
  ca_min: {
    title: 'Chiffre d\'affaires minimum',
    description: 'Seuil minimum de CA annuel en euros. Filtre les entreprises ayant un CA sup\u00e9rieur \u00e0 cette valeur.',
    example: '100000 (100k\u20ac), 1000000 (1M\u20ac)',
  },
  ca_max: {
    title: 'Chiffre d\'affaires maximum',
    description: 'Seuil maximum de CA annuel en euros. Combinable avec le minimum pour d\u00e9finir une fourchette.',
    example: '5000000 (5M\u20ac), 50000000 (50M\u20ac)',
  },
  per_page: {
    title: 'Nombre de r\u00e9sultats',
    description: 'Nombre d\'entreprises \u00e0 retourner par recherche (entre 1 et 25). Un nombre \u00e9lev\u00e9 peut ralentir la r\u00e9ponse.',
  },
  labels: {
    title: 'Labels & certifications',
    description: 'Filtrez par labels officiels : Bio, RGE (\u00e9co-\u00e9nergie), Qualiopi (formation), ESS (\u00e9conomie sociale), etc. Plusieurs labels combinables.',
  },
}

function FormAside({ activeField }: { activeField: string }) {
  const hint = FIELD_HINTS[activeField] ?? FIELD_HINTS.default

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        {/* Hint actif */}
        <div className="rounded-2xl border bg-background/60 p-5 shadow-sm backdrop-blur transition-all duration-200">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-violet-600 dark:text-violet-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold">{hint.title}</h3>
          </div>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{hint.description}</p>
          {hint.example && (
            <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Exemples</p>
              <p className="mt-0.5 font-mono text-xs text-foreground">{hint.example}</p>
            </div>
          )}
        </div>

        {/* Raccourcis */}
        <div className="rounded-2xl border bg-background/60 p-5 shadow-sm backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold">Raccourcis</h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">Entr\u00e9e</kbd>
              <span>Lancer la recherche</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">Tab</kbd>
              <span>Champ suivant</span>
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="rounded-2xl border border-dashed bg-background/40 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Source des donn\u00e9es</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Annuaire des Entreprises (data.gouv.fr) + enrichissement N8N. Donn\u00e9es mises \u00e0 jour quotidiennement.
          </p>
        </div>
      </div>
    </aside>
  )
}

// ── Fiche card ────────────────────────────────────────────────────────────────

function FicheCard({ fiche, index }: { fiche: Fiche; index: number }) {
  const [open, setOpen] = useState(false)

  const quickStats = [
    { label: 'Ville', value: fiche.ville ? `${fiche.ville}${fiche.departement ? ` (${fiche.departement})` : ''}` : null },
    { label: 'Effectif', value: fiche.effectif },
    { label: 'Dirigeant', value: fiche.dirigeant },
    { label: 'CA', value: fiche.chiffre_affaires },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-md">

      {/* En-t\u00eate cliquable */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left sm:gap-4"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border bg-muted text-[10px] font-medium text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <CompanyAvatar nom={fiche.nom} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold leading-tight tracking-tight">{fiche.nom}</span>
            {fiche.sigle && (
              <span className="rounded border px-1.5 py-px text-[10px] text-muted-foreground">{fiche.sigle}</span>
            )}
          </div>
          {(fiche.code_naf || fiche.libelle_activite) && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {fiche.code_naf && <span className="font-mono mr-1.5">{fiche.code_naf}</span>}
              {fiche.libelle_activite}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          <StatutBadge statut={fiche.statut} />
          <CategoryBadge categorie={fiche.categorie} />
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`ml-1 size-4 shrink-0 text-muted-foreground/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* Barre de stats rapides */}
      <div className="grid grid-cols-2 gap-px border-t bg-zinc-100 dark:bg-zinc-800/60 sm:grid-cols-4">
        {quickStats.map(({ label, value }) => (
          <div key={label} className="bg-background px-4 py-2.5">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50">{label}</p>
            <p className="mt-0.5 truncate text-xs font-medium">{value ?? <span className="text-muted-foreground/30">&mdash;</span>}</p>
          </div>
        ))}
      </div>

      {/* D\u00e9tails d\u00e9pliables */}
      {open && (
        <div className="border-t px-5 py-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Identification */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Identification</p>
              <dl className="space-y-2">
                {([
                  { label: 'SIREN', value: fiche.siren, mono: true },
                  { label: 'SIRET si\u00e8ge', value: fiche.siret_siege, mono: true },
                  { label: 'Nature juridique', value: fiche.nature_juridique },
                  { label: 'Date cr\u00e9ation', value: fiche.date_creation },
                  { label: 'Adresse', value: fiche.adresse },
                  { label: '\u00c9tablissements', value: fiche.nb_etablissements != null ? fiche.nb_etablissements.toLocaleString('fr-FR') : null },
                ] as { label: string; value: string | null | undefined; mono?: boolean }[]).map(({ label, value, mono }) => value ? (
                  <div key={label} className="flex gap-3">
                    <dt className="w-32 shrink-0 text-xs text-muted-foreground">{label}</dt>
                    <dd className={`text-xs ${mono ? 'font-mono' : ''}`}>{String(value)}</dd>
                  </div>
                ) : null)}
              </dl>
            </div>

            {/* Finances & direction */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Finances &amp; Direction</p>
              <dl className="space-y-2">
                {([
                  { label: 'Dirigeant', value: fiche.dirigeant },
                  { label: 'Nb dirigeants', value: fiche.nb_dirigeants != null ? String(fiche.nb_dirigeants) : null },
                  { label: "Chiffre d'affaires", value: fiche.chiffre_affaires },
                  { label: 'R\u00e9sultat net', value: fiche.resultat_net },
                  { label: 'Ann\u00e9e finances', value: fiche.annee_finance },
                ] as const).map(({ label, value }) => value ? (
                  <div key={label} className="flex gap-3">
                    <dt className="w-32 shrink-0 text-xs text-muted-foreground">{label}</dt>
                    <dd className="text-xs">{value}</dd>
                  </div>
                ) : null)}

                {fiche.labels && fiche.labels.length > 0 && (
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-xs text-muted-foreground">Labels</dt>
                    <dd className="flex flex-wrap gap-1">
                      {fiche.labels.map((l) => (
                        <span key={l} className="rounded-full border px-2 py-px text-[10px]">{l}</span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Liens externes */}
          {(fiche.fiche_annuaire || fiche.fiche_pappers) && (
            <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">
              {fiche.fiche_annuaire && (
                <a
                  href={fiche.fiche_annuaire}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
                  </svg>
                  Annuaire DataGouv
                </a>
              )}
              {fiche.fiche_pappers && (
                <a
                  href={fiche.fiche_pappers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
                  </svg>
                  Pappers
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Panel r\u00e9sultats ───────────────────────────────────────────────────────────

function ResultsPanel({ data, query }: { data: WebhookResponse; query: string }) {
  const [showRaw, setShowRaw] = useState(false)

  return (
    <div className="space-y-4">

      {/* Barre de stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-background/60 px-5 py-3 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div>
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              {data.total_resultats.toLocaleString('fr-FR')}
            </span>
            <span className="ml-1.5 text-muted-foreground">r\u00e9sultats totaux</span>
          </div>
          <div className="h-3 w-px bg-border hidden sm:block" />
          <div>
            <span className="font-semibold">{data.nb_fiches}</span>
            <span className="ml-1.5 text-muted-foreground">affich\u00e9{data.nb_fiches > 1 ? 's' : ''}</span>
          </div>
          <div className="h-3 w-px bg-border hidden sm:block" />
          <span className="text-muted-foreground">Page <span className="font-semibold text-foreground">{data.page_actuelle}</span></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            className="rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted"
          >
            {showRaw ? 'Voir les fiches' : 'JSON brut'}
          </button>
          <button
            type="button"
            onClick={() => exportCSV(data.fiches, query)}
            className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Contenu */}
      {showRaw ? (
        <pre className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <div className="space-y-2.5">
          {data.fiches.map((fiche, i) => (
            <FicheCard key={fiche.siren ?? i} fiche={fiche} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Composant principal ───────────────────────────────────────────────────────

export function ProspectsDashboard() {
  const [form, setForm] = useState<Form>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeField, setActiveField] = useState('default')

  const setStr =
    (key: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const setBool =
    (key: CheckboxKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.checked }))

  const payload = buildPayload(form)
  const fieldCount = Object.keys(payload).length

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    setResponse(null)
    setError(null)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(form)),
      })

      const text = await res.text()
      try {
        setResponse(JSON.parse(text))
      } catch {
        setResponse(text)
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible de contacter le serveur. V\u00e9rifiez votre connexion internet.'
      )
    } finally {
      setLoading(false)
    }
  }, [form])

  // D\u00e9termine le type d'erreur pour l'affichage
  const apiError = response !== null && isApiError(response) ? response : null
  const hasResults = response !== null && isWebhookResponse(response)
  const hasRawResponse = response !== null && !isApiError(response) && !isWebhookResponse(response)

  return (
    <div className="space-y-6">

      {/* ── Formulaire + Aside ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">

        {/* Formulaire */}
        <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur space-y-7">

          {/* Recherche principale */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-muted-foreground/40">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={form.q}
              onChange={setStr('q')}
              onFocus={() => setActiveField('q')}
              onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubmit()}
              placeholder="Recherche libre : nom d'entreprise, adresse, secteur..."
              className="w-full rounded-2xl border bg-background py-3.5 pl-12 pr-4 text-base placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700 disabled:opacity-50"
              disabled={loading}
            />
          </div>

          {/* Localisation */}
          <div>
            <SectionLabel>Localisation</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">D\u00e9partement</label>
                <input type="text" value={form.departement} onChange={setStr('departement')} onFocus={() => setActiveField('departement')} placeholder="Ex : 75, 69, 13" className={inputCls} disabled={loading} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">R\u00e9gion (code INSEE)</label>
                <input type="text" value={form.region} onChange={setStr('region')} onFocus={() => setActiveField('region')} placeholder="Ex : 11 pour \u00cele-de-France" className={inputCls} disabled={loading} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">Code postal</label>
                <input type="text" value={form.code_postal} onChange={setStr('code_postal')} onFocus={() => setActiveField('code_postal')} placeholder="Ex : 75001" className={inputCls} disabled={loading} />
              </div>
            </div>
          </div>

          {/* Activit\u00e9 */}
          <div>
            <SectionLabel>Activit\u00e9</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div onFocus={() => setActiveField('activite_principale')}>
                <label className="mb-1.5 block text-xs text-muted-foreground">Code NAF / APE</label>
                <NafAutocomplete
                  value={form.activite_principale}
                  onChange={(v) => setForm((prev) => ({ ...prev, activite_principale: v }))}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">Cat\u00e9gorie d&apos;entreprise</label>
                <select value={form.categorie_entreprise} onChange={setStr('categorie_entreprise')} onFocus={() => setActiveField('categorie_entreprise')} className={selectCls} disabled={loading}>
                  {CATEGORIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">Effectif salari\u00e9</label>
                <select value={form.tranche_effectif_salarie} onChange={setStr('tranche_effectif_salarie')} onFocus={() => setActiveField('tranche_effectif_salarie')} className={selectCls} disabled={loading}>
                  {EFFECTIFS.map((ef) => <option key={ef.code} value={ef.code}>{ef.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Finance & Volume */}
          <div>
            <SectionLabel>Finance &amp; Volume</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">CA minimum (\u20ac)</label>
                <input type="number" value={form.ca_min} onChange={setStr('ca_min')} onFocus={() => setActiveField('ca_min')} placeholder="Ex : 100 000" className={inputCls} disabled={loading} min={0} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">CA maximum (\u20ac)</label>
                <input type="number" value={form.ca_max} onChange={setStr('ca_max')} onFocus={() => setActiveField('ca_max')} placeholder="Ex : 5 000 000" className={inputCls} disabled={loading} min={0} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">R\u00e9sultats (max 25)</label>
                <input type="number" value={form.per_page} onChange={setStr('per_page')} onFocus={() => setActiveField('per_page')} className={inputCls} disabled={loading} min={1} max={25} />
              </div>
            </div>
          </div>

          {/* Labels & certifications */}
          <div onFocus={() => setActiveField('labels')}>
            <SectionLabel>Labels &amp; certifications</SectionLabel>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CHECKBOXES.map(({ key, label }) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition select-none hover:border-violet-300 dark:hover:border-violet-700 ${
                    form[key as CheckboxKey]
                      ? 'border-violet-400 bg-violet-50 dark:border-violet-700 dark:bg-violet-950/30'
                      : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form[key as CheckboxKey]}
                    onChange={setBool(key as CheckboxKey)}
                    className="size-4 rounded accent-violet-600"
                    disabled={loading}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between border-t pt-5">
            <span className="text-xs text-muted-foreground/50">
              {fieldCount} champ{fieldCount > 1 ? 's' : ''} dans la requ\u00eate
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-medium transition ${
                loading
                  ? 'cursor-not-allowed bg-muted text-muted-foreground'
                  : 'bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] hover:bg-violet-700'
              }`}
            >
              {loading ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
                  </svg>
                  Recherche en cours...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
                  </svg>
                  Lancer la recherche
                </>
              )}
            </button>
          </div>
        </div>

        {/* Aside */}
        <FormAside activeField={activeField} />
      </div>

      {/* ── Erreur r\u00e9seau (fetch failed) ───────────────────────────────────── */}
      {error && (
        <NetworkErrorPanel message={error} onRetry={handleSubmit} loading={loading} />
      )}

      {/* ── Erreur API structur\u00e9e ──────────────────────────────────────────── */}
      {apiError && (
        <ErrorPanel error={apiError} onRetry={handleSubmit} loading={loading} />
      )}

      {/* ── R\u00e9sultats ──────────────────────────────────────────────────────── */}
      {hasResults && (
        <ResultsPanel data={response as WebhookResponse} query={form.q} />
      )}

      {/* ── R\u00e9ponse brute non reconnue ────────────────────────────────────── */}
      {hasRawResponse && (
        <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">R\u00e9ponse du serveur</p>
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-300">
            {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
