/**
 * POST /api/prospection/saved/check — Vérifie quels SIRENs sont déjà sauvegardés
 * Body : { sirens: string[] }
 * Response : { saved: string[] }
 */
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ saved: [] })

  const userId = Number(session.user.id)
  const body = await req.json()
  const sirens: string[] = body.sirens

  if (!Array.isArray(sirens) || sirens.length === 0) {
    return NextResponse.json({ saved: [] })
  }

  const sql = neon(process.env.DATABASE_URL!)

  const rows = await sql`
    SELECT siren FROM saved_prospects
    WHERE user_id = ${userId} AND siren = ANY(${sirens})
  `

  return NextResponse.json({ saved: rows.map((r) => r.siren) })
}
