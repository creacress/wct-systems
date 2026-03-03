/**
 * GET /api/prospection/saved/export — Export CSV des prospects sauvegardés
 */
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const userId = Number(session.user.id)
  const sql = neon(process.env.DATABASE_URL!)

  const rows = await sql`
    SELECT * FROM saved_prospects
    WHERE user_id = ${userId}
    ORDER BY saved_at DESC
  `

  const headers = [
    'SIREN', 'SIRET siège', 'Nom', 'Sigle', 'Code NAF', 'Activité', 'Secteur',
    'Date création', 'Adresse', 'CP', 'Ville', 'Département',
    'Catégorie', 'Effectif', 'Dirigeant',
    "Chiffre d'affaires", 'Résultat net',
    'Statut', 'Nature juridique', 'Labels',
    'Fiche annuaire', 'Fiche Pappers',
    'Notes', 'Tags', 'Sauvegardé le',
  ]

  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`

  const csvRows = rows.map((r) => [
    r.siren, r.siret_siege, r.nom, r.sigle, r.code_naf, r.libelle_activite, r.secteur,
    r.date_creation, r.adresse, r.code_postal, r.ville, r.departement,
    r.categorie, r.effectif, r.dirigeant,
    r.chiffre_affaires, r.resultat_net,
    r.statut, r.nature_juridique, Array.isArray(r.labels) ? r.labels.join(', ') : '',
    r.fiche_annuaire, r.fiche_pappers,
    r.notes, Array.isArray(r.tags) ? r.tags.join(', ') : '', r.saved_at,
  ])

  const csv = [headers, ...csvRows].map((row) => row.map(esc).join(',')).join('\n')

  const date = new Date().toISOString().split('T')[0]

  return new Response('\uFEFF' + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename=mes-prospects-${date}.csv`,
    },
  })
}
