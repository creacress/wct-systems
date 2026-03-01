'use client'

import React, { useEffect, useState, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Prospect = {
  id: number
  siren: string
  nom: string
  ville: string | null
  departement: string | null
  code_naf: string | null
  effectif: string | null
  chiffre_affaires: string | null
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
const SEARCH_PER_PAGE = 25  // Max autorisé par l'API gouvernementale

// ── Helpers ──────────────────────────────────────────────────────────────────────

function formatCA(ca: string | null): string {
  if (!ca) return ''
  const n = parseInt(ca, 10)
  if (isNaN(n)) return ''
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.0', '')} M€`
  if (n >= 1_000) return `${Math.round(n / 1_000)} k€`
  return `${n} €`
}

function formatEffectif(e: string | null): string {
  if (!e || e === 'NN') return ''
  // Tranches INSEE : "00" = 0, "01" = 1-2, "02" = 3-5, etc.
  const map: Record<string, string> = {
    '00': '0 sal.', '01': '1-2 sal.', '02': '3-5 sal.', '03': '6-9 sal.',
    '11': '10-19 sal.', '12': '20-49 sal.', '21': '50-99 sal.', '22': '100-199 sal.',
    '31': '200-249 sal.', '32': '250-499 sal.', '41': '500-999 sal.', '42': '1000-1999 sal.',
    '51': '2000-4999 sal.', '52': '5000-9999 sal.', '53': '10000+ sal.',
  }
  return map[e] ?? `${e} sal.`
}

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
  const [batchEnriching,  setBatchEnriching]  = useState(false)

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

  // ── Sélection multiple (onglet Prospects) ──────────────────────────────────
  const [selected,       setSelected]       = useState<Set<string>>(new Set())
  const [batchAction,    setBatchAction]    = useState(false)

  // ── UI partagée ───────────────────────────────────────────────────────────────
  const [error,          setError]          = useState<string | null>(null)
  const [updatingSiren,  setUpdatingSiren]  = useState<string | null>(null)
  const [enrichingSiren, setEnrichingSiren] = useState<string | null>(null)
  const [deletingSiren,  setDeletingSiren]  = useState<string | null>(null)
  const [openMenu,       setOpenMenu]       = useState<string | null>(null)

  // ── Chargement des stats ──────────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    try {
      const r = await fetch('/api/prospection/stats')
      if (r.ok) setStats(await r.json())
    } catch { /* silencieux */ }
  }, [])

  useEffect(() => { loadStats() }, [loadStats])

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
          q:          searchQuery.trim(),
          departement: searchDept || undefined,
          categorie:  searchCategorie || undefined,
          page,
          per_page:   SEARCH_PER_PAGE,
        }),
      })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data = await r.json()
      setSearchResults(data.resultats ?? [])
      setSearchTotal(data.total ?? 0)
      setSearchPage(data.page ?? 1)
      setSearchPages(data.total_pages ?? 1)
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
      const data = await r.json()
      // Mettre à jour le résultat avec les données enrichies
      setSearchResults(prev => prev.map(p =>
        p.siren === siren
          ? { ...p, enrichi: true, email: data.email, telephone: data.telephone, site_web: data.site_web, score: data.score ?? p.score }
          : p
      ))
      await loadStats()
    } catch {
      setError("Erreur lors de l'enrichissement.")
    } finally {
      setEnrichingSearch(null)
    }
  }

  const enrichirToutePage = async () => {
    const nonEnrichis = searchResults.filter(p => !p.enrichi).map(p => p.siren)
    if (nonEnrichis.length === 0) return
    setBatchEnriching(true)
    setError(null)
    try {
      for (const siren of nonEnrichis) {
        await enrichirDepuisRecherche(siren)
      }
    } finally {
      setBatchEnriching(false)
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ONGLET PROSPECTS
  // ────────────────────────────────────────────────────────────────────────────

  const fetchProspects = useCallback(async (cursor: string | null) => {
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
  }, [appliedQ, appliedDept, statut, enrichiFilter, scoreMin])

  // Rechargement auto quand un filtre change → retour page 1
  useEffect(() => {
    if (activeTab !== 'prospects') return
    setCursorStack([null])
    setPageIndex(0)
    fetchProspects(null)
  }, [fetchProspects, activeTab])

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

  // ── Sélection multiple ────────────────────────────────────────────────────────

  const toggleSelect = (siren: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(siren)) next.delete(siren)
      else next.add(siren)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === prospects.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(prospects.map(p => p.siren)))
    }
  }

  const clearSelection = () => setSelected(new Set())

  // Suppression groupée
  const supprimerSelection = async () => {
    const count = selected.size
    if (!window.confirm(`Supprimer ${count} prospect${count > 1 ? 's' : ''} ?`)) return
    setBatchAction(true)
    setError(null)
    try {
      for (const siren of selected) {
        const r = await fetch(`/api/prospection/prospects/${siren}`, { method: 'DELETE' })
        if (!r.ok && r.status !== 204) throw new Error()
      }
      setProspects(prev => prev.filter(p => !selected.has(p.siren)))
      setTotal(prev => prev - count)
      clearSelection()
      await loadStats()
    } catch {
      setError('Erreur lors de la suppression groupée.')
    } finally {
      setBatchAction(false)
    }
  }

  // Changement de statut groupé
  const changerStatutSelection = async (newStatut: string) => {
    setBatchAction(true)
    setError(null)
    try {
      for (const siren of selected) {
        await fetch(`/api/prospection/prospects/${siren}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ statut: newStatut }),
        })
      }
      setProspects(prev => prev.map(p => selected.has(p.siren) ? { ...p, statut: newStatut } : p))
      clearSelection()
      await loadStats()
    } catch {
      setError('Erreur lors du changement de statut groupé.')
    } finally {
      setBatchAction(false)
    }
  }

  // Enrichissement groupé
  const enrichirSelection = async () => {
    const nonEnrichis = prospects.filter(p => selected.has(p.siren) && !p.enrichi).map(p => p.siren)
    if (nonEnrichis.length === 0) return
    setBatchAction(true)
    setError(null)
    try {
      for (const siren of nonEnrichis) {
        await fetch(`/api/prospection/enrich/${siren}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ forcer: false }),
        })
      }
      clearSelection()
      await fetchProspects(cursorStack[pageIndex])
      await loadStats()
    } catch {
      setError("Erreur lors de l'enrichissement groupé.")
    } finally {
      setBatchAction(false)
    }
  }

  // Vider la sélection quand on change de page ou de filtres
  useEffect(() => { clearSelection() }, [pageIndex, appliedQ, appliedDept, statut, enrichiFilter, scoreMin])

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
  const nonEnrichisCount = searchResults.filter(p => !p.enrichi).length

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
          <StatCard
            label="Total prospects"
            value={stats.total.toLocaleString('fr-FR')}
            icon={<IconUsers />}
            accent="violet"
          />
          <StatCard
            label="Enrichis"
            value={stats.enrichis.toLocaleString('fr-FR')}
            sub={stats.total ? `${Math.round(stats.enrichis / stats.total * 100)} %` : undefined}
            icon={<IconBolt />}
            accent="blue"
          />
          <StatCard
            label="Score moyen"
            value={stats.score_moyen.toFixed(1)}
            sub="/ 100"
            icon={<IconStar />}
            accent="amber"
          />
          <StatCard
            label="Convertis"
            value={stats.convertis.toLocaleString('fr-FR')}
            sub={`${stats.nouveaux} nouveaux`}
            icon={<IconCheck />}
            accent="green"
          />
        </div>
      )}

      {/* ── Onglets ─────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 rounded-2xl border bg-background/60 p-1 backdrop-blur">
        {([
          { key: 'recherche', label: 'Rechercher des prospects', icon: <IconSearch className="h-3.5 w-3.5" /> },
          { key: 'prospects', label: `Mes prospects${stats ? ` (${stats.total})` : ''}`, icon: <IconList className="h-3.5 w-3.5" /> },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition
              ${activeTab === tab.key
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {tab.icon}
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
          <div className="rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/60">
                <IconSearch className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Rechercher des entreprises en France</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Base officielle gouvernementale — {SEARCH_PER_PAGE} résultats par page, sauvegardés automatiquement</p>
              </div>
            </div>

            <form
              onSubmit={e => { e.preventDefault(); lancerRecherche(1) }}
              className="space-y-5"
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
                  className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Département</label>
                  <input
                    type="text"
                    value={searchDept}
                    onChange={e => setSearchDept(e.target.value)}
                    placeholder="Ex : 69, 75, 13"
                    maxLength={3}
                    className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Taille d&apos;entreprise</label>
                  <select
                    value={searchCategorie}
                    onChange={e => setSearchCategorie(e.target.value)}
                    className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={searching || !searchQuery.trim()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {searching ? (
                    <><Spinner /> Recherche…</>
                  ) : (
                    <><IconSearch className="h-4 w-4" /> Rechercher</>
                  )}
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
                      setSearchTotal(0)
                    }}
                    className="rounded-2xl border px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Résultats de recherche */}
          {searchDone && (
            <div className="space-y-4">

              {/* En-tête résultats */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {searching
                      ? 'Chargement…'
                      : searchTotal === 0
                        ? 'Aucun résultat.'
                        : <>
                            <span className="text-foreground">{searchResults.length}</span>
                            <span className="text-muted-foreground"> résultat{searchResults.length > 1 ? 's' : ''} affichés sur </span>
                            <span className="text-foreground">{searchTotal.toLocaleString('fr-FR')}</span>
                            <span className="text-muted-foreground"> entreprises trouvées</span>
                          </>
                    }
                  </p>
                  {searchTotal > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Page {searchPage} sur {searchPages} — sauvegardés automatiquement dans vos prospects
                    </p>
                  )}
                </div>
                {nonEnrichisCount > 0 && (
                  <button
                    onClick={enrichirToutePage}
                    disabled={batchEnriching}
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {batchEnriching ? <><Spinner /> Enrichissement…</> : <><IconBolt /> Enrichir les {nonEnrichisCount} restants</>}
                  </button>
                )}
              </div>

              {/* Cartes résultats */}
              {searching ? (
                <div className="flex items-center justify-center rounded-3xl border bg-background/60 py-16 shadow-sm backdrop-blur">
                  <span className="animate-pulse text-sm text-muted-foreground">Recherche en cours…</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="rounded-3xl border bg-background/60 py-16 text-center shadow-sm backdrop-blur">
                  <p className="text-sm text-muted-foreground">Aucune entreprise trouvée pour ces critères.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {searchResults.map(p => (
                    <SearchResultCard
                      key={p.siren}
                      prospect={p}
                      enriching={enrichingSearch === p.siren}
                      onEnrich={() => enrichirDepuisRecherche(p.siren)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination recherche */}
              {searchPages > 1 && (
                <div className="flex items-center justify-between rounded-2xl border bg-background/60 px-5 py-3 shadow-sm backdrop-blur">
                  <span className="text-sm text-muted-foreground">
                    Page {searchPage} / {searchPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => lancerRecherche(searchPage - 1)}
                      disabled={searchPage <= 1 || searching}
                      className="rounded-xl border px-3 py-1.5 text-sm transition hover:bg-muted disabled:opacity-40"
                    >
                      ← Préc.
                    </button>
                    <button
                      onClick={() => lancerRecherche(searchPage + 1)}
                      disabled={searchPage >= searchPages || searching}
                      className="rounded-xl border px-3 py-1.5 text-sm transition hover:bg-muted disabled:opacity-40"
                    >
                      Suiv. →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* État initial : pas encore cherché */}
          {!searchDone && !searching && (
            <div className="rounded-3xl border border-dashed bg-background/40 px-6 py-14 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/40">
                <IconSearch className="h-7 w-7 text-violet-400" />
              </div>
              <p className="text-sm font-medium text-foreground">Lancez votre première recherche</p>
              <p className="mt-1.5 text-xs text-muted-foreground max-w-xs mx-auto">
                Entrez un secteur d&apos;activité, un métier ou un type d&apos;entreprise pour interroger la base officielle française.
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
                <IconRefresh />
                {scoring ? 'Recalcul…' : 'Recalc. scores'}
              </button>
              <button
                onClick={exporterCsv}
                className="inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
              >
                <IconDownload />
                Exporter CSV
              </button>
            </div>
          </div>

          {/* Barre d'actions groupées */}
          {selected.size > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 dark:border-violet-800 dark:bg-violet-950/30">
              <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                {selected.size} prospect{selected.size > 1 ? 's' : ''} sélectionné{selected.size > 1 ? 's' : ''}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* Changer statut */}
                <select
                  disabled={batchAction}
                  onChange={e => { if (e.target.value) changerStatutSelection(e.target.value); e.target.value = '' }}
                  className="rounded-xl border bg-background px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                  defaultValue=""
                >
                  <option value="" disabled>Changer statut…</option>
                  {STATUTS.map(s => (
                    <option key={s} value={s}>{STATUT_META[s]?.label ?? s}</option>
                  ))}
                </select>
                {/* Enrichir sélection */}
                <button
                  onClick={enrichirSelection}
                  disabled={batchAction}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950/80"
                >
                  {batchAction ? <Spinner /> : <IconBolt />}
                  Enrichir
                </button>
                {/* Supprimer sélection */}
                <button
                  onClick={supprimerSelection}
                  disabled={batchAction}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950/80"
                >
                  <IconTrash />
                  Supprimer
                </button>
                {/* Désélectionner */}
                <button
                  onClick={clearSelection}
                  disabled={batchAction}
                  className="rounded-xl border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted disabled:opacity-50"
                >
                  ✕ Désélectionner
                </button>
              </div>
            </div>
          )}

          {/* Tableau prospects */}
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
                        <th className="w-10 px-3 py-3">
                          <input
                            type="checkbox"
                            checked={prospects.length > 0 && selected.size === prospects.length}
                            onChange={toggleSelectAll}
                            className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                        </th>
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
                        <tr key={p.siren} className={`transition hover:bg-muted/20 ${selected.has(p.siren) ? 'bg-violet-50/50 dark:bg-violet-950/20' : ''}`}>
                          <td className="px-3 py-3">
                            <input
                              type="checkbox"
                              checked={selected.has(p.siren)}
                              onChange={() => toggleSelect(p.siren)}
                              className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                            />
                          </td>
                          <td className="px-5 py-3">
                            <div className="font-medium leading-tight">{p.nom}</div>
                            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                              <span>{p.siren}</span>
                              {p.code_naf && <span>· {p.code_naf}</span>}
                              {p.effectif && <span>· {formatEffectif(p.effectif)}</span>}
                              {p.chiffre_affaires && <span>· CA {formatCA(p.chiffre_affaires)}</span>}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-muted-foreground">
                            {p.ville ?? '—'}{p.departement ? ` (${p.departement})` : ''}
                          </td>
                          <td className="px-5 py-3">
                            <ScoreBar score={p.score} />
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
                            <div className="space-y-0.5 text-xs">
                              {p.email && (
                                <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground">
                                  <IconEmail /> <span className="truncate max-w-45">{p.email}</span>
                                </a>
                              )}
                              {p.telephone && (
                                <a href={`tel:${p.telephone}`} className="flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground">
                                  <IconPhone /> {p.telephone}
                                </a>
                              )}
                              {p.site_web && (
                                <a href={p.site_web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground">
                                  <IconGlobe /> <span className="truncate max-w-45">{new URL(p.site_web).hostname.replace('www.', '')}</span>
                                </a>
                              )}
                              {!p.email && !p.telephone && !p.site_web && (
                                <span className="text-muted-foreground/50">Aucun contact</span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {!p.enrichi ? (
                                <button
                                  onClick={() => enrichir(p.siren)}
                                  disabled={enrichingSiren === p.siren}
                                  className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950/80"
                                >
                                  {enrichingSiren === p.siren ? <><Spinner /> …</> : <><IconBolt /> Enrichir</>}
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-xl bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950/50 dark:text-green-300">
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
                    <div key={p.siren} className={`p-4 space-y-3 ${selected.has(p.siren) ? 'bg-violet-50/50 dark:bg-violet-950/20' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selected.has(p.siren)}
                            onChange={() => toggleSelect(p.siren)}
                            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                          <div>
                            <div className="font-medium leading-snug">{p.nom}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {p.ville ?? ''}{p.departement ? ` (${p.departement})` : ''}
                              {p.code_naf ? ` · ${p.code_naf}` : ''}
                            </div>
                          </div>
                        </div>
                        <ScoreBar score={p.score} />
                      </div>
                      {(p.email || p.telephone || p.site_web) && (
                        <div className="space-y-1 text-xs">
                          {p.email && <a href={`mailto:${p.email}`} className="block text-muted-foreground hover:underline">{p.email}</a>}
                          {p.telephone && <a href={`tel:${p.telephone}`} className="block text-muted-foreground">{p.telephone}</a>}
                          {p.site_web && <a href={p.site_web} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:underline truncate">{new URL(p.site_web).hostname}</a>}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2" onClick={e => e.stopPropagation()}>
                        <StatutDropdown
                          statut={p.statut}
                          loading={updatingSiren === p.siren}
                          open={openMenu === p.siren}
                          onToggle={() => setOpenMenu(openMenu === p.siren ? null : p.siren)}
                          onChange={s => updateStatut(p.siren, s)}
                        />
                        {!p.enrichi ? (
                          <button
                            onClick={() => enrichir(p.siren)}
                            disabled={enrichingSiren === p.siren}
                            className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 disabled:opacity-50 dark:bg-blue-950/50 dark:text-blue-300"
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


// ── Carte résultat de recherche ──────────────────────────────────────────────────

function SearchResultCard({
  prospect: p,
  enriching,
  onEnrich,
}: {
  prospect: Prospect
  enriching: boolean
  onEnrich: () => void
}) {
  const ca = formatCA(p.chiffre_affaires)
  const effectif = formatEffectif(p.effectif)

  return (
    <div className="group rounded-2xl border bg-background/60 p-5 shadow-sm backdrop-blur transition hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Infos principales */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start gap-3">
            {/* Avatar initiale */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
              {p.nom.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold leading-tight text-foreground">{p.nom}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                SIREN {p.siren}
              </p>
            </div>
          </div>

          {/* Tags d'info */}
          <div className="flex flex-wrap gap-1.5">
            {p.ville && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <IconPin /> {p.ville}{p.departement ? ` (${p.departement})` : ''}
              </span>
            )}
            {p.code_naf && (
              <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                NAF {p.code_naf}
              </span>
            )}
            {effectif && (
              <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {effectif}
              </span>
            )}
            {ca && (
              <span className="inline-flex items-center rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                CA {ca}
              </span>
            )}
          </div>

          {/* Données enrichies */}
          {p.enrichi && (p.email || p.telephone || p.site_web) && (
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              {p.email && (
                <a href={`mailto:${p.email}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                  <IconEmail /> {p.email}
                </a>
              )}
              {p.telephone && (
                <a href={`tel:${p.telephone}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                  <IconPhone /> {p.telephone}
                </a>
              )}
              {p.site_web && (
                <a href={p.site_web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                  <IconGlobe /> {new URL(p.site_web).hostname.replace('www.', '')}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Colonne droite : score + action */}
        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
          <ScoreBar score={p.score} />
          {p.enrichi ? (
            <span className="inline-flex items-center gap-1 rounded-xl bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-950/50 dark:text-green-300">
              <IconCheck /> Enrichi
            </span>
          ) : (
            <button
              onClick={onEnrich}
              disabled={enriching}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {enriching ? <><Spinner /> Enrichissement…</> : <><IconBolt /> Enrichir</>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


// ── Sous-composants ──────────────────────────────────────────────────────────────

const ACCENT_CLASSES: Record<string, { icon: string; bg: string }> = {
  violet: { icon: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/50' },
  blue:   { icon: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-950/50' },
  amber:  { icon: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-950/50' },
  green:  { icon: 'text-green-600 dark:text-green-400',   bg: 'bg-green-50 dark:bg-green-950/50' },
}

function StatCard({
  label, value, sub, icon, accent = 'violet',
}: {
  label: string
  value: string | number
  sub?: string
  icon?: React.ReactNode
  accent?: string
}) {
  const ac = ACCENT_CLASSES[accent] ?? ACCENT_CLASSES.violet
  return (
    <div className="rounded-3xl border bg-background/60 p-5 shadow-sm backdrop-blur transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {icon && (
          <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${ac.bg} ${ac.icon}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 70 ? 'bg-green-500' :
    score >= 40 ? 'bg-amber-500' :
    score > 0   ? 'bg-violet-400' :
    'bg-gray-200 dark:bg-gray-700'
  const textColor =
    score >= 70 ? 'text-green-700 dark:text-green-400' :
    score >= 40 ? 'text-amber-700 dark:text-amber-400' :
    'text-muted-foreground'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <span className={`font-mono text-xs font-semibold tabular-nums ${textColor}`}>
        {score.toFixed(0)}
      </span>
    </div>
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
        <div className="absolute left-0 top-8 z-20 min-w-35 rounded-2xl border bg-background p-1 shadow-lg">
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

function Spinner() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ── Icônes SVG inline ───────────────────────────────────────────────────────────

function IconSearch({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  )
}

function IconList({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  )
}

function IconBolt() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function IconEmail() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
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

function IconRefresh() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}
