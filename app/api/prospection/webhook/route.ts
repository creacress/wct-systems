// Proxy vers le webhook N8N (HTTP → appel server-side, pas de blocage mixed-content)
// POST /api/prospection/webhook  →  http://31.97.178.252:5678/webhook/prospection

import { NextRequest, NextResponse } from 'next/server'

const N8N_URL = 'http://31.97.178.252:5678/webhook-test/prospection'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête JSON invalide' }, { status: 400 })
  }

  try {
    const upstream = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const text = await upstream.text()

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }

    return NextResponse.json(data, { status: upstream.status })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    return NextResponse.json(
      { error: `Impossible de joindre le serveur N8N : ${message}` },
      { status: 502 }
    )
  }
}
