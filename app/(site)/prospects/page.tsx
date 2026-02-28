import type { Metadata } from 'next'
import { ProspectsDashboard } from '@/components/site/prospects/ProspectsDashboard'

export const metadata: Metadata = {
  title: 'Mes Prospects — WCT Systems',
  description: 'Tableau de bord de prospection B2B : recherchez, enrichissez et gérez vos prospects.',
  robots: { index: false, follow: false },
}

export default function ProspectsPage() {
  return (
    <main id="content" className="relative overflow-hidden">
      {/* Fond dégradé identique aux autres pages */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">

        {/* En-tête */}
        <div className="mb-8 space-y-3">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            CRM Prospection B2B
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Mes{' '}
            <span className="bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Prospects
            </span>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Recherchez, enrichissez et suivez vos prospects B2B en temps réel.
          </p>
        </div>

        {/* Dashboard interactif */}
        <ProspectsDashboard />
      </div>
    </main>
  )
}
