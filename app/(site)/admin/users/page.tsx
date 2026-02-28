/**
 * Page admin — gestion des accès portail
 * Accessible uniquement à l'email défini dans ADMIN_EMAIL
 */
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { neon } from '@neondatabase/serverless'
import { createUser, deleteUser } from './actions'

export const metadata = { title: 'Gestion des accès — Admin' }

export default async function AdminUsersPage() {
  const session = await auth()

  // Vérification admin côté serveur
  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/prospects')
  }

  const sql = neon(process.env.DATABASE_URL!)
  const users = await sql`
    SELECT id, email, name, created_at::text
    FROM wct_users
    ORDER BY created_at DESC
  `

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 space-y-8">

      {/* En-tête */}
      <div>
        <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300 mb-3">
          Administration
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Accès portail client</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {users.length} compte{users.length !== 1 ? 's' : ''} enregistré{users.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des utilisateurs */}
      <div className="rounded-2xl border overflow-hidden">
        {users.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-muted-foreground">
            Aucun compte. Ajoutez le premier accès ci-dessous.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Nom</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Créé le</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id as number} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{(u.name as string) || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email as string}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(u.created_at as string).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    {/* Pas de suppression de son propre compte */}
                    {u.email !== session.user!.email && (
                      <form action={deleteUser.bind(null, u.id as number)}>
                        <button
                          type="submit"
                          className="text-xs text-red-500 hover:text-red-700 transition-colors"
                          onClick={(e) => {
                            if (!confirm(`Supprimer l'accès de ${u.email as string} ?`)) {
                              e.preventDefault()
                            }
                          }}
                        >
                          Supprimer
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Formulaire d'ajout */}
      <div className="rounded-2xl border bg-background/60 p-6 space-y-4 backdrop-blur">
        <h2 className="font-medium">Créer un accès</h2>
        <form action={createUser} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              placeholder="Nom complet"
              className="rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="client@entreprise.com"
              className="rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>
          <input
            name="password"
            type="password"
            required
            placeholder="Mot de passe temporaire"
            className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
          />
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
          >
            Créer le compte
          </button>
        </form>
      </div>

    </div>
  )
}
