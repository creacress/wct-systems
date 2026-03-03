/**
 * GET /api/prospection/saved/stats — Stats agrégées des prospects sauvegardés
 */
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const userId = Number(session.user.id)
  const sql = neon(process.env.DATABASE_URL!)

  const [totalRows, catRows, sectRows, recentRows] = await Promise.all([
    sql`SELECT COUNT(*)::int as total FROM saved_prospects WHERE user_id = ${userId}`,
    sql`
      SELECT categorie, COUNT(*)::int as count
      FROM saved_prospects
      WHERE user_id = ${userId} AND categorie IS NOT NULL
      GROUP BY categorie ORDER BY count DESC
    `,
    sql`
      SELECT secteur, COUNT(*)::int as count
      FROM saved_prospects
      WHERE user_id = ${userId} AND secteur IS NOT NULL
      GROUP BY secteur ORDER BY count DESC LIMIT 10
    `,
    sql`
      SELECT COUNT(*)::int as count
      FROM saved_prospects
      WHERE user_id = ${userId} AND saved_at > NOW() - INTERVAL '7 days'
    `,
  ])

  return NextResponse.json({
    total: totalRows[0]?.total ?? 0,
    by_categorie: catRows,
    by_secteur: sectRows,
    recent_count: recentRows[0]?.count ?? 0,
  })
}
