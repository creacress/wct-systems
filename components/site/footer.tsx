import Link from "next/link";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/cas-clients", label: "Cas clients" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-base font-semibold tracking-tight">
              WCT <span className="text-muted-foreground">Systems</span>
            </p>
            <p className="text-sm text-muted-foreground">
              IA + automatisation pour PME : acquisition, qualification, CRM, relances, dashboards KPI.
            </p>
            <div className="inline-flex rounded-2xl border bg-muted px-3 py-2 text-xs text-muted-foreground">
              PageSpeed • SEO • SEO IA (LLMs)
            </div>
          </div>

          <div className="grid gap-2">
            <p className="text-sm font-medium">Navigation</p>
            <div className="grid gap-2 text-sm">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Contact</p>
            <p className="text-sm text-muted-foreground">
              Réponse rapide. Audit gratuit orienté actions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
            >
              Réserver un audit
            </Link>
            <p className="text-xs text-muted-foreground">
              © {year} WCT Systems — Tous droits réservés.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Fait pour être lisible par humains et par machines.</p>
          <div className="flex gap-4">
            <Link href="/llms.txt" className="hover:text-foreground">
              llms.txt
            </Link>
            <Link href="/ai.txt" className="hover:text-foreground">
              ai.txt
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}