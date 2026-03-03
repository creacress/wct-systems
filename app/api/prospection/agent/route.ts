// ── PROSPEX Agent SSE Route ────────────────────────────────────────────────────
// GET /api/prospection/agent?q=plombier&departement=75&effectif=11&nb_leads=10
//
// Streams Server-Sent Events :
//   { type:"log",  msg, level }      — logs temps réel
//   { type:"lead", data:{...} }      — lead enrichi (1 par entreprise)
//   { type:"meta", data:{...} }      — récap final
//   { type:"done" }
//   { type:"error", message }        — erreur (inclus dans le stream SSE, pas un HTTP 500)

import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-sonnet-4-6'
const DATAGOUV_URL = 'https://recherche-entreprises.api.gouv.fr'

// ── Types ───────────────────────────────────────────────────────────────────────

type Company = {
  siret: string | null
  siren: string | null
  entreprise: string
  domaine: string | null
  secteur_naf: string
  secteur_libelle: string
  ville: string
  departement: string
  effectif: string
  dirigeants: { nom: string; prenom: string; qualite: string }[]
}

type Contact = {
  email: string | null
  email_confiance: 'trouvé' | 'pattern' | 'inconnu'
  linkedin: string | null
  telephone: string | null
  score_confiance: number
}

// ── Phase 1 — Collecte DataGouv ─────────────────────────────────────────────────
// Utilise le paramètre `q` (recherche texte libre) de l'API Recherche Entreprises

async function searchEntreprises(params: {
  q: string
  departement: string
  effectif: string
  perPage: number
}): Promise<Company[]> {
  const qs = new URLSearchParams({ q: params.q, per_page: String(params.perPage) })
  if (params.departement) qs.set('departement', params.departement)
  if (params.effectif) qs.set('tranche_effectif_salarie', params.effectif)

  const res = await fetch(`${DATAGOUV_URL}/search?${qs}`, {
    headers: { Accept: 'application/json', 'User-Agent': 'PROSPEX/2.0 (WCT-Systems)' },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`API Recherche Entreprises → HTTP ${res.status}`)
  }

  const data = await res.json()

  return (data.results ?? []).map((e: Record<string, unknown>) => {
    const siege = (e.siege ?? {}) as Record<string, string>
    const libelle = (e.libelle_activite_principale ?? {}) as Record<string, string>
    return {
      siret: siege.siret ?? null,
      siren: (e.siren as string) ?? null,
      entreprise: (e.nom_complet as string) || (e.nom_raison_sociale as string) || 'Inconnu',
      domaine: cleanDomain(siege.site_internet),
      secteur_naf: (e.activite_principale as string) || '',
      secteur_libelle: libelle.fr || '',
      ville: siege.libelle_commune || '',
      departement: siege.departement || params.departement,
      effectif: (e.tranche_effectif_salarie_label as string) || '',
      dirigeants: ((e.dirigeants as unknown[]) ?? []).map((d) => {
        const dir = d as Record<string, string>
        return { nom: dir.nom || '', prenom: dir.prenom || '', qualite: dir.qualite || 'Dirigeant' }
      }),
    }
  })
}

function cleanDomain(url?: string): string | null {
  if (!url) return null
  return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase().trim() || null
}

// ── Phase 2 — Enrichissement Claude + web_search ─────────────────────────────────

async function enrichLead(
  company: Company,
  dirigeant: { nom: string; prenom: string; qualite: string },
  onLog: (msg: string, level?: string) => void
): Promise<Contact> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const name = `${dirigeant.prenom} ${dirigeant.nom}`.trim()
  const domain = company.domaine

  const prompt = `Trouve les coordonnées professionnelles de :
- Personne : ${name}${dirigeant.qualite ? ` (${dirigeant.qualite})` : ''}
- Entreprise : ${company.entreprise}
- Localisation : ${company.ville}, France
${domain ? `- Site web : ${domain}` : '- Site web : inconnu'}

Recherche son email professionnel, profil LinkedIn et téléphone entreprise.
Si email non trouvé mais domaine connu → génère le pattern le plus probable (prenom.nom@domaine.fr).

Réponds UNIQUEMENT en JSON valide (sans markdown) :
{"email":"...","email_confiance":"trouvé|pattern|inconnu","linkedin":"url ou null","telephone":"... ou null"}`

  const messages: Anthropic.Messages.MessageParam[] = [{ role: 'user', content: prompt }]

  try {
    for (let turn = 0; turn < 6; turn++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        tools: [{ type: 'web_search_20250305' as const, name: 'web_search' }],
        messages,
      })

      messages.push({ role: 'assistant', content: response.content })

      if (response.stop_reason === 'end_turn') {
        const text = response.content
          .filter((b): b is Anthropic.Messages.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('')

        const match = text.match(/\{[^{}]*"email[^{}]*\}/)
        if (match) {
          return calcScore(JSON.parse(match[0]) as Partial<Contact>, domain)
        }
        break
      }

      if (response.stop_reason === 'tool_use') {
        const toolResults: Anthropic.Messages.ToolResultBlockParam[] = response.content
          .filter((b): b is Anthropic.Messages.ToolUseBlock => b.type === 'tool_use')
          .map((b) => ({
            type: 'tool_result' as const,
            tool_use_id: b.id,
            content: [{ type: 'text' as const, text: 'Recherche exécutée.' }],
          }))
        if (toolResults.length > 0) {
          messages.push({ role: 'user', content: toolResults })
        }
      }
    }
  } catch (err) {
    onLog(
      `⚠️ Enrichissement ${company.entreprise}: ${err instanceof Error ? err.message : 'erreur'}`,
      'error'
    )
  }

  return fallbackPattern(dirigeant, domain)
}

