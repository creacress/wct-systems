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
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/40 via-background to-background dark:from-violet-950/15" />

      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-violet-300">
            Espace Client
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Accéder à votre{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              tableau de bord
            </span>
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à votre outil de prospection B2B.
          </p>
        </div>

        {/* Login form */}
        <div className="rounded-3xl border bg-background/70 p-8 shadow-lg backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
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
                className="w-full rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
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
                className="w-full rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition-all hover:bg-violet-700 hover:shadow-md disabled:opacity-50"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Non-client section */}
        <div className="rounded-3xl border bg-background/60 p-6 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
          <p className="font-display text-sm font-semibold">Pas encore client ?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Contactez-nous pour obtenir votre accès à l&apos;espace de prospection B2B.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <a
              href="mailto:contact@webcresson.com"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              contact@webcresson.com
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
