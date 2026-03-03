/**
 * DELETE /api/prospection/saved/{siren} — Supprime un prospect sauvegardé
 * PATCH  /api/prospection/saved/{siren} — Met à jour notes/tags
 */
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'

type Params = { params: Promise<{ siren: string }> }

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { siren } = await params
  const userId = Number(session.user.id)
  const sql = neon(process.env.DATABASE_URL!)

  const rows = await sql`
    DELETE FROM saved_prospects
    WHERE user_id = ${userId} AND siren = ${siren}
    RETURNING id
  `

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  }

  return new Response(null, { status: 204 })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { siren } = await params
  const userId = Number(session.user.id)
  const body = await req.json()
  const sql = neon(process.env.DATABASE_URL!)

  const rows = await sql`
    UPDATE saved_prospects
    SET notes = COALESCE(${body.notes ?? null}, notes),
        tags = COALESCE(${body.tags ?? null}, tags)
    WHERE user_id = ${userId} AND siren = ${siren}
    RETURNING *
  `

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}
