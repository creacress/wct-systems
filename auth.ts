/**
 * Configuration NextAuth v5 (Auth.js)
 * Provider : Credentials (email + mot de passe hashé)
 * DB : Neon PostgreSQL via @neondatabase/serverless
 * Sessions : JWT (pas de table sessions en base)
 */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const sql = neon(process.env.DATABASE_URL!)

          // Recherche de l'utilisateur par email
          const rows = await sql`
            SELECT id, email, name, password_hash
            FROM wct_users
            WHERE email = ${credentials.email as string}
            LIMIT 1
          `

          const user = rows[0]
          if (!user) return null

          // Vérification du mot de passe
          const valid = await bcrypt.compare(
            credentials.password as string,
            user.password_hash as string,
          )
          if (!valid) return null

          return {
            id: String(user.id),
            email: user.email as string,
            name: (user.name as string) ?? null,
          }
        } catch (err) {
          console.error('[auth] Erreur authorize:', err)
          return null
        }
      },
    }),
  ],

  // Sessions stockées en JWT (cookie signé) — aucune table sessions requise
  session: { strategy: 'jwt' },

  // Pages personnalisées
  pages: { signIn: '/connexion' },
})
