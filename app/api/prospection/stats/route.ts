/**
 * Proxy serveur → GET /api/stats de l'API wct-prospection.
 * La clé API reste côté serveur (jamais exposée au navigateur).
 */
import { NextResponse } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/stats`, {
      headers: { 'X-API-Key': API_KEY },
      cache: 'no-store',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}
