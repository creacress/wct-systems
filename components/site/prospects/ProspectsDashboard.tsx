'use client'

import { useState, useRef, useEffect } from 'react'

// ── Données de référence ────────────────────────────────────────────────────────

const NAF_CODES = [
  { code: '62.01Z', label: 'Programmation informatique' },
  { code: '62.02A', label: 'Conseil en systèmes informatiques' },
  { code: '62.09Z', label: 'Activités informatiques diverses' },
  { code: '63.11Z', label: 'Traitement de données' },
  { code: '70.22Z', label: 'Conseil pour les affaires' },
  { code: '73.11Z', label: 'Agences de publicité' },
  { code: '74.10Z', label: 'Activités de design' },
  { code: '43.21A', label: 'Travaux d\'installation électrique' },
  { code: '41.20A', label: 'Construction de maisons individuelles' },
  { code: '47.11B', label: 'Commerce de détail alimentaire' },
  { code: '56.10A', label: 'Restauration traditionnelle' },
  { code: '86.21Z', label: 'Médecins généralistes' },
  { code: '85.59B', label: 'Autres enseignements' },
  { code: '49.41A', label: 'Transports routiers de marchandises' },
  { code: '45.11Z', label: 'Commerce de véhicules automobiles' },
  { code: '68.20A', label: 'Locations de logements' },
]

const DEPARTEMENTS = [
  { code: '75', label: 'Paris' },
  { code: '69', label: 'Rhône (Lyon)' },
  { code: '13', label: 'Bouches-du-Rhône (Marseille)' },
  { code: '31', label: 'Haute-Garonne (Toulouse)' },
  { code: '33', label: 'Gironde (Bordeaux)' },
  { code: '59', label: 'Nord (Lille)' },
  { code: '06', label: 'Alpes-Maritimes (Nice)' },
  { code: '67', label: 'Bas-Rhin (Strasbourg)' },
  { code: '44', label: 'Loire-Atlantique (Nantes)' },
  { code: '34', label: 'Hérault (Montpellier)' },
  { code: '76', label: 'Seine-Maritime (Rouen)' },
  { code: '57', label: 'Moselle (Metz)' },
  { code: '38', label: 'Isère (Grenoble)' },
  { code: '35', label: 'Ille-et-Vilaine (Rennes)' },
]

const EFFECTIFS = [
  { code: '00', label: '0 salarié' },
  { code: '01', label: '1-2 salariés' },
  { code: '02', label: '3-5 salariés' },
  { code: '03', label: '6-9 salariés' },
  { code: '11', label: '10-19 salariés' },
  { code: '12', label: '20-49 salariés' },
  { code: '21', label: '50-99 salariés' },
  { code: '22', label: '100-199 salariés' },
]

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

// ── Export CSV ──────────────────────────────────────────────────────────────────

function exportCSV(leads: Lead[]) {
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
  a.download = `leads-prospex-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 70 ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
    : score >= 40 ? 'text-amber-400 border-amber-400/30 bg-amber-400/10'
    : 'text-red-400 border-red-400/30 bg-red-400/10'
  const dot =
    score >= 70 ? 'bg-emerald-400 shadow-emerald-400/50'
    : score >= 40 ? 'bg-amber-400 shadow-amber-400/50'
    : 'bg-red-400 shadow-red-400/50'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold ${color}`}>
      <span className={`size-1.5 rounded-full shadow ${dot}`} />
      {score}%
    </span>
  )
}

function ConfidenceBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    'trouvé': 'text-emerald-400 border-emerald-400/20',
    'pattern': 'text-amber-400 border-amber-400/20',
    'inconnu': 'text-neutral-500 border-neutral-700',
  }
  return (
    <span className={`rounded border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider ${styles[value] ?? styles['inconnu']}`}>
      {value}
    </span>
  )
}

