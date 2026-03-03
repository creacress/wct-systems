'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { SavedProspect } from '@/lib/types/prospect'

// ── Types ────────────────────────────────────────────────────────────────────

type Stats = {
  total: number
  by_categorie: { categorie: string; count: number }[]
  by_secteur: { secteur: string; count: number }[]
  recent_count: number
}

type SortKey = 'saved_at' | 'nom' | 'ville' | 'categorie' | 'chiffre_affaires'

// ── Helpers ──────────────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: string | null }) {
  if (!statut) return null
  const active = statut.toLowerCase().includes('activ')
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
  const colors: Record<string, string> = {
    PME: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400',
    ETI: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-400',
    GE: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colors[categorie] ?? 'border bg-muted text-muted-foreground'}`}>
      {categorie}
    </span>
  )
}

function CompanyAvatar({ nom }: { nom: string }) {
  const initials = nom
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.replace(/[^a-zA-Z]/g, '')[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
      {initials}
    </div>
  )
}

// ── Notes editor ─────────────────────────────────────────────────────────────

function NotesEditor({ siren, initialNotes }: { siren: string; initialNotes: string }) {
  const [notes, setNotes] = useState(initialNotes)
  const [saving, setSaving] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const save = useCallback(async (value: string) => {
    setSaving(true)
    try {
      await fetch(`/api/prospection/saved/${siren}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: value }),
      })
    } catch { /* ignore */ }
    setSaving(false)
  }, [siren])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => save(e.target.value), 1000)
  }

  return (
    <div className="relative">
      <textarea
        value={notes}
        onChange={handleChange}
        onBlur={() => { clearTimeout(timerRef.current); save(notes) }}
        placeholder="Ajouter des notes..."
        className="w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm resize-none placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700"
        rows={3}
      />
      {saving && <span className="absolute right-2.5 top-2.5 text-[10px] text-muted-foreground">Enregistrement...</span>}
    </div>
  )
}

// ── Saved prospect card ──────────────────────────────────────────────────────

