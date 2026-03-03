// Proxy vers le webhook N8N (HTTP → appel server-side, pas de blocage mixed-content)
// POST /api/prospection/webhook  →  http://31.97.178.252:5678/webhook/prospection

import { NextRequest, NextResponse } from 'next/server'

const N8N_URL = 'http://31.97.178.252:5678/webhook/prospection'

type ApiError = {
  success: false
  code: string
  message: string
  suggestion: string
  status: number
}

function apiError(code: string, message: string, suggestion: string, status: number) {
  return NextResponse.json(
    { success: false, code, message, suggestion, status } satisfies ApiError,
    { status }
  )
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return apiError(
      'INVALID_JSON',
      'Le corps de la requête est invalide.',
      'Vérifiez que le formulaire est correctement rempli et réessayez.',
      400
    )
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)

    const upstream = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    const text = await upstream.text()

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }

    // Traduire les erreurs upstream en format structuré
    if (!upstream.ok) {
      const upstreamMsg =
        typeof data === 'object' && data !== null && 'erreur' in data
          ? String((data as Record<string, unknown>).erreur)
          : typeof data === 'string'
            ? data
            : `Erreur HTTP ${upstream.status}`

      if (upstream.status === 429) {
        return apiError(
          'RATE_LIMIT',
          'L\'annuaire des entreprises est temporairement surchargé.',
          'Patientez 10 à 30 secondes puis relancez votre recherche.',
          429
        )
      }

      if (upstream.status === 422 || upstream.status === 400) {
        return apiError(
          'INVALID_PARAMS',
          'Les paramètres de recherche sont invalides.',
          'Vérifiez le code NAF, le département ou les filtres saisis.',
          400
        )
      }

      if (upstream.status >= 500) {
        return apiError(
          'UPSTREAM_ERROR',
          'Le serveur de recherche rencontre un problème.',
          'Le service est peut-être en maintenance. Réessayez dans quelques minutes.',
          502
        )
      }

      return apiError('UPSTREAM_ERROR', upstreamMsg, 'Réessayez dans quelques instants.', upstream.status)
    }

    return NextResponse.json(data, { status: upstream.status })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return apiError(
        'TIMEOUT',
        'Le serveur de recherche met trop de temps à répondre.',
        'Essayez de réduire le nombre de résultats ou simplifiez vos filtres.',
        504
      )
    }

    const isNetwork =
      err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('ECONNREFUSED'))

    if (isNetwork) {
      return apiError(
        'SERVER_OFFLINE',
        'Le serveur de prospection est injoignable.',
        'Vérifiez que le serveur N8N est démarré ou contactez l\'administrateur.',
        503
      )
    }

    return apiError(
      'UNKNOWN',
      'Une erreur inattendue s\'est produite.',
      'Réessayez ou contactez le support si le problème persiste.',
      500
    )
  }
}