function DataRow({
  icon, label, value, href, badge,
}: {
  icon: string; label: string; value?: string | null; href?: string | null; badge?: string
}) {
  return (
    <div className="flex gap-2">
      <span className="mt-0.5 shrink-0 text-sm">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-600">{label}</div>
        <div className="flex flex-wrap items-center gap-1.5">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-mono text-xs text-blue-400 hover:underline"
            >
              {value}
            </a>
          ) : (
            <span className={`truncate font-mono text-xs ${value ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {value || '—'}
            </span>
          )}
          {badge && <ConfidenceBadge value={badge} />}
        </div>
      </div>
    </div>
  )
}

function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-2 overflow-hidden rounded-xl border transition-colors duration-150 ${
        open ? 'border-neutral-700' : 'border-neutral-800/60'
      } bg-neutral-900/80`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 font-mono text-[11px] text-neutral-600">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">{lead.entreprise}</div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span>{lead.dirigeant?.prenom} {lead.dirigeant?.nom}</span>
              {lead.dirigeant?.qualite && (
                <span className="text-neutral-700">· {lead.dirigeant.qualite}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ScoreBadge score={lead.score_confiance ?? 0} />
          <span className="text-xs text-neutral-600">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Detail */}
      {open && (
        <div className="border-t border-neutral-800 px-4 py-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <DataRow icon="🏢" label="SIRET" value={lead.siret} />
            <DataRow
              icon="📧" label="Email"
              value={lead.email}
              href={lead.email ? `mailto:${lead.email}` : null}
              badge={lead.email_confiance}
            />
            <DataRow
              icon="🌐" label="Domaine"
              value={lead.domaine}
              href={lead.domaine ? `https://${lead.domaine}` : null}
            />
            <DataRow
              icon="💼" label="LinkedIn"
              value={lead.linkedin ? 'Voir profil' : undefined}
              href={lead.linkedin}
            />
            <DataRow icon="📍" label="Localisation" value={`${lead.ville} (${lead.departement})`} />
            <DataRow icon="📞" label="Téléphone" value={lead.telephone} />
            <DataRow icon="👥" label="Effectif" value={lead.effectif} />
            <DataRow icon="🏭" label="Secteur" value={`${lead.secteur_naf} — ${lead.secteur_libelle}`} />
          </div>
        </div>
      )}
    </div>
  )
}

function LogViewer({ logs }: { logs: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [logs])

  return (
    <div
      ref={ref}
      className="h-44 overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-[11px]"
    >
      {logs.length === 0 ? (
        <span className="text-neutral-800">// En attente de lancement...</span>
      ) : (
        logs.map((log, i) => (
          <div
            key={i}
            className={`mb-1 flex gap-2 ${
              log.level === 'success' ? 'text-emerald-400'
              : log.level === 'error' ? 'text-red-400'
              : 'text-neutral-600'
            }`}
          >
            <span className="shrink-0 text-neutral-800">
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
  const [criteria, setCriteria] = useState({
    naf: '62.01Z',
    departement: '75',
    effectif: '11',
    nb_leads: '10',
  })
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [meta, setMeta] = useState<{ total_trouvé: number; criteres: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const esRef = useRef<EventSource | null>(null)

  const addLog = (msg: string, level = 'info') =>
    setLogs((prev) => [...prev, { msg, level, time: Date.now() }])

  const launch = () => {
    esRef.current?.close()
    setRunning(true)
    setLeads([])
    setMeta(null)
    setError(null)
    setLogs([])

    const params = new URLSearchParams(criteria)
    const es = new EventSource(`/api/prospection/agent?${params}`)
    esRef.current = es

    es.onmessage = (e: MessageEvent) => {
      const msg = JSON.parse(e.data as string) as {
        type: string; msg?: string; level?: string; data?: Lead & { total_trouvé?: number; criteres?: string }; message?: string
      }
      switch (msg.type) {
        case 'log':  addLog(msg.msg ?? '', msg.level); break
        case 'lead': setLeads((prev) => [...prev, msg.data as Lead]); break
        case 'meta': setMeta(msg.data as { total_trouvé: number; criteres: string }); break
        case 'error': setError(msg.message ?? 'Erreur inconnue'); setRunning(false); es.close(); break
        case 'done':  setRunning(false); es.close(); break
      }
    }
    es.onerror = () => { addLog('Connexion SSE perdue.', 'error'); setRunning(false); es.close() }
  }

  const selectCls =
    'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-neutral-300 font-mono focus:border-neutral-700 focus:outline-none cursor-pointer'
  const labelCls =
    'mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-neutral-600'

  return (
    <div className="space-y-5">
      {/* ── Formulaire de recherche ── */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-neutral-700">
          // critères de recherche
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="col-span-2">
            <label className={labelCls}>Secteur (code NAF)</label>
            <select value={criteria.naf} onChange={(e) => setCriteria((p) => ({ ...p, naf: e.target.value }))} className={selectCls}>
              {NAF_CODES.map((n) => (
                <option key={n.code} value={n.code}>{n.code} — {n.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Département</label>
            <select value={criteria.departement} onChange={(e) => setCriteria((p) => ({ ...p, departement: e.target.value }))} className={selectCls}>
              {DEPARTEMENTS.map((d) => (
                <option key={d.code} value={d.code}>{d.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Effectif</label>
            <select value={criteria.effectif} onChange={(e) => setCriteria((p) => ({ ...p, effectif: e.target.value }))} className={selectCls}>
              {EFFECTIFS.map((ef) => (
                <option key={ef.code} value={ef.code}>{ef.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Nb leads</label>
            <select value={criteria.nb_leads} onChange={(e) => setCriteria((p) => ({ ...p, nb_leads: e.target.value }))} className={selectCls}>
              {['5', '10', '15', '20', '25'].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={launch}
          disabled={running}
          className={`mt-4 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
            running
              ? 'cursor-not-allowed bg-neutral-800 text-neutral-600'
              : 'bg-violet-600 text-white hover:bg-violet-500'
          }`}
        >
          {running ? (
            <>
              <span className="inline-block animate-spin">◌</span>
              Agent en cours...
            </>
          ) : (
            '▶ Lancer l\'agent'
          )}
        </button>
      </div>

      {/* ── Logs ── */}
      {(running || logs.length > 0) && (
        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-700">
            // logs agent
          </div>
          <LogViewer logs={logs} />
        </div>
      )}

      {/* ── Erreur ── */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-400">
          <strong>ERREUR :</strong> {error}
        </div>
      )}

      {/* ── Résultats ── */}
      {leads.length > 0 && (
        <div>
          {/* Barre résultats + export */}
          <div className="mb-3 flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2.5">
            <div className="font-mono text-xs text-neutral-500">
              <span className="font-bold text-emerald-400">{leads.length}</span>{' '}
              lead{leads.length > 1 ? 's' : ''} enrichi{leads.length > 1 ? 's' : ''}
              {running && <span className="ml-2 text-neutral-700">— enrichissement en cours...</span>}
              {meta && !running && <span className="ml-2 text-neutral-800">· {meta.criteres}</span>}
            </div>
            {!running && (
              <button
                type="button"
                onClick={() => exportCSV(leads)}
                className="rounded-md border border-neutral-700 px-3 py-1 font-mono text-[11px] text-neutral-500 transition-colors hover:border-neutral-600 hover:text-neutral-300"
              >
                ↓ Export CSV
              </button>
            )}
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2">
            {leads.map((lead, i) => (
              <LeadCard key={lead.siret ?? i} lead={lead} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
