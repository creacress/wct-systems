'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function ConnexionPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Email ou mot de passe incorrect. Vérifiez vos identifiants.')
      setLoading(false)
    } else {
      router.push('/prospects')
      router.refresh()
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16">

      {/* Fond dégradé */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="w-full max-w-md space-y-6">

        {/* En-tête */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Espace Client
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Accéder à votre{' '}
            <span className="bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              tableau de bord
            </span>
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à votre outil de prospection B2B.
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="email">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@entreprise.com"
                className="w-full rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Section contact pour les non-clients */}
        <div className="rounded-3xl border bg-background/60 p-6 text-center shadow-sm backdrop-blur">
          <p className="text-sm font-medium">Pas encore client ?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Contactez-nous pour obtenir votre accès à l&apos;espace de prospection B2B.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <a
              href="mailto:contact@webcresson.com"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              contact@webcresson.com
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Nous contacter
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