function SavedCard({ prospect, onDeleted }: { prospect: SavedProspect; onDeleted: (siren: string) => void }) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await fetch(`/api/prospection/saved/${prospect.siren}`, { method: 'DELETE' })
      onDeleted(prospect.siren)
    } catch { /* ignore */ }
    setDeleting(false)
  }

  const quickStats = [
    { label: 'Ville', value: prospect.ville ? `${prospect.ville}${prospect.departement ? ` (${prospect.departement})` : ''}` : null },
    { label: 'Effectif', value: prospect.effectif },
    { label: 'Dirigeant', value: prospect.dirigeant },
    { label: 'CA', value: prospect.chiffre_affaires },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-md">

      {/* En-tête cliquable */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left sm:gap-4"
      >
        <CompanyAvatar nom={prospect.nom} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold leading-tight tracking-tight">{prospect.nom}</span>
            {prospect.sigle && (
              <span className="rounded border px-1.5 py-px text-[10px] text-muted-foreground">{prospect.sigle}</span>
            )}
          </div>
          {(prospect.code_naf || prospect.libelle_activite) && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {prospect.code_naf && <span className="font-mono mr-1.5">{prospect.code_naf}</span>}
              {prospect.libelle_activite}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          <StatutBadge statut={prospect.statut} />
          <CategoryBadge categorie={prospect.categorie} />
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

      {/* Détails dépliables */}
      {open && (
        <div className="border-t px-5 py-5 space-y-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Identification */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Identification</p>
              <dl className="space-y-2">
                {([
                  { label: 'SIREN', value: prospect.siren, mono: true },
                  { label: 'SIRET siège', value: prospect.siret_siege, mono: true },
                  { label: 'Nature juridique', value: prospect.nature_juridique },
                  { label: 'Date création', value: prospect.date_creation },
                  { label: 'Adresse', value: prospect.adresse },
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
                  { label: 'Dirigeant', value: prospect.dirigeant },
                  { label: "Chiffre d'affaires", value: prospect.chiffre_affaires },
                  { label: 'Résultat net', value: prospect.resultat_net },
                ] as const).map(({ label, value }) => value ? (
                  <div key={label} className="flex gap-3">
                    <dt className="w-32 shrink-0 text-xs text-muted-foreground">{label}</dt>
                    <dd className="text-xs">{value}</dd>
                  </div>
                ) : null)}

                {prospect.labels && prospect.labels.length > 0 && (
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-xs text-muted-foreground">Labels</dt>
                    <dd className="flex flex-wrap gap-1">
                      {prospect.labels.map((l) => (
                        <span key={l} className="rounded-full border px-2 py-px text-[10px]">{l}</span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Liens de recherche */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Rechercher ce prospect</p>
            <div className="flex flex-wrap gap-2">
              {prospect.dirigeant && (
                <a
                  href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`${prospect.dirigeant} ${prospect.nom}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn — {prospect.dirigeant}
                </a>
              )}
              {prospect.dirigeant && (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(`${prospect.dirigeant} ${prospect.nom}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-green-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                  </svg>
                  Google — {prospect.dirigeant}
                </a>
              )}
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(prospect.nom)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-green-400 hover:text-green-600 dark:hover:text-green-400"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                </svg>
                Google — {prospect.nom}
              </a>
              {prospect.fiche_annuaire && (
                <a
                  href={prospect.fiche_annuaire}
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
              {prospect.fiche_pappers && (
                <a
                  href={prospect.fiche_pappers}
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
          </div>

          {/* Notes */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Notes</p>
            <NotesEditor siren={prospect.siren} initialNotes={prospect.notes ?? ''} />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-[10px] text-muted-foreground/50">
              Sauvegardé le {new Date(prospect.saved_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {confirming ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-500">Supprimer ?</span>
                <button onClick={handleDelete} disabled={deleting} className="text-xs font-medium text-red-600 hover:text-red-700">
                  {deleting ? 'Suppression...' : 'Oui'}
                </button>
                <button onClick={() => setConfirming(false)} className="text-xs text-muted-foreground hover:text-foreground">Non</button>
              </div>
            ) : (
              <button onClick={() => setConfirming(true)} className="text-xs text-red-500 hover:text-red-700 transition">
                Supprimer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main dashboard ───────────────────────────────────────────────────────────

export function SavedProspectsDashboard() {
  const [prospects, setProspects] = useState<SavedProspect[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('saved_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const fetchProspects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('q', search)
      if (filterCat) params.set('categorie', filterCat)
      params.set('sort', sortKey)
      params.set('order', sortOrder)

      const res = await fetch(`/api/prospection/saved?${params}`)
      if (res.ok) setProspects(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [search, filterCat, sortKey, sortOrder])

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/prospection/saved/stats')
      if (res.ok) setStats(await res.json())
    } catch { /* ignore */ }
  }, [])

  useEffect(() => { fetchProspects() }, [fetchProspects])
  useEffect(() => { fetchStats() }, [fetchStats])

  const handleDeleted = (siren: string) => {
    setProspects((prev) => prev.filter((p) => p.siren !== siren))
    setStats((prev) => prev ? { ...prev, total: prev.total - 1 } : prev)
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  return (
    <div className="space-y-6">

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Total sauvegardés</p>
            <p className="mt-1 text-2xl font-bold text-violet-600 dark:text-violet-400">{stats.total}</p>
          </div>
          {['PME', 'ETI', 'GE'].map((cat) => {
            const count = stats.by_categorie.find((c) => c.categorie === cat)?.count ?? 0
            return (
              <div key={cat} className="rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{cat}</p>
                <p className="mt-1 text-2xl font-bold">{count}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Filtres + actions */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-background/60 px-5 py-3 shadow-sm backdrop-blur">
        <div className="relative flex-1 min-w-[200px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-muted-foreground/40">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom..."
            className="w-full rounded-xl border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700"
          />
        </div>

        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700"
        >
          <option value="">Toutes catégories</option>
          <option value="PME">PME</option>
          <option value="ETI">ETI</option>
          <option value="GE">GE</option>
        </select>

        <div className="flex items-center gap-1">
          {([
            { key: 'saved_at' as SortKey, label: 'Date' },
            { key: 'nom' as SortKey, label: 'Nom' },
            { key: 'ville' as SortKey, label: 'Ville' },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                sortKey === key
                  ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {label}
              {sortKey === key && (
                <span className="ml-0.5">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          ))}
        </div>

        <a
          href="/api/prospection/saved/export"
          download
          className="ml-auto inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
          Export CSV
        </a>
      </div>

      {/* Liste des prospects */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <svg className="size-6 animate-spin text-violet-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
          </svg>
        </div>
      ) : prospects.length === 0 ? (
        <div className="rounded-3xl border bg-background/60 p-12 text-center shadow-sm backdrop-blur">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6 text-muted-foreground/40">
              <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z" />
            </svg>
          </div>
          <p className="font-medium">Aucun prospect sauvegardé</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Lancez une recherche et cliquez sur &laquo;&nbsp;Sauvegarder&nbsp;&raquo; pour ajouter des prospects ici.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {prospects.map((p) => (
            <SavedCard key={p.siren} prospect={p} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
