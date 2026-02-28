'use server'

/**
 * Server actions — gestion des utilisateurs du portail
 * Réservé à l'admin (email vérifié côté serveur)
 */
import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

function isAdmin(email: string | null | undefined) {
  return email === process.env.ADMIN_EMAIL
}

export async function createUser(formData: FormData) {
  const session = await auth()
  if (!isAdmin(session?.user?.email)) throw new Error('Non autorisé')

  const email    = (formData.get('email')    as string).trim()
  const name     = (formData.get('name')     as string).trim()
  const password =  formData.get('password') as string

  if (!email || !password) return

  const hash = await bcrypt.hash(password, 12)
  const sql  = neon(process.env.DATABASE_URL!)

  await sql`
    INSERT INTO wct_users (email, name, password_hash)
    VALUES (${email}, ${name}, ${hash})
    ON CONFLICT (email) DO NOTHING
  `

  redirect('/admin/users')
}

export async function deleteUser(id: number) {
  const session = await auth()
  if (!isAdmin(session?.user?.email)) throw new Error('Non autorisé')

  const sql = neon(process.env.DATABASE_URL!)
  await sql`DELETE FROM wct_users WHERE id = ${id}`

  redirect('/admin/users')
}
