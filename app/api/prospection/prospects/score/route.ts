/**
 * Proxy serveur → POST /api/prospects/score (recalcule tous les scores)
 */
import { NextResponse } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

export async function POST() {
  try {
    const res = await fetch(`${API_URL}/api/prospects/score`, {
      method: 'POST',
      headers: { 'X-API-Key': API_KEY },
      cache: 'no-store',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}
