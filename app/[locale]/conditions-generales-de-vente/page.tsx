import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("cgv.metadata.title"),
    description: t("cgv.metadata.description"),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/termos-e-condicoes" : "/conditions-generales-de-vente"}`,
      languages: {
        fr: `${siteUrl}/conditions-generales-de-vente`,
        "pt-PT": `${siteUrl}/pt/termos-e-condicoes`,
        "x-default": `${siteUrl}/conditions-generales-de-vente`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

/* ────────────────────────────────────────────────────── */
/* Composants réutilisables                               */
/* ────────────────────────────────────────────────────── */

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.04]">
      <h2 className="font-display text-lg font-semibold tracking-tight">{titre}</h2>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────── */
/* Page                                                   */
/* ────────────────────────────────────────────────────── */

export default async function CGVPage() {
  const t = await getTranslations("legal");

  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/40 via-background to-background dark:from-slate-950/15" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* En-tête */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            {t("cgv.badge")}
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("cgv.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("cgv.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* Article 1 */}
          <Section titre={t("cgv.article1.title")}>
            <p>{t("cgv.article1.p1")}</p>
            <p>{t("cgv.article1.p2")}</p>
          </Section>

          {/* Article 2 */}
          <Section titre={t("cgv.article2.title")}>
            <p>{t("cgv.article2.intro")}</p>
            <ul className="grid gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li
                  key={i}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {t(`cgv.article2.items.${i}`)}
                </li>
              ))}
            </ul>
            <p>{t("cgv.article2.perimetre")}</p>
          </Section>

          {/* Article 3 */}
          <Section titre={t("cgv.article3.title")}>
            <p>{t("cgv.article3.intro")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article3.forfaitTitle")}
            </h3>
            <p>{t("cgv.article3.forfaitText")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article3.aboTitle")}
            </h3>
            <p>{t("cgv.article3.aboText")}</p>

            <p className="mt-3">{t("cgv.article3.prixHT")}</p>
            <p>{t("cgv.article3.modifTarifs")}</p>
          </Section>

          {/* Article 4 */}
          <Section titre={t("cgv.article4.title")}>
            <p>{t("cgv.article4.intro")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article4.forfaitTitle")}
            </h3>
            <p>{t("cgv.article4.forfaitText")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article4.aboTitle")}
            </h3>
            <p>{t("cgv.article4.aboText")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article4.retardTitle")}
            </h3>
            <p>{t("cgv.article4.retardIntro")}</p>
            <ul className="grid gap-2">
              {[0, 1].map((i) => (
                <li key={i} className="rounded-2xl border bg-background px-3 py-2">
                  {t(`cgv.article4.retardItems.${i}`)}
                </li>
              ))}
            </ul>
          </Section>

          {/* Article 5 */}
          <Section titre={t("cgv.article5.title")}>
            <p>{t("cgv.article5.intro")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article5.obligPresTitle")}
            </h3>
            <p>{t("cgv.article5.obligPresText")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article5.obligClientTitle")}
            </h3>
            <p>{t("cgv.article5.obligClientText")}</p>
          </Section>

          {/* Article 6 */}
          <Section titre={t("cgv.article6.title")}>
            <p>{t("cgv.article6.p1")}</p>
            <p>{t("cgv.article6.p2")}</p>
            <p>{t("cgv.article6.p3")}</p>
          </Section>

          {/* Article 7 */}
          <Section titre={t("cgv.article7.title")}>
            <p>{t("cgv.article7.p1")}</p>
            <p>{t("cgv.article7.p2")}</p>
            <p>{t("cgv.article7.p3")}</p>
          </Section>

          {/* Article 8 */}
          <Section titre={t("cgv.article8.title")}>
            <h3 className="text-sm font-medium text-foreground">
              {t("cgv.article8.forfaitTitle")}
            </h3>
            <p>{t("cgv.article8.forfaitText")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article8.aboTitle")}
            </h3>
            <p>{t("cgv.article8.aboText")}</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              {t("cgv.article8.consequencesTitle")}
            </h3>
            <p>{t("cgv.article8.consequencesText")}</p>
          </Section>

          {/* Article 9 */}
          <Section titre={t("cgv.article9.title")}>
            <p>{t("cgv.article9.p1")}</p>
            <p>
              {t("cgv.article9.p2prefix")}{" "}
              <Link
                href="/mentions-legales"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t("cgv.article9.p2link")}
              </Link>
              {t("cgv.article9.p2suffix")}
            </p>
          </Section>

          {/* Article 10 */}
          <Section titre={t("cgv.article10.title")}>
            <p>{t("cgv.article10.p1")}</p>
            <p>{t("cgv.article10.p2")}</p>
          </Section>

          {/* Article 11 */}
          <Section titre={t("cgv.article11.title")}>
            <p>{t("cgv.article11.p1")}</p>
            <p>{t("cgv.article11.p2")}</p>
          </Section>
        </div>

        {/* Liens utiles */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/mentions-legales"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            {t("cgv.links.mentionsLegales")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
          >
            {t("cgv.links.contact")}
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          {t("cgv.lastUpdate")}
        </p>
      </div>
    </main>
  );
}
