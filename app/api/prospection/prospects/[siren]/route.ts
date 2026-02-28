/**
 * Proxy serveur → GET + PATCH + DELETE /api/prospects/{siren}
 */
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

type Params = { params: Promise<{ siren: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { siren } = await params
  try {
    const res = await fetch(`${API_URL}/api/prospects/${siren}`, {
      headers: { 'X-API-Key': API_KEY },
      cache: 'no-store',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { siren } = await params
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/api/prospects/${siren}`, {
      method: 'PATCH',
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

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { siren } = await params
  try {
    const res = await fetch(`${API_URL}/api/prospects/${siren}`, {
      method: 'DELETE',
      headers: { 'X-API-Key': API_KEY },
    })
    if (res.status === 204) return new Response(null, { status: 204 })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'API indisponible' }, { status: 502 })
  }
}
