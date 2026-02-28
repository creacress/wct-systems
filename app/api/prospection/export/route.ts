/**
 * Proxy serveur → GET /api/export (CSV ou JSON).
 * Retourne le flux binaire en conservant les headers Content-Disposition.
 */
import { NextRequest } from 'next/server'

const API_URL = process.env.PROSPECTION_API_URL ?? ''
const API_KEY = process.env.PROSPECTION_API_KEY ?? ''

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString()
  const url = `${API_URL}/api/export${qs ? `?${qs}` : ''}`

  try {
    const res = await fetch(url, {
      headers: { 'X-API-Key': API_KEY },
      cache: 'no-store',
    })

    const blob = await res.blob()
    const contentType = res.headers.get('Content-Type') ?? 'text/csv; charset=utf-8'
    const disposition = res.headers.get('Content-Disposition') ?? 'attachment; filename=prospects.csv'

    return new Response(blob, {
      status: res.status,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': disposition,
      },
    })
  } catch {
    return new Response('API indisponible', { status: 502 })
  }
}
