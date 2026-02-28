/**
 * Proxy serveur → POST /api/enrich/{siren}
 */
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

type Params = { params: Promise<{ siren: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const { siren } = await params
  try {
    const body = await request.json().catch(() => ({}))
    const res = await fetch(`${API_URL}/api/enrich/${siren}`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}