function calcScore(contact: Partial<Contact>, domain: string | null): Contact {
  let score = 0
  if (contact.email) score += contact.email_confiance === 'trouvé' ? 40 : 20
  if (contact.linkedin) score += 30
  if (domain) score += 20
  if (contact.telephone) score += 10
  return {
    email: contact.email ?? null,
    email_confiance: contact.email_confiance ?? 'inconnu',
    linkedin: contact.linkedin ?? null,
    telephone: contact.telephone ?? null,
    score_confiance: Math.min(score, 100),
  }
}

function fallbackPattern(
  dirigeant: { nom: string; prenom: string },
  domain: string | null
): Contact {
  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')

  if (domain && dirigeant.prenom && dirigeant.nom) {
    return {
      email: `${normalize(dirigeant.prenom)}.${normalize(dirigeant.nom)}@${domain}`,
      email_confiance: 'pattern',
      linkedin: null,
      telephone: null,
      score_confiance: 40,
    }
  }
  return {
    email: null,
    email_confiance: 'inconnu',
    linkedin: null,
    telephone: null,
    score_confiance: domain ? 20 : 0,
  }
}

// ── Route Handler ────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim() ?? ''
  const departement = searchParams.get('departement') ?? ''
  const effectif = searchParams.get('effectif') ?? ''
  const nbLeads = Math.min(Math.max(parseInt(searchParams.get('nb_leads') ?? '10'), 1), 25)

  const encoder = new TextEncoder()

  // Toutes les erreurs sont émises comme événements SSE (pas de HTTP 4xx/5xx)
  // → le frontend lit toujours le stream normalement
  const stream = new ReadableStream({
    async start(controller) {
      const send = (type: string, payload: Record<string, unknown> = {}) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type, ...payload })}\n\n`))
      }
      const log = (msg: string, level = 'info') => send('log', { msg, level })

      // Validation dans le stream (pas avant) pour toujours avoir un SSE valide
      if (!process.env.ANTHROPIC_API_KEY) {
        send('error', { message: 'ANTHROPIC_API_KEY manquante. Ajoutez-la dans .env.local et redémarrez le serveur.' })
        controller.close()
        return
      }

      if (!q) {
        send('error', { message: 'Saisissez un métier ou type d\'entreprise pour lancer la recherche.' })
        controller.close()
        return
      }

      try {
        log('🚀 Agent PROSPEX démarré', 'success')
        log(`🔍 Recherche : "${q}" | Dept ${departement || 'tous'} | Effectif ${effectif || 'tous'}`)

        // Phase 1
        log('🔌 Connexion API Recherche Entreprises (data.gouv.fr)...')
        const companies = await searchEntreprises({ q, departement, effectif, perPage: nbLeads })

        if (!companies.length) {
          log(`⚠️ Aucune entreprise trouvée pour "${q}".`, 'error')
          send('done')
          controller.close()
          return
        }

        log(`✅ ${companies.length} entreprises trouvées`, 'success')
        log('🤖 Enrichissement Claude + web search...')

        // Phase 2
        const leads = []
        for (let i = 0; i < companies.length; i++) {
          const company = companies[i]
          const dirigeant = company.dirigeants?.[0]

          if (!dirigeant || (!dirigeant.nom && !dirigeant.prenom)) {
            log(`⏭️  [${i + 1}/${companies.length}] ${company.entreprise} — pas de dirigeant`)
            continue
          }

          const contact = await enrichLead(
            company,
            dirigeant,
            (msg, level) => log(`  [${i + 1}/${companies.length}] ${msg}`, level)
          )

          const lead = {
            siret: company.siret,
            entreprise: company.entreprise,
            domaine: company.domaine,
            secteur_naf: company.secteur_naf,
            secteur_libelle: company.secteur_libelle,
            ville: company.ville,
            departement: company.departement,
            effectif: company.effectif,
            dirigeant: {
              nom: dirigeant.nom,
              prenom: dirigeant.prenom,
              qualite: dirigeant.qualite || 'Dirigeant',
            },
            ...contact,
          }

          leads.push(lead)
          send('lead', { data: lead })
          log(
            `✅ Lead #${leads.length} : ${company.entreprise} (score ${contact.score_confiance}%)`,
            'success'
          )
        }

        send('meta', {
          data: {
            total_trouvé: leads.length,
            criteres: `"${q}"${departement ? ` · Dept ${departement}` : ''}`,
            source: 'API Recherche Entreprises + Claude Web Search',
          },
        })
        log(`🎯 Terminé — ${leads.length} leads enrichis`, 'success')
        send('done')
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erreur inconnue'
        log(`❌ ${msg}`, 'error')
        send('error', { message: msg })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
