import Link from "next/link";
import { getTranslations } from "next-intl/server";

const NAV_KEYS = [
  { href: "/services", key: "nav_services" },
  { href: "/solutions", key: "nav_solutions" },
  { href: "/tarifs", key: "nav_tarifs" },
  { href: "/cas-clients", key: "nav_cas_clients" },
  { href: "/blog", key: "nav_blog" },
  { href: "/comparatifs", key: "nav_comparatifs" },
] as const;

const SAAS_KEYS = [
  { href: "/services/digital-workplace", key: "saas_digital_workplace" },
  { href: "/services/site-web-moderne", key: "saas_site_web_moderne" },
  { href: "/services/automatiser-relances", key: "saas_automatisation" },
  { href: "/services/integration-ia", key: "saas_integration_ia" },
  { href: "/services/nixie-pulse", key: "saas_nixie_pulse" },
  { href: "/services/aiviz", key: "saas_aiviz" },
] as const;

const LEGAL_KEYS = [
  { href: "/mentions-legales", key: "legal_mentions" },
  { href: "/politique-de-confidentialite", key: "legal_confidentialite" },
  { href: "/conditions-generales-de-vente", key: "legal_cgv" },
  { href: "/llms.txt", key: "legal_llms" },
  { href: "/ai.txt", key: "legal_ai" },
  { href: "/sitemap.xml", key: "legal_sitemap" },
] as const;

export async function Footer() {
  const t = await getTranslations("common.footer");
  const year = new Date().getFullYear();

  const NAV = NAV_KEYS.map((it) => ({ href: it.href, label: t(it.key) }));
  const SAAS = SAAS_KEYS.map((it) => ({ href: it.href, label: t(it.key) }));
  const LEGAL = LEGAL_KEYS.map((it) => ({ href: it.href, label: t(it.key) }));

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
              {t("brand_description")}
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
            <p className="font-display text-sm font-medium">{t("section_navigation")}</p>
            <div className="grid gap-2 text-sm">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <p className="font-display text-sm font-medium">{t("section_saas")}</p>
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
            <p className="font-display text-sm font-medium">{t("section_contact")}</p>
            <p className="text-sm text-muted-foreground">
              {t("contact_description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
            >
              {t("cta_reserver_audit")}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between dark:border-white/[0.06]">
          <p>{t("copyright", { year })}</p>
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
