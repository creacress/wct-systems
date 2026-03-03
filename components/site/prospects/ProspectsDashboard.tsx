'use client'

import { useState } from 'react'

// ── Proxy Next.js → N8N ──────────────────────────────────────────────────────
// L'appel HTTP vers N8N est fait côté serveur (route API) pour éviter
// le blocage mixed-content depuis une page HTTPS.
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

// N'inclure que les champs renseignés dans le payload
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
  CHECKBOXES.forEach(({ key }) => {
    if (form[key as CheckboxKey]) p[key] = true
  })
  return p
}

// ── Styles partagés ───────────────────────────────────────────────────────────

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

// ── Composant principal ───────────────────────────────────────────────────────

export function ProspectsDashboard() {
  const [form, setForm] = useState<Form>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<number | null>(null)

  const setStr =
    (key: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const setBool =
    (key: CheckboxKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.checked }))

  const payload = buildPayload(form)
  const fieldCount = Object.keys(payload).length

  const handleSubmit = async () => {
    setLoading(true)
    setResponse(null)
    setError(null)
    setStatus(null)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      setStatus(res.status)
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
          : 'Erreur réseau — vérifiez que le serveur N8N est accessible.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Formulaire ─────────────────────────────────────────────────────── */}
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
              <label className="mb-1.5 block text-xs text-muted-foreground">Département</label>
              <input
                type="text"
                value={form.departement}
                onChange={setStr('departement')}
                placeholder="Ex : 75, 69, 13"
                className={inputCls}
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Région (code INSEE)</label>
              <input
                type="text"
                value={form.region}
                onChange={setStr('region')}
                placeholder="Ex : 11 pour Île-de-France"
                className={inputCls}
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Code postal</label>
              <input
                type="text"
                value={form.code_postal}
                onChange={setStr('code_postal')}
                placeholder="Ex : 75001"
                className={inputCls}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Activité */}
        <div>
          <SectionLabel>Activité</SectionLabel>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Code NAF / APE</label>
              <input
                type="text"
                value={form.activite_principale}
                onChange={setStr('activite_principale')}
                placeholder="Ex : 6201Z"
                className={inputCls}
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Catégorie d&apos;entreprise</label>
              <select
                value={form.categorie_entreprise}
                onChange={setStr('categorie_entreprise')}
                className={selectCls}
                disabled={loading}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Effectif salarié</label>
              <select
                value={form.tranche_effectif_salarie}
                onChange={setStr('tranche_effectif_salarie')}
                className={selectCls}
                disabled={loading}
              >
                {EFFECTIFS.map((ef) => (
                  <option key={ef.code} value={ef.code}>{ef.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Finance & Volume */}
        <div>
          <SectionLabel>Finance &amp; Volume</SectionLabel>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">CA minimum (€)</label>
              <input
                type="number"
                value={form.ca_min}
                onChange={setStr('ca_min')}
                placeholder="Ex : 100 000"
                className={inputCls}
                disabled={loading}
                min={0}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">CA maximum (€)</label>
              <input
                type="number"
                value={form.ca_max}
                onChange={setStr('ca_max')}
                placeholder="Ex : 5 000 000"
                className={inputCls}
                disabled={loading}
                min={0}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Résultats (max 25)</label>
              <input
                type="number"
                value={form.per_page}
                onChange={setStr('per_page')}
                className={inputCls}
                disabled={loading}
                min={1}
                max={25}
              />
            </div>
          </div>
        </div>

        {/* Labels & certifications */}
        <div>
          <SectionLabel>Labels &amp; certifications</SectionLabel>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CHECKBOXES.map(({ key, label }) => (
              <label
                key={key}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition select-none
                  hover:border-violet-300 dark:hover:border-violet-700
                  ${form[key as CheckboxKey]
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
            {fieldCount} champ{fieldCount > 1 ? 's' : ''} dans la requête
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

      {/* ── Erreur ─────────────────────────────────────────────────────────── */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <strong className="font-medium">Erreur</strong> — {error}
        </div>
      )}

      {/* ── Réponse webhook ────────────────────────────────────────────────── */}
      {response !== null && (
        <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Réponse webhook</p>
            {status !== null && (
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  status >= 200 && status < 300
                    ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400'
                    : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400'
                }`}
              >
                {status}
              </span>
            )}
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-300">
            {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
