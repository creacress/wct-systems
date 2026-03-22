import type { Metadata } from "next";
import Link from "next/link";
import { ResetCookiesButton } from "./reset-cookies-button";
import { getTranslations, getLocale } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("mentionsLegales.metadata.title"),
    description: t("mentionsLegales.metadata.description"),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/avisos-legais" : "/mentions-legales"}`,
      languages: {
        fr: `${siteUrl}/mentions-legales`,
        "pt-PT": `${siteUrl}/pt/avisos-legais`,
        "x-default": `${siteUrl}/mentions-legales`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

/* ────────────────────────────────────────────────────── */
/* Sections réutilisables                                 */
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background px-3 py-2">
      <span className="font-medium text-foreground">{label}</span> : {value}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Page                                                   */
/* ────────────────────────────────────────────────────── */

export default async function MentionsLegalesPage() {
  const t = await getTranslations("legal");

  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/40 via-background to-background dark:from-slate-950/15" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* En-tête */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            {t("mentionsLegales.badge")}
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("mentionsLegales.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("mentionsLegales.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* 1. Éditeur du site */}
          <Section titre={t("mentionsLegales.section1.title")}>
            <div className="grid gap-2">
              <Row label={t("mentionsLegales.section1Labels.raisonSociale")} value={t("mentionsLegales.section1.raisonSociale")} />
              <Row label={t("mentionsLegales.section1Labels.formeJuridique")} value={t("mentionsLegales.section1.formeJuridique")} />
              <Row label={t("mentionsLegales.section1Labels.capitalSocial")} value={t("mentionsLegales.section1.capitalSocial")} />
              <Row label={t("mentionsLegales.section1Labels.siren")} value={t("mentionsLegales.section1.siren")} />
              <Row label={t("mentionsLegales.section1Labels.siret")} value={t("mentionsLegales.section1.siret")} />
              <Row label={t("mentionsLegales.section1Labels.rcs")} value={t("mentionsLegales.section1.rcs")} />
              <Row label={t("mentionsLegales.section1Labels.tva")} value={t("mentionsLegales.section1.tva")} />
              <Row label={t("mentionsLegales.section1Labels.siege")} value={t("mentionsLegales.section1.siege")} />
              <Row label={t("mentionsLegales.section1Labels.telephone")} value={t("mentionsLegales.section1.telephone")} />
              <Row label={t("mentionsLegales.section1Labels.email")} value={t("mentionsLegales.section1.email")} />
              <Row label={t("mentionsLegales.section1Labels.directeur")} value={t("mentionsLegales.section1.directeur")} />
            </div>
          </Section>

          {/* 2. Hébergeur */}
          <Section titre={t("mentionsLegales.section2.title")}>
            <div className="grid gap-2">
              <Row label={t("mentionsLegales.section2Labels.raisonSociale")} value={t("mentionsLegales.section2.raisonSociale")} />
              <Row label={t("mentionsLegales.section2Labels.adresse")} value={t("mentionsLegales.section2.adresse")} />
              <Row label={t("mentionsLegales.section2Labels.siteWeb")} value={t("mentionsLegales.section2.siteWeb")} />
            </div>
          </Section>

          {/* 3. Propriété intellectuelle */}
          <Section titre={t("mentionsLegales.section3.title")}>
            <p>
              {t("mentionsLegales.section3.p1", { siteUrl: SITE_URL })}
            </p>
            <p>
              {t("mentionsLegales.section3.p2")}
            </p>
          </Section>

          {/* 4. Données personnelles */}
          <Section titre={t("mentionsLegales.section4.title")}>
            <p>
              {t("mentionsLegales.section4.intro")}
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("mentionsLegales.section4.responsableTitle")}
            </h3>
            <p>{t("mentionsLegales.section4.responsable")}</p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("mentionsLegales.section4.donneesTitle")}
            </h3>
            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  {t("mentionsLegales.section4.formulaireLabel")}
                </span>{" "}
                {t("mentionsLegales.section4.formulaireText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  {t("mentionsLegales.section4.cookiesLabel")}
                </span>{" "}
                {t("mentionsLegales.section4.cookiesText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  {t("mentionsLegales.section4.espaceLabel")}
                </span>{" "}
                {t("mentionsLegales.section4.espaceText")}
              </div>
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("mentionsLegales.section4.dureeTitle")}
            </h3>
            <p>
              {t("mentionsLegales.section4.dureeText")}
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("mentionsLegales.section4.droitsTitle")}
            </h3>
            <p>
              {t("mentionsLegales.section4.droitsText")}{" "}
              <a
                href="mailto:contact@webcresson.com"
                className="underline underline-offset-2 hover:text-foreground"
              >
                contact@webcresson.com
              </a>
              {t("mentionsLegales.section4.droitsDelai")}
            </p>
            <p>
              {t("mentionsLegales.section4.litigeText")}{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                www.cnil.fr
              </a>
            </p>
          </Section>

          {/* 5. Cookies */}
          <Section titre={t("mentionsLegales.section5.title")}>
            <p>
              {t("mentionsLegales.section5.intro")}
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("mentionsLegales.section5.essentielTitle")}
            </h3>
            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  {t("mentionsLegales.section5.sessionLabel")}
                </span>{" "}
                {t("mentionsLegales.section5.sessionText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  {t("mentionsLegales.section5.consentLabel")}
                </span>{" "}
                {t("mentionsLegales.section5.consentText")}
              </div>
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("mentionsLegales.section5.analyticsTitle")}
            </h3>
            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  {t("mentionsLegales.section5.gaLabel")}
                </span>{" "}
                {t("mentionsLegales.section5.gaText")}
              </div>
            </div>

            <p className="mt-4">
              {t("mentionsLegales.section5.modifierText")}
            </p>
            <ResetCookiesButton />
          </Section>

          {/* 6. Crédits */}
          <Section titre={t("mentionsLegales.section6.title")}>
            <p>
              {t("mentionsLegales.section6.text")}
            </p>
          </Section>
        </div>

        {/* Liens utiles */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/conditions-generales-de-vente"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            {t("mentionsLegales.links.cgv")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
          >
            {t("mentionsLegales.links.contact")}
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          {t("mentionsLegales.lastUpdate")}
        </p>
      </div>
    </main>
  );
}
