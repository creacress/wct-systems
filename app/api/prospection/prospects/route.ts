/**
 * Proxy serveur → GET /api/prospects de l'API wct-prospection.
 * Transmet tous les query params (filtres + pagination curseur).
 */
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString()
  const url = `${API_URL}/api/prospects${qs ? `?${qs}` : ''}`

  try {
    const res = await fetch(url, {
      headers: { 'X-API-Key': API_KEY },
      cache: 'no-store',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}
