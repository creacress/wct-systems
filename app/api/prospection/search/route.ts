/**
 * Proxy serveur → POST /api/search
 */
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/api/search`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}
