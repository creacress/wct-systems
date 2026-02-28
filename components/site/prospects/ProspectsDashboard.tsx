'use client'

import { useEffect, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Prospect = {
  id: number
  siren: string
  nom: string
  ville: string | null
  departement: string | null
  code_naf: string | null
  effectif: string | null
  score: number
  statut: string
  enrichi: boolean
  email: string | null
  telephone: string | null
  site_web: string | null
}

type StatsData = {
  total: number
  enrichis: number
  score_moyen: number
  nouveaux: number
  contactes: number
  en_cours: number
  convertis: number
  exclus: number
}

// ── Constantes ─────────────────────────────────────────────────────────────────

const STATUTS = ['nouveau', 'contacté', 'en_cours', 'converti', 'exclu'] as const

const STATUT_META: Record<string, { label: string; bg: string; text: string }> = {
  nouveau:  { label: 'Nouveau',   bg: 'bg-violet-50 dark:bg-violet-950/50', text: 'text-violet-700 dark:text-violet-300' },
  contacté: { label: 'Contacté',  bg: 'bg-blue-50 dark:bg-blue-950/50',     text: 'text-blue-700 dark:text-blue-300' },
  en_cours: { label: 'En cours',  bg: 'bg-amber-50 dark:bg-amber-950/50',   text: 'text-amber-700 dark:text-amber-300' },
  converti: { label: 'Converti',  bg: 'bg-green-50 dark:bg-green-950/50',   text: 'text-green-700 dark:text-green-300' },
  exclu:    { label: 'Exclu',     bg: 'bg-gray-100 dark:bg-gray-800',       text: 'text-gray-500 dark:text-gray-400' },
}

const CATEGORIES = [
  { value: '',    label: 'Toutes catégories' },
  { value: 'TPE', label: 'TPE (< 10 sal.)' },
  { value: 'PME', label: 'PME (10–250 sal.)' },
  { value: 'ETI', label: 'ETI (250–5000 sal.)' },
  { value: 'GE',  label: 'Grande entreprise' },
]

const PER_PAGE = 20

// ── Composant principal ────────────────────────────────────────────────────────

export function ProspectsDashboard() {

  // ── Onglet actif ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'recherche' | 'prospects'>('recherche')

  // ── Stats (communes aux deux onglets) ────────────────────────────────────────
  const [stats, setStats] = useState<StatsData | null>(null)

  // ── État onglet Recherche ─────────────────────────────────────────────────────
  const [searchQuery,     setSearchQuery]     = useState('')
  const [searchDept,      setSearchDept]      = useState('')
  const [searchCategorie, setSearchCategorie] = useState('')
  const [searchResults,   setSearchResults]   = useState<Prospect[]>([])
  const [searchTotal,     setSearchTotal]     = useState(0)
  const [searchPage,      setSearchPage]      = useState(1)
  const [searchPages,     setSearchPages]     = useState(1)
  const [searching,       setSearching]       = useState(false)
  const [searchDone,      setSearchDone]      = useState(false)
  const [enrichingSearch, setEnrichingSearch] = useState<string | null>(null)

  // ── État onglet Prospects ─────────────────────────────────────────────────────
  const [prospects,      setProspects]      = useState<Prospect[]>([])
  const [total,          setTotal]          = useState(0)
  const [nextCursor,     setNextCursor]     = useState<string | null>(null)
  const [appliedQ,       setAppliedQ]       = useState('')
  const [appliedDept,    setAppliedDept]    = useState('')
  const [statut,         setStatut]         = useState('')
  const [enrichiFilter,  setEnrichiFilter]  = useState('')
  const [scoreMin,       setScoreMin]       = useState('')
  const [qInput,         setQInput]         = useState('')
  const [deptInput,      setDeptInput]      = useState('')
  const [cursorStack,    setCursorStack]    = useState<Array<string | null>>([null])
  const [pageIndex,      setPageIndex]      = useState(0)
  const [loading,        setLoading]        = useState(false)
  const [scoring,        setScoring]        = useState(false)

  // ── UI partagée ───────────────────────────────────────────────────────────────
  const [error,          setError]          = useState<string | null>(null)
  const [updatingSiren,  setUpdatingSiren]  = useState<string | null>(null)
  const [enrichingSiren, setEnrichingSiren] = useState<string | null>(null)
  const [deletingSiren,  setDeletingSiren]  = useState<string | null>(null)
  const [openMenu,       setOpenMenu]       = useState<string | null>(null)

  // ── Chargement des stats ──────────────────────────────────────────────────────
  const loadStats = async () => {
    try {
      const r = await fetch('/api/prospection/stats')
      if (r.ok) setStats(await r.json())
    } catch { /* silencieux */ }
  }

  useEffect(() => { loadStats() }, [])

  // ── Fermer le menu statut au clic extérieur ───────────────────────────────────
  useEffect(() => {
    if (!openMenu) return
    const close = () => setOpenMenu(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [openMenu])

  // ────────────────────────────────────────────────────────────────────────────
  // ONGLET RECHERCHE
  // ────────────────────────────────────────────────────────────────────────────

  const lancerRecherche = async (page = 1) => {
    if (!searchQuery.trim()) return
    setSearching(true)
    setError(null)
    try {
      const r = await fetch('/api/prospection/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query:      searchQuery.trim(),
          departement: searchDept || undefined,
          categorie:  searchCategorie || undefined,
          page,
        }),
      })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data = await r.json()
      setSearchResults(data.resultats ?? [])
      setSearchTotal(data.total ?? 0)
      setSearchPage(data.page ?? 1)
      setSearchPages(data.pages ?? 1)
      setSearchDone(true)
    } catch {
      setError("Erreur lors de la recherche. Vérifiez la connexion à l'API.")
    } finally {
      setSearching(false)
    }
  }

  const enrichirDepuisRecherche = async (siren: string) => {
    setEnrichingSearch(siren)
    try {
      const r = await fetch(`/api/prospection/enrich/${siren}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forcer: false }),
      })
      if (!r.ok) throw new Error()
      setSearchResults(prev => prev.map(p => p.siren === siren ? { ...p, enrichi: true } : p))
      await loadStats()
    } catch {
      setError("Erreur lors de l'enrichissement.")
    } finally {
      setEnrichingSearch(null)
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ONGLET PROSPECTS
  // ────────────────────────────────────────────────────────────────────────────

  const fetchProspects = async (cursor: string | null) => {
    setLoading(true)
    setError(null)
    try {
      const p = new URLSearchParams()
      if (appliedQ)      p.set('q',          appliedQ)
      if (appliedDept)   p.set('departement', appliedDept)
      if (statut)        p.set('statut',      statut)
      if (enrichiFilter) p.set('enrichi',     enrichiFilter)
      if (scoreMin)      p.set('score_min',   scoreMin)
      if (cursor)        p.set('cursor',      cursor)
      p.set('per_page', String(PER_PAGE))

      const r = await fetch(`/api/prospection/prospects?${p}`)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data = await r.json()
      setProspects(data.resultats ?? [])
      setTotal(data.total ?? 0)
      setNextCursor(data.next_cursor ?? null)
    } catch {
      setError("Impossible de charger les prospects. Vérifiez la connexion à l'API.")
    } finally {
      setLoading(false)
    }
  }

  // Rechargement auto quand un filtre change → retour page 1
  useEffect(() => {
    if (activeTab !== 'prospects') return
    setCursorStack([null])
    setPageIndex(0)
    fetchProspects(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedQ, appliedDept, statut, enrichiFilter, scoreMin, activeTab])

  // Navigation curseur
  const goNext = () => {
    if (!nextCursor) return
    const newIndex = pageIndex + 1
    const newStack = newIndex < cursorStack.length ? cursorStack : [...cursorStack, nextCursor]
    setCursorStack(newStack)
    setPageIndex(newIndex)
    fetchProspects(nextCursor)
  }

  const goPrev = () => {
    if (pageIndex === 0) return
    const newIndex = pageIndex - 1
    setPageIndex(newIndex)
    fetchProspects(cursorStack[newIndex])
  }

  const appliquerFiltres = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAppliedQ(qInput)
    setAppliedDept(deptInput)
  }

  const reinitialiserFiltres = () => {
    setQInput('');    setAppliedQ('')
    setDeptInput(''); setAppliedDept('')
    setStatut('')
    setEnrichiFilter('')
    setScoreMin('')
  }

  const filtresActifs = !!(appliedQ || appliedDept || statut || enrichiFilter || scoreMin)

  // Mise à jour statut
  const updateStatut = async (siren: string, newStatut: string) => {
    setUpdatingSiren(siren)
    setOpenMenu(null)
    try {
      const r = await fetch(`/api/prospection/prospects/${siren}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: newStatut }),
      })
      if (!r.ok) throw new Error()
      const updated: Prospect = await r.json()
      setProspects(prev => prev.map(p => p.siren === siren ? { ...p, statut: updated.statut } : p))
      await loadStats()
    } catch {
      setError('Erreur lors de la mise à jour du statut.')
    } finally {
      setUpdatingSiren(null)
    }
  }

  // Enrichissement
  const enrichir = async (siren: string) => {
    setEnrichingSiren(siren)
    try {
      const r = await fetch(`/api/prospection/enrich/${siren}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forcer: false }),
      })
      if (!r.ok) throw new Error()
      await fetchProspects(cursorStack[pageIndex])
      await loadStats()
    } catch {
      setError("Erreur lors de l'enrichissement.")
    } finally {
      setEnrichingSiren(null)
    }
  }

  // Suppression
  const supprimerProspect = async (siren: string, nom: string) => {
    if (!window.confirm(`Supprimer "${nom}" de vos prospects ?`)) return
    setDeletingSiren(siren)
    try {
      const r = await fetch(`/api/prospection/prospects/${siren}`, { method: 'DELETE' })
      if (!r.ok && r.status !== 204) throw new Error()
      setProspects(prev => prev.filter(p => p.siren !== siren))
      setTotal(prev => prev - 1)
      await loadStats()
    } catch {
      setError('Erreur lors de la suppression.')
    } finally {
      setDeletingSiren(null)
    }
  }

  // Recalcul des scores
  const recalculerScores = async () => {
    setScoring(true)
    try {
      await fetch('/api/prospection/prospects/score', { method: 'POST' })
      await fetchProspects(cursorStack[pageIndex])
      await loadStats()
    } catch {
      setError('Erreur lors du recalcul des scores.')
    } finally {
      setScoring(false)
    }
  }

  // Export CSV
  const exporterCsv = async () => {
    const p = new URLSearchParams({ format: 'csv' })
    if (statut)        p.set('statut',      statut)
    if (appliedDept)   p.set('departement', appliedDept)
    if (enrichiFilter) p.set('enrichi',     enrichiFilter)
    const r = await fetch(`/api/prospection/export?${p}`)
    const blob = await r.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prospects.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const pageStart = pageIndex * PER_PAGE + 1
  const pageEnd   = Math.min((pageIndex + 1) * PER_PAGE, total)

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Erreur ─────────────────────────────────────────────────────────── */}
      {error && (
        <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 hover:opacity-70">✕</button>
        </div>
      )}

      {/* ── Statistiques (toujours visibles) ───────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total prospects" value={stats.total.toLocaleString('fr-FR')} />
          <StatCard
            label="Enrichis"
            value={stats.enrichis.toLocaleString('fr-FR')}
            sub={stats.total ? `${Math.round(stats.enrichis / stats.total * 100)} %` : undefined}
          />
          <StatCard label="Score moyen" value={stats.score_moyen.toFixed(1)} sub="/ 100" />
          <StatCard
            label="Convertis"
            value={stats.convertis.toLocaleString('fr-FR')}
            sub={`${stats.nouveaux} nouveaux`}
          />
        </div>
      )}

      {/* ── Onglets ─────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 rounded-2xl border bg-background/60 p-1 backdrop-blur">
        {([
          { key: 'recherche', label: '🔍 Rechercher des prospects' },
          { key: 'prospects', label: `📋 Mes prospects${stats ? ` (${stats.total})` : ''}` },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition
              ${activeTab === tab.key
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ONGLET : RECHERCHE
         ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'recherche' && (
        <div className="space-y-6">

          {/* Formulaire de recherche */}
          <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Rechercher des entreprises en France
            </h2>
            <form
              onSubmit={e => { e.preventDefault(); lancerRecherche(1) }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Mots-clés <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Ex : menuiserie, plombier, agence marketing…"
                  className="w-full rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Département</label>
                  <input
                    type="text"
                    value={searchDept}
                    onChange={e => setSearchDept(e.target.value)}
                    placeholder="Ex : 69, 75, 13"
                    maxLength={3}
                    className="w-32 rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Taille</label>
                  <select
                    value={searchCategorie}
                    onChange={e => setSearchCategorie(e.target.value)}
                    className="rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={searching || !searchQuery.trim()}
                  className="rounded-2xl bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {searching ? 'Recherche…' : 'Rechercher'}
                </button>
                {searchDone && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setSearchDept('')
                      setSearchCategorie('')
                      setSearchResults([])
                      setSearchDone(false)
                    }}
                    className="rounded-2xl border px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-muted"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Résultats */}
          {searchDone && (
            <div className="overflow-hidden rounded-3xl border bg-background/60 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between border-b px-5 py-3">
                <p className="text-sm text-muted-foreground">
                  {searching
                    ? 'Chargement…'
                    : searchTotal === 0
                      ? 'Aucun résultat.'
                      : `${searchTotal.toLocaleString('fr-FR')} entreprise${searchTotal > 1 ? 's' : ''} trouvée${searchTotal > 1 ? 's' : ''} — automatiquement ajoutées à vos prospects`
                  }
                </p>
              </div>

              {searching ? (
                <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                  <span className="animate-pulse">Recherche en cours…</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-16 text-center text-sm text-muted-foreground">
                  Aucune entreprise trouvée pour ces critères.
                </div>
              ) : (
                <>
                  {/* Table desktop */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          <th className="px-5 py-3">Entreprise</th>
                          <th className="px-5 py-3">Localisation</th>
                          <th className="px-5 py-3">Score</th>
                          <th className="px-5 py-3">Enrichissement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {searchResults.map(p => (
                          <tr key={p.siren} className="transition hover:bg-muted/20">
                            <td className="px-5 py-3">
                              <div className="font-medium leading-tight">{p.nom}</div>
                              <div className="mt-0.5 text-xs text-muted-foreground">
                                {p.siren}
                                {p.code_naf ? ` · ${p.code_naf}` : ''}
                                {p.effectif ? ` · ${p.effectif} sal.` : ''}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-muted-foreground">
                              {p.ville ?? '—'}{p.departement ? ` (${p.departement})` : ''}
                            </td>
                            <td className="px-5 py-3">
                              <ScoreBadge score={p.score} />
                            </td>
                            <td className="px-5 py-3">
                              {p.enrichi ? (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                  <IconCheck /> Enrichi
                                </span>
                              ) : (
                                <button
                                  onClick={() => enrichirDepuisRecherche(p.siren)}
                                  disabled={enrichingSearch === p.siren}
                                  className="rounded-xl border px-2.5 py-1 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                                >
                                  {enrichingSearch === p.siren ? '…' : 'Enrichir'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Cartes mobile */}
                  <div className="divide-y md:hidden">
                    {searchResults.map(p => (
                      <div key={p.siren} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-medium leading-snug">{p.nom}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {p.ville ?? ''}{p.departement ? ` (${p.departement})` : ''}
                              {p.code_naf ? ` · ${p.code_naf}` : ''}
                            </div>
                          </div>
                          <ScoreBadge score={p.score} />
                        </div>
                        <div className="mt-3">
                          {p.enrichi ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                              <IconCheck /> Enrichi
                            </span>
                          ) : (
                            <button
                              onClick={() => enrichirDepuisRecherche(p.siren)}
                              disabled={enrichingSearch === p.siren}
                              className="rounded-xl border px-2.5 py-1 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                            >
                              {enrichingSearch === p.siren ? '…' : 'Enrichir'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination recherche */}
                  {searchPages > 1 && (
                    <div className="flex items-center justify-between border-t px-5 py-3">
                      <span className="text-sm text-muted-foreground">
                        Page {searchPage} / {searchPages}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => lancerRecherche(searchPage - 1)}
                          disabled={searchPage <= 1 || searching}
                          className="rounded-xl border px-3 py-1 text-sm transition hover:bg-muted disabled:opacity-40"
                        >
                          ← Préc.
                        </button>
                        <button
                          onClick={() => lancerRecherche(searchPage + 1)}
                          disabled={searchPage >= searchPages || searching}
                          className="rounded-xl border px-3 py-1 text-sm transition hover:bg-muted disabled:opacity-40"
                        >
                          Suiv. →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* État initial : pas encore cherché */}
          {!searchDone && !searching && (
            <div className="rounded-3xl border border-dashed bg-background/40 px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground">
                Entrez des mots-clés pour rechercher des entreprises dans la base officielle française.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Les résultats sont automatiquement sauvegardés dans vos prospects.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          ONGLET : MES PROSPECTS
         ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'prospects' && (
        <div className="space-y-4">

          {/* Barre de filtres + actions */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <form onSubmit={appliquerFiltres} className="flex flex-wrap items-center gap-2">

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={qInput}
                  onChange={e => setQInput(e.target.value)}
                  placeholder="Filtrer par nom…"
                  className="rounded-2xl border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  OK
                </button>
              </div>

              <input
                type="text"
                value={deptInput}
                onChange={e => setDeptInput(e.target.value)}
                onBlur={() => setAppliedDept(deptInput)}
                placeholder="Dép. (ex: 69)"
                maxLength={3}
                className="w-28 rounded-2xl border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
              />

              <select
                value={statut}
                onChange={e => setStatut(e.target.value)}
                className="rounded-2xl border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <option value="">Tous les statuts</option>
                {STATUTS.map(s => (
                  <option key={s} value={s}>{STATUT_META[s]?.label}</option>
                ))}
              </select>

              <select
                value={enrichiFilter}
                onChange={e => setEnrichiFilter(e.target.value)}
                className="rounded-2xl border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <option value="">Tous</option>
                <option value="true">Enrichis</option>
                <option value="false">Non enrichis</option>
              </select>

              <select
                value={scoreMin}
                onChange={e => setScoreMin(e.target.value)}
                className="rounded-2xl border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <option value="">Tous les scores</option>
                <option value="25">Score ≥ 25</option>
                <option value="50">Score ≥ 50</option>
                <option value="75">Score ≥ 75</option>
              </select>

              {filtresActifs && (
                <button
                  type="button"
                  onClick={reinitialiserFiltres}
                  className="rounded-2xl border px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  ✕ Réinitialiser
                </button>
              )}
            </form>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={recalculerScores}
                disabled={scoring}
                className="inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                {scoring ? 'Recalcul…' : 'Recalc. scores'}
              </button>
              <button
                onClick={exporterCsv}
                className="inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Exporter CSV
              </button>
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-hidden rounded-3xl border bg-background/60 shadow-sm backdrop-blur">

            {loading ? (
              <div className="flex items-center justify-center py-24 text-sm text-muted-foreground">
                <span className="animate-pulse">Chargement…</span>
              </div>
            ) : prospects.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
                <p className="text-sm font-medium">Aucun prospect dans votre base.</p>
                <p className="text-xs text-muted-foreground">
                  Utilisez l&apos;onglet <strong>Rechercher</strong> pour importer des entreprises.
                </p>
                {filtresActifs && (
                  <button onClick={reinitialiserFiltres} className="text-xs text-violet-600 hover:underline dark:text-violet-400">
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Table desktop */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <th className="px-5 py-3">Entreprise</th>
                        <th className="px-5 py-3">Localisation</th>
                        <th className="px-5 py-3">Score</th>
                        <th className="px-5 py-3">Statut</th>
                        <th className="px-5 py-3">Contacts</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {prospects.map(p => (
                        <tr key={p.siren} className="transition hover:bg-muted/20">

                          <td className="px-5 py-3">
                            <div className="font-medium leading-tight">{p.nom}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {p.siren}
                              {p.code_naf ? ` · ${p.code_naf}` : ''}
                              {p.effectif ? ` · ${p.effectif} sal.` : ''}
                            </div>
                          </td>

                          <td className="px-5 py-3 text-muted-foreground">
                            {p.ville ?? '—'}{p.departement ? ` (${p.departement})` : ''}
                          </td>

                          <td className="px-5 py-3">
                            <ScoreBadge score={p.score} />
                          </td>

                          <td className="px-5 py-3" onClick={e => e.stopPropagation()}>
                            <StatutDropdown
                              statut={p.statut}
                              loading={updatingSiren === p.siren}
                              open={openMenu === p.siren}
                              onToggle={() => setOpenMenu(openMenu === p.siren ? null : p.siren)}
                              onChange={s => updateStatut(p.siren, s)}
                            />
                          </td>

                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3 text-muted-foreground">
                              {p.email && (
                                <a href={`mailto:${p.email}`} title={p.email} className="transition hover:text-foreground">
                                  <IconEmail />
                                </a>
                              )}
                              {p.telephone && (
                                <a href={`tel:${p.telephone}`} title={p.telephone} className="transition hover:text-foreground">
                                  <IconPhone />
                                </a>
                              )}
                              {p.site_web && (
                                <a href={p.site_web} target="_blank" rel="noopener noreferrer" title={p.site_web} className="transition hover:text-foreground">
                                  <IconGlobe />
                                </a>
                              )}
                              {!p.email && !p.telephone && !p.site_web && (
                                <span className="text-xs">—</span>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {!p.enrichi ? (
                                <button
                                  onClick={() => enrichir(p.siren)}
                                  disabled={enrichingSiren === p.siren}
                                  className="rounded-xl border px-2.5 py-1 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                                >
                                  {enrichingSiren === p.siren ? '…' : 'Enrichir'}
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                  <IconCheck /> Enrichi
                                </span>
                              )}
                              <button
                                onClick={() => supprimerProspect(p.siren, p.nom)}
                                disabled={deletingSiren === p.siren}
                                title="Supprimer"
                                className="rounded-xl p-1 text-muted-foreground transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-950/30"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cartes mobile */}
                <div className="divide-y md:hidden">
                  {prospects.map(p => (
                    <div key={p.siren} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium leading-snug">{p.nom}</div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {p.ville ?? ''}{p.departement ? ` (${p.departement})` : ''}
                            {p.code_naf ? ` · ${p.code_naf}` : ''}
                          </div>
                        </div>
                        <ScoreBadge score={p.score} />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2" onClick={e => e.stopPropagation()}>
                        <StatutDropdown
                          statut={p.statut}
                          loading={updatingSiren === p.siren}
                          open={openMenu === p.siren}
                          onToggle={() => setOpenMenu(openMenu === p.siren ? null : p.siren)}
                          onChange={s => updateStatut(p.siren, s)}
                        />
                        {p.email && (
                          <a href={`mailto:${p.email}`} className="text-xs text-muted-foreground hover:underline">{p.email}</a>
                        )}
                        {p.telephone && (
                          <a href={`tel:${p.telephone}`} className="text-xs text-muted-foreground">{p.telephone}</a>
                        )}
                        {!p.enrichi ? (
                          <button
                            onClick={() => enrichir(p.siren)}
                            disabled={enrichingSiren === p.siren}
                            className="rounded-xl border px-2.5 py-1 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                          >
                            {enrichingSiren === p.siren ? '…' : 'Enrichir'}
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                            <IconCheck /> Enrichi
                          </span>
                        )}
                        <button
                          onClick={() => supprimerProspect(p.siren, p.nom)}
                          disabled={deletingSiren === p.siren}
                          className="rounded-xl border border-red-200 px-2.5 py-1 text-xs text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {total > 0 && (
              <div className="flex items-center justify-between border-t px-5 py-3">
                <span className="text-sm text-muted-foreground">
                  {total > PER_PAGE
                    ? `${pageStart}–${pageEnd} sur ${total.toLocaleString('fr-FR')} prospects`
                    : `${total} prospect${total > 1 ? 's' : ''}`}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    disabled={pageIndex === 0 || loading}
                    className="rounded-xl border px-3 py-1 text-sm transition hover:bg-muted disabled:opacity-40"
                  >
                    ← Préc.
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!nextCursor || loading}
                    className="rounded-xl border px-3 py-1 text-sm transition hover:bg-muted disabled:opacity-40"
                  >
                    Suiv. →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sous-composants ─────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-3xl border bg-background/60 p-5 shadow-sm backdrop-blur transition hover:shadow-md">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const cls =
    score >= 70 ? 'text-green-600 dark:text-green-400' :
    score >= 40 ? 'text-amber-600 dark:text-amber-400' :
    'text-muted-foreground'
  return (
    <span className={`font-mono text-sm font-semibold tabular-nums ${cls}`}>
      {score.toFixed(0)}
    </span>
  )
}

function StatutDropdown({
  statut, loading, open, onToggle, onChange,
}: {
  statut: string
  loading: boolean
  open: boolean
  onToggle: () => void
  onChange: (s: string) => void
}) {
  const meta = STATUT_META[statut] ?? { label: statut, bg: 'bg-gray-100', text: 'text-gray-500' }
  return (
    <div className="relative inline-block">
      <button
        onClick={onToggle}
        disabled={loading}
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition ${meta.bg} ${meta.text} disabled:opacity-50`}
      >
        {loading ? '…' : meta.label}
        {!loading && (
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute left-0 top-8 z-20 min-w-[140px] rounded-2xl border bg-background p-1 shadow-lg">
          {STATUTS.map(s => {
            const sm = STATUT_META[s]!
            return (
              <button
                key={s}
                onClick={() => onChange(s)}
                className={`w-full rounded-xl px-3 py-1.5 text-left text-xs font-medium transition hover:bg-muted ${s === statut ? 'opacity-40' : ''}`}
              >
                <span className={`inline-block rounded-full px-2 py-0.5 ${sm.bg} ${sm.text}`}>
                  {sm.label}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Icônes SVG inline ───────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function IconEmail() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
}
