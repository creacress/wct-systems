'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function ProspectsPageTabs({ activeTab }: { activeTab: 'search' | 'saved' }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const switchTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'search') params.delete('tab')
    else params.set('tab', tab)
    const qs = params.toString()
    router.push(`/prospects${qs ? `?${qs}` : ''}`)
  }

  return (
    <div className="mb-6 flex gap-1 rounded-2xl border bg-background/60 p-1.5 shadow-sm backdrop-blur">
      <button
        onClick={() => switchTab('search')}
        className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
          activeTab === 'search'
            ? 'bg-violet-600 text-white shadow-sm'
            : 'text-muted-foreground hover:bg-muted'
        }`}
      >
        Recherche d&apos;entreprises
      </button>
      <button
        onClick={() => switchTab('saved')}
        className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
          activeTab === 'saved'
            ? 'bg-violet-600 text-white shadow-sm'
            : 'text-muted-foreground hover:bg-muted'
        }`}
      >
        Mes prospects sauvegardés
      </button>
    </div>
  )
}
