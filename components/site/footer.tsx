import Link from "next/link";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions par secteur" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/cas-clients", label: "Cas clients" },
  { href: "/blog", label: "Blog" },
] as const;

const SAAS = [
  { href: "/services/digital-workplace", label: "Digital Workplace" },
  { href: "/services/trouver-prospects", label: "Prospection IA" },
  { href: "/services/site-web-moderne", label: "Site Web Moderne" },
  { href: "/services/automatiser-relances", label: "Automatisation" },
  { href: "/services/integration-ia", label: "Intégration IA" },
] as const;

const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/conditions-generales-de-vente", label: "CGV" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/ai.txt", label: "ai.txt" },
  { href: "/sitemap.xml", label: "Sitemap" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t dark:border-white/[0.06]">
      {/* Gradient top accent */}
      <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <p className="font-display text-base font-semibold tracking-tight">
              WCT <span className="text-muted-foreground">Systems</span>
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Digital Workplace & IA pour PME : 5 SaaS, un écosystème complet.
            </p>
            <div className="inline-flex items-center gap-2 rounded-2xl border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Next.js &bull; IA &bull; SEO &bull; Perf A+
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="font-display text-sm font-medium">Navigation</p>
            <div className="grid gap-2 text-sm">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 5 SaaS */}
          <div className="space-y-3">
            <p className="font-display text-sm font-medium">5 SaaS</p>
            <div className="grid gap-2 text-sm">
              {SAAS.map((l) => (
                <Link key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="font-display text-sm font-medium">Contact</p>
            <p className="text-sm text-muted-foreground">
              Réponse rapide. Audit gratuit orienté actions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
            >
              Réserver un audit
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between dark:border-white/[0.06]">
          <p>&copy; {year} WCT Systems — Tous droits réservés.</p>
          <div className="flex flex-wrap gap-4">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
