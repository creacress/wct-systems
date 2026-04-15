import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("privacy.metadata.title"),
    description: t("privacy.metadata.description"),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/politica-de-privacidade" : "/politique-de-confidentialite"}`,
      languages: {
        fr: `${siteUrl}/politique-de-confidentialite`,
        "pt-PT": `${siteUrl}/pt/politica-de-privacidade`,
        "x-default": `${siteUrl}/politique-de-confidentialite`,
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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background px-3 py-2">
      <span className="font-medium text-foreground">{label}</span> : {value}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Page                                                   */
/* ────────────────────────────────────────────────────── */

export default async function PolitiqueDeConfidentialitePage() {
  const t = await getTranslations("legal");

  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/40 via-background to-background dark:from-slate-950/15" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* En-tête */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            {t("privacy.badge")}
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("privacy.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("privacy.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* 1. Responsable du traitement */}
          <Section titre={t("privacy.section1.title")}>
            <p>
              {t("privacy.section1.intro")}
            </p>
            <div className="grid gap-2">
              <DataRow label={t("privacy.section1Labels.raisonSociale")} value={t("privacy.section1.raisonSociale")} />
              <DataRow label={t("privacy.section1Labels.formeJuridique")} value={t("privacy.section1.formeJuridique")} />
              <DataRow label={t("privacy.section1Labels.adresse")} value={t("privacy.section1.adresse")} />
              <DataRow label={t("privacy.section1Labels.email")} value={t("privacy.section1.email")} />
              <DataRow label={t("privacy.section1Labels.telephone")} value={t("privacy.section1.telephone")} />
              <DataRow label={t("privacy.section1Labels.responsable")} value={t("privacy.section1.responsable")} />
            </div>
          </Section>

          {/* 2. Données collectées */}
          <Section titre={t("privacy.section2.title")}>
            <p>
              {t("privacy.section2.intro")}
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("privacy.section2.contactTitle")}
            </h3>
            <div className="grid gap-2">
              <DataRow label={t("privacy.section2Labels.donnees")} value={t("privacy.section2.contactDonnees")} />
              <DataRow label={t("privacy.section2Labels.finalite")} value={t("privacy.section2.contactFinalite")} />
              <DataRow label={t("privacy.section2Labels.baseLegale")} value={t("privacy.section2.contactBase")} />
              <DataRow label={t("privacy.section2Labels.duree")} value={t("privacy.section2.contactDuree")} />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("privacy.section2.compteTitle")}
            </h3>
            <div className="grid gap-2">
              <DataRow label={t("privacy.section2Labels.donnees")} value={t("privacy.section2.compteDonnees")} />
              <DataRow label={t("privacy.section2Labels.finalite")} value={t("privacy.section2.compteFinalite")} />
              <DataRow label={t("privacy.section2Labels.baseLegale")} value={t("privacy.section2.compteBase")} />
              <DataRow label={t("privacy.section2Labels.duree")} value={t("privacy.section2.compteDuree")} />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("privacy.section2.prospectionTitle")}
            </h3>
            <div className="grid gap-2">
              <DataRow label={t("privacy.section2Labels.donnees")} value={t("privacy.section2.prospectionDonnees")} />
              <DataRow label={t("privacy.section2Labels.finalite")} value={t("privacy.section2.prospectionFinalite")} />
              <DataRow label={t("privacy.section2Labels.baseLegale")} value={t("privacy.section2.prospectionBase")} />
              <DataRow label={t("privacy.section2Labels.duree")} value={t("privacy.section2.prospectionDuree")} />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("privacy.section2.cookiesTitle")}
            </h3>
            <div className="grid gap-2">
              <DataRow label={t("privacy.section2Labels.donnees")} value={t("privacy.section2.cookiesDonnees")} />
              <DataRow label={t("privacy.section2Labels.finalite")} value={t("privacy.section2.cookiesFinalite")} />
              <DataRow label={t("privacy.section2Labels.baseLegale")} value={t("privacy.section2.cookiesBase")} />
              <DataRow label={t("privacy.section2Labels.duree")} value={t("privacy.section2.cookiesDuree")} />
            </div>

          </Section>

          {/* 3. Utilisation des données */}
          <Section titre={t("privacy.section3.title")}>
            <p>{t("privacy.section3.intro")}</p>
            <ul className="grid gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <li
                  key={i}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {t(`privacy.section3.items.${i}`)}
                </li>
              ))}
            </ul>
            <p>
              {t("privacy.section3.noProfiling")}
            </p>
          </Section>

          {/* 4. Partage avec des tiers */}
          <Section titre={t("privacy.section4.title")}>
            <p>
              {t("privacy.section4.intro")}
            </p>

            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">{t("privacy.section4.hebergementLabel")}</span>{" "}
                {t("privacy.section4.hebergementText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">{t("privacy.section4.bddLabel")}</span>{" "}
                {t("privacy.section4.bddText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">{t("privacy.section4.analyticsLabel")}</span>{" "}
                {t("privacy.section4.analyticsText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">{t("privacy.section4.iaLabel")}</span>{" "}
                {t("privacy.section4.iaText")}
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">{t("privacy.section4.emailLabel")}</span>{" "}
                {t("privacy.section4.emailText")}
              </div>
            </div>

            <p className="mt-2">
              {t("privacy.section4.noOtherSharing")}
            </p>
          </Section>

          {/* 5. Transferts hors UE */}
          <Section titre={t("privacy.section5.title")}>
            <p>
              {t("privacy.section5.intro")}
            </p>
            <ul className="grid gap-2">
              {[0, 1].map((i) => (
                <li key={i} className="rounded-2xl border bg-background px-3 py-2">
                  {t(`privacy.section5.items.${i}`)}
                </li>
              ))}
            </ul>
          </Section>

          {/* 6. Sécurité */}
          <Section titre={t("privacy.section6.title")}>
            <p>
              {t("privacy.section6.intro")}
            </p>
            <ul className="grid gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {t(`privacy.section6.items.${i}`)}
                </li>
              ))}
            </ul>
          </Section>

          {/* 7. Cookies */}
          <Section titre={t("privacy.section7.title")}>
            <p>
              {t("privacy.section7.p1")}{" "}
              <Link
                href="/mentions-legales"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t("privacy.section7.mentionsLink")}
              </Link>
              .
            </p>
            <p>
              {t("privacy.section7.p2")}
            </p>
          </Section>

          {/* 8. Vos droits */}
          <Section titre={t("privacy.section8.title")}>
            <p>
              {t("privacy.section8.intro")}
            </p>
            <div className="grid gap-2">
              <DataRow label={t("privacy.section8.droitAccesLabel")} value={t("privacy.section8.droitAccesValue")} />
              <DataRow label={t("privacy.section8.droitRectificationLabel")} value={t("privacy.section8.droitRectificationValue")} />
              <DataRow label={t("privacy.section8.droitSuppressionLabel")} value={t("privacy.section8.droitSuppressionValue")} />
              <DataRow label={t("privacy.section8.droitPortabiliteLabel")} value={t("privacy.section8.droitPortabiliteValue")} />
              <DataRow label={t("privacy.section8.droitOppositionLabel")} value={t("privacy.section8.droitOppositionValue")} />
              <DataRow label={t("privacy.section8.droitLimitationLabel")} value={t("privacy.section8.droitLimitationValue")} />
              <DataRow label={t("privacy.section8.retraitConsentementLabel")} value={t("privacy.section8.retraitConsentementValue")} />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("privacy.section8.exercerTitle")}
            </h3>
            <p>
              {t("privacy.section8.exercerText")}{" "}
              <a
                href="mailto:contact@webcresson.com"
                className="underline underline-offset-2 hover:text-foreground"
              >
                contact@webcresson.com
              </a>{" "}
              {t("privacy.section8.exercerSuffix")}
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              {t("privacy.section8.cnilTitle")}
            </h3>
            <p>
              {t("privacy.section8.cnilText")}{" "}
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

          {/* 9. Mineurs */}
          <Section titre={t("privacy.section9.title")}>
            <p>
              {t("privacy.section9.text")}
            </p>
          </Section>

          {/* 10. Modifications */}
          <Section titre={t("privacy.section10.title")}>
            <p>
              {t("privacy.section10.text")}
            </p>
          </Section>
        </div>

        {/* Liens utiles */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/mentions-legales"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            {t("privacy.links.mentionsLegales")}
          </Link>
          <Link
            href="/conditions-generales-de-vente"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            {t("privacy.links.cgv")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
          >
            {t("privacy.links.contact")}
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          {t("privacy.lastUpdate")}
        </p>
      </div>
    </main>
  );
}
