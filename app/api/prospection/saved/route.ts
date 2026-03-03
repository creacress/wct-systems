/**
 * GET  /api/prospection/saved — Liste les prospects sauvegardés
 * POST /api/prospection/saved — Sauvegarde un prospect
 */
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const userId = Number(session.user.id)
  const sql = neon(process.env.DATABASE_URL!)

  const { searchParams } = req.nextUrl
  const q = searchParams.get('q')?.trim() ?? ''
  const categorie = searchParams.get('categorie')?.trim() ?? ''

  let rows
  if (q && categorie) {
    rows = await sql`
      SELECT * FROM saved_prospects
      WHERE user_id = ${userId} AND nom ILIKE ${`%${q}%`} AND categorie = ${categorie}
      ORDER BY saved_at DESC
    `
  } else if (q) {
    rows = await sql`
      SELECT * FROM saved_prospects
      WHERE user_id = ${userId} AND nom ILIKE ${`%${q}%`}
      ORDER BY saved_at DESC
    `
  } else if (categorie) {
    rows = await sql`
      SELECT * FROM saved_prospects
      WHERE user_id = ${userId} AND categorie = ${categorie}
      ORDER BY saved_at DESC
    `
  } else {
    rows = await sql`
      SELECT * FROM saved_prospects
      WHERE user_id = ${userId}
      ORDER BY saved_at DESC
    `
  }

  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const userId = Number(session.user.id)
  const body = await req.json()

  if (!body.siren || !body.nom) {
    return NextResponse.json({ error: 'siren et nom requis' }, { status: 400 })
  }

  const sql = neon(process.env.DATABASE_URL!)

  const rows = await sql`
    INSERT INTO saved_prospects (
      user_id, siren, siret_siege, nom, sigle, code_naf, libelle_activite,
      secteur, date_creation, adresse, code_postal, ville, departement,
      categorie, effectif, dirigeant, chiffre_affaires, resultat_net,
      statut, nature_juridique, labels, fiche_annuaire, fiche_pappers
    ) VALUES (
      ${userId}, ${body.siren}, ${body.siret_siege ?? null}, ${body.nom},
      ${body.sigle ?? null}, ${body.code_naf ?? null}, ${body.libelle_activite ?? null},
      ${body.secteur ?? null}, ${body.date_creation ?? null}, ${body.adresse ?? null},
      ${body.code_postal ?? null}, ${body.ville ?? null}, ${body.departement ?? null},
      ${body.categorie ?? null}, ${body.effectif ?? null}, ${body.dirigeant ?? null},
      ${body.chiffre_affaires ?? null}, ${body.resultat_net ?? null},
      ${body.statut ?? null}, ${body.nature_juridique ?? null},
      ${body.labels ?? []}, ${body.fiche_annuaire ?? null}, ${body.fiche_pappers ?? null}
    )
    ON CONFLICT (user_id, siren) DO NOTHING
    RETURNING *
  `

  if (rows.length === 0) {
    return NextResponse.json({ already_saved: true }, { status: 409 })
  }

  return NextResponse.json(rows[0], { status: 201 })
}
