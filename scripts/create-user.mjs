/**
 * Script pour créer un compte client dans Neon DB.
 * Usage : node scripts/create-user.mjs <email> <motdepasse> [nom]
 *
 * Le script affiche la requête SQL à exécuter dans la console Neon.
 * Créer la table d'abord si elle n'existe pas (voir ci-dessous).
 *
 * -- SQL à exécuter UNE FOIS dans la console Neon :
 * CREATE TABLE IF NOT EXISTS wct_users (
 *   id            SERIAL PRIMARY KEY,
 *   email         TEXT UNIQUE NOT NULL,
 *   name          TEXT,
 *   password_hash TEXT NOT NULL,
 *   created_at    TIMESTAMPTZ DEFAULT NOW()
 * );
 */

import bcrypt from 'bcryptjs'

const [,, email, password, name = ''] = process.argv

if (!email || !password) {
  console.error('Usage : node scripts/create-user.mjs <email> <motdepasse> [nom]')
  console.error('Exemple : node scripts/create-user.mjs client@exemple.com MonMotDePasse "Jean Dupont"')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)

console.log('\n-- Exécuter ce SQL dans la console Neon :\n')
console.log(
  `INSERT INTO wct_users (email, name, password_hash)\nVALUES ('${email}', '${name}', '${hash}');`
)
console.log()
