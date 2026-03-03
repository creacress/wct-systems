'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ── Types ───────────────────────────────────────────────────────────────────────

type Lead = {
  siret: string | null
  entreprise: string
  domaine: string | null
  secteur_naf: string
  secteur_libelle: string
  ville: string
  departement: string
  effectif: string
  dirigeant: { nom: string; prenom: string; qualite: string }
  email: string | null
  email_confiance: 'trouvé' | 'pattern' | 'inconnu'
  linkedin: string | null
  telephone: string | null
  score_confiance: number
}

type LogEntry = { msg: string; level: string; time: number }

// ── Référentiels ────────────────────────────────────────────────────────────────

const DEPARTEMENTS = [
  { code: '', label: 'Tous les départements' },
  { code: '75', label: 'Paris (75)' },
  { code: '69', label: 'Rhône — Lyon (69)' },
  { code: '13', label: 'Bouches-du-Rhône — Marseille (13)' },
  { code: '31', label: 'Haute-Garonne — Toulouse (31)' },
  { code: '33', label: 'Gironde — Bordeaux (33)' },
  { code: '59', label: 'Nord — Lille (59)' },
  { code: '06', label: 'Alpes-Maritimes — Nice (06)' },
  { code: '67', label: 'Bas-Rhin — Strasbourg (67)' },
  { code: '44', label: 'Loire-Atlantique — Nantes (44)' },
  { code: '34', label: 'Hérault — Montpellier (34)' },
  { code: '76', label: 'Seine-Maritime — Rouen (76)' },
  { code: '35', label: 'Ille-et-Vilaine — Rennes (35)' },
  { code: '38', label: 'Isère — Grenoble (38)' },
  { code: '57', label: 'Moselle — Metz (57)' },
]

const EFFECTIFS = [
  { code: '', label: 'Tous les effectifs' },
  { code: '00', label: '0 salarié' },
  { code: '01', label: '1–2 salariés' },
  { code: '02', label: '3–5 salariés' },
  { code: '03', label: '6–9 salariés' },
  { code: '11', label: '10–19 salariés' },
  { code: '12', label: '20–49 salariés' },
  { code: '21', label: '50–99 salariés' },
  { code: '22', label: '100–199 salariés' },
]

// ── Export CSV ──────────────────────────────────────────────────────────────────

