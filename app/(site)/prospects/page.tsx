import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProspectsDashboard } from '@/components/site/prospects/ProspectsDashboard'
import { SavedProspectsDashboard } from '@/components/site/prospects/SavedProspectsDashboard'
import { ProspectsPageTabs } from '@/components/site/prospects/ProspectsPageTabs'

export const metadata: Metadata = {
  title: 'Agent PROSPEX — WCT Systems',
  description: 'Agent IA de prospection B2B : collecte et enrichit automatiquement vos leads depuis l\'annuaire des entreprises françaises.',
  robots: { index: false, follow: false },
}

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const activeTab = tab === 'saved' ? 'saved' : 'search'

  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-950/20 via-background to-background" />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-800/40 bg-violet-950/30 px-3 py-1 text-xs uppercase tracking-wide text-violet-400">
            <span className="size-1.5 animate-pulse rounded-full bg-violet-400" />
            Prospection B2B · DataGouv · N8N
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {activeTab === 'search' ? (
              <>
                Recherche{' '}
                <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  d&apos;entreprises
                </span>
              </>
            ) : (
              <>
                Mes prospects{' '}
                <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  sauvegardés
                </span>
              </>
            )}
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            {activeTab === 'search'
              ? "Trouvez vos prospects B2B parmi les entreprises françaises. Filtrez par localisation, secteur d'activité, effectif, chiffre d'affaires et labels."
              : 'Consultez, gérez et exportez vos fiches prospects. Retrouvez facilement vos contacts via LinkedIn et Google.'}
          </p>
        </div>

        <Suspense>
          <ProspectsPageTabs activeTab={activeTab} />
        </Suspense>

        {activeTab === 'search' ? (
          <ProspectsDashboard />
        ) : (
          <SavedProspectsDashboard />
        )}
      </div>
    </main>
  )
}