function exportCSV(leads: Lead[], query: string) {
  const headers = [
    'SIRET', 'Entreprise', 'Domaine', 'NAF', 'Secteur',
    'Ville', 'Département', 'Effectif',
    'Nom', 'Prénom', 'Qualité',
    'Email', 'Confiance email', 'LinkedIn', 'Téléphone', 'Score',
  ]
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = leads.map((l) => [
    l.siret, l.entreprise, l.domaine, l.secteur_naf, l.secteur_libelle,
    l.ville, l.departement, l.effectif,
    l.dirigeant?.nom, l.dirigeant?.prenom, l.dirigeant?.qualite,
    l.email, l.email_confiance, l.linkedin, l.telephone, l.score_confiance,
  ])
  const csv = [headers, ...rows].map((r) => r.map(esc).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `leads-${query.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Score badge ─────────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  if (score >= 70) return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
      <span className="size-1.5 rounded-full bg-green-500" />
      {score}%
    </span>
  )
  if (score >= 40) return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
      <span className="size-1.5 rounded-full bg-amber-500" />
      {score}%
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
      <span className="size-1.5 rounded-full bg-muted-foreground/50" />
      {score}%
    </span>
  )
}

// ── Confidence badge ────────────────────────────────────────────────────────────

function ConfidenceBadge({ value }: { value: string }) {
  if (value === 'trouvé') return (
    <span className="rounded-full border border-green-200 bg-green-50 px-2 py-px text-[10px] font-medium text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
      vérifié
    </span>
  )
  if (value === 'pattern') return (
    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-px text-[10px] font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
      pattern
    </span>
  )
  return (
    <span className="rounded-full border px-2 py-px text-[10px] font-medium text-muted-foreground">
      inconnu
    </span>
  )
}

// ── Lead card ───────────────────────────────────────────────────────────────────

function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-2xl border bg-background/60 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border bg-muted text-xs font-medium text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <div className="truncate font-semibold tracking-tight">{lead.entreprise}</div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <span>{lead.dirigeant?.prenom} {lead.dirigeant?.nom}</span>
              {lead.dirigeant?.qualite && (
                <span className="text-xs">{lead.dirigeant.qualite}</span>
              )}
              {lead.ville && (
                <span className="text-xs">· {lead.ville}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ScoreBadge score={lead.score_confiance ?? 0} />
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`size-4 text-muted-foreground/50 transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* Detail */}
      {open && (
        <div className="border-t px-5 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Colonne entreprise */}
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Entreprise</p>
              <dl className="space-y-2 text-sm">
                {lead.siret && (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">SIRET</dt>
                    <dd className="font-mono text-xs">{lead.siret}</dd>
                  </div>
                )}
                {lead.domaine && (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Site</dt>
                    <dd>
                      <a
                        href={`https://${lead.domaine}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:underline dark:text-violet-400"
                      >
                        {lead.domaine}
                      </a>
                    </dd>
                  </div>
                )}
                {lead.effectif && (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Effectif</dt>
                    <dd>{lead.effectif}</dd>
                  </div>
                )}
                {lead.secteur_libelle && (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Secteur</dt>
                    <dd className="text-xs">
                      {lead.secteur_naf && <span className="font-mono">{lead.secteur_naf} </span>}
                      {lead.secteur_libelle}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Colonne contact */}
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Contact</p>
              <dl className="space-y-2 text-sm">
                {lead.email ? (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Email</dt>
                    <dd className="flex flex-wrap items-center gap-1.5">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-violet-600 hover:underline dark:text-violet-400 break-all"
                      >
                        {lead.email}
                      </a>
                      <ConfidenceBadge value={lead.email_confiance} />
                    </dd>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Email</dt>
                    <dd className="text-muted-foreground/50">—</dd>
                  </div>
                )}

                {lead.linkedin ? (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">LinkedIn</dt>
                    <dd>
                      <a
                        href={lead.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:underline dark:text-violet-400"
                      >
                        Voir le profil →
                      </a>
                    </dd>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">LinkedIn</dt>
                    <dd className="text-muted-foreground/50">—</dd>
                  </div>
                )}

                {lead.telephone ? (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Tél.</dt>
                    <dd>
                      <a href={`tel:${lead.telephone}`} className="hover:underline">
                        {lead.telephone}
                      </a>
                    </dd>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-xs text-muted-foreground">Tél.</dt>
                    <dd className="text-muted-foreground/50">—</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Log viewer ──────────────────────────────────────────────────────────────────

function LogViewer({ logs }: { logs: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [logs])

  return (
    <div
      ref={ref}
      className="h-40 overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-[11px]"
    >
      {logs.length === 0 ? (
        <span className="text-zinc-700">// en attente...</span>
      ) : (
        logs.map((log, i) => (
          <div key={i} className={`mb-0.5 flex gap-3 ${
            log.level === 'success' ? 'text-emerald-400'
            : log.level === 'error' ? 'text-red-400'
            : 'text-zinc-500'
          }`}>
            <span className="shrink-0 text-zinc-700">
              {new Date(log.time).toLocaleTimeString('fr-FR')}
            </span>
            <span>{log.msg}</span>
          </div>
        ))
      )}
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────────

export function ProspectsDashboard() {
  const [query, setQuery] = useState('')
  const [departement, setDepartement] = useState('')
  const [effectif, setEffectif] = useState('')
  const [nbLeads, setNbLeads] = useState('10')
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [meta, setMeta] = useState<{ total_trouvé: number; criteres: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const addLog = useCallback((msg: string, level = 'info') => {
    setLogs((prev) => [...prev, { msg, level, time: Date.now() }])
  }, [])

  const launch = async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setRunning(true)
    setLeads([])
    setMeta(null)
    setError(null)
    setLogs([])

    const params = new URLSearchParams({ q: query, departement, effectif, nb_leads: nbLeads })

    try {
      const res = await fetch(`/api/prospection/agent?${params}`, {
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => 'Erreur réseau')
        setError(text)
        setRunning(false)
        return
      }

      // Lecture manuelle du stream SSE (donne accès aux erreurs HTTP)
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        // Découpe les blocs SSE (séparés par \n\n)
        const chunks = buffer.split('\n\n')
        buffer = chunks.pop() ?? ''

        for (const chunk of chunks) {
          const dataLine = chunk.split('\n').find((l) => l.startsWith('data: '))
          if (!dataLine) continue
          try {
            const msg = JSON.parse(dataLine.slice(6)) as {
              type: string; msg?: string; level?: string
              data?: Lead & { total_trouvé?: number; criteres?: string }
              message?: string
            }
            switch (msg.type) {
              case 'log':
                addLog(msg.msg ?? '', msg.level)
                break
              case 'lead':
                setLeads((prev) => [...prev, msg.data as Lead])
                break
              case 'meta':
                setMeta(msg.data as { total_trouvé: number; criteres: string })
                break
              case 'error':
                setError(msg.message ?? 'Erreur inconnue')
                setRunning(false)
                return
              case 'done':
                setRunning(false)
                return
            }
          } catch {
            // Ignore les chunks malformés
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError('Connexion interrompue. Vérifiez que le serveur est démarré.')
        addLog('Connexion interrompue.', 'error')
      }
    } finally {
      setRunning(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !running && query.trim()) launch()
  }

  const selectCls =
    'w-full rounded-2xl border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700'

  return (
    <div className="space-y-6">

      {/* ── Formulaire de recherche ── */}
      <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">

        {/* Barre de recherche principale */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-muted-foreground/50">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Plombier, consultant informatique, restaurant, avocat..."
            className="w-full rounded-2xl border bg-background py-3.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition dark:border-neutral-700"
            disabled={running}
          />
        </div>

        {/* Filtres */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Département</label>
            <select
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
              className={selectCls}
              disabled={running}
            >
              {DEPARTEMENTS.map((d) => (
                <option key={d.code} value={d.code}>{d.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Effectif</label>
            <select
              value={effectif}
              onChange={(e) => setEffectif(e.target.value)}
              className={selectCls}
              disabled={running}
            >
              {EFFECTIFS.map((ef) => (
                <option key={ef.code} value={ef.code}>{ef.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Nombre de leads</label>
            <select
              value={nbLeads}
              onChange={(e) => setNbLeads(e.target.value)}
              className={selectCls}
              disabled={running}
            >
              {['5', '10', '15', '20', '25'].map((v) => (
                <option key={v} value={v}>{v} leads</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={launch}
            disabled={running || !query.trim()}
            className={`inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-medium transition ${
              running || !query.trim()
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] hover:bg-violet-700'
            }`}
          >
            {running ? (
              <>
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
                </svg>
                Agent en cours...
              </>
            ) : (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
                </svg>
                Lancer l&apos;agent
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="rounded-full border px-2 py-0.5">DataGouv</span>
            <span>+</span>
            <span className="rounded-full border px-2 py-0.5">Claude AI</span>
          </div>
        </div>
      </div>

      {/* ── Logs ── */}
      {(running || logs.length > 0) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Logs agent</p>
            {running && (
              <span className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400">
                <span className="size-1.5 animate-pulse rounded-full bg-violet-500" />
                En cours
              </span>
            )}
          </div>
          <LogViewer logs={logs} />
        </div>
      )}

      {/* ── Erreur ── */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <strong className="font-medium">Erreur</strong> — {error}
        </div>
      )}

      {/* ── Résultats ── */}
      {leads.length > 0 && (
        <div className="space-y-3">
          {/* Barre résultats + export */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold text-violet-600 dark:text-violet-400">{leads.length}</span>
              <span className="text-muted-foreground"> lead{leads.length > 1 ? 's' : ''} enrichi{leads.length > 1 ? 's' : ''}</span>
              {meta && !running && (
                <span className="ml-2 text-xs text-muted-foreground/60">{meta.criteres}</span>
              )}
              {running && (
                <span className="ml-2 text-xs text-muted-foreground/60">— enrichissement en cours...</span>
              )}
            </div>
            {!running && (
              <button
                type="button"
                onClick={() => exportCSV(leads, query)}
                className="inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Exporter CSV
              </button>
            )}
          </div>

          {/* Cards */}
          <div className="space-y-2.5">
            {leads.map((lead, i) => (
              <LeadCard key={lead.siret ?? i} lead={lead} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
