import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LeadTracker } from "@/components/site/lead-tracker";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("merci.metadata.title"),
    description: t("merci.metadata.description"),
    robots: { index: false, follow: false },
  };
}

export default async function MerciPage() {
  const t = await getTranslations("contact");

  return (
    <main id="content" className="relative overflow-hidden">
      <LeadTracker />
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/40 via-background to-background dark:from-violet-950/15" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="mx-auto max-w-2xl space-y-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            {t("merci.badge")}
          </div>

          {/* Icône check animée */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/50">
            <svg
              className="h-10 w-10 text-violet-600 dark:text-violet-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t("merci.title")}
            <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              {t("merci.titleHighlight")}
            </span>
          </h1>

          <p
            className="text-lg text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: t.raw("merci.description") as string }}
          />
        </section>

        {/* Étapes suivantes */}
        <section className="mt-14">
          <h2 className="text-center font-display text-xl font-bold tracking-tight">
            {t("merci.stepsTitle")}
          </h2>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  {i + 1}
                </div>
                <p className="mt-3 font-medium">{t(`merci.steps.${i}.title`)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(`merci.steps.${i}.desc`)}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Conseils */}
        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8">
            <p className="text-sm font-medium">
              {t("merci.meanwhile")}
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((i) => (
                <li
                  key={i}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {t(`merci.tips.${i}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border bg-linear-to-r from-muted to-muted/60 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-medium">{t("merci.urgent")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("merci.urgentDesc")}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border bg-background px-4 py-3 text-sm font-medium transition hover:bg-muted"
            >
              {t("merci.resend")}
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-14">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {t("merci.ctaTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("merci.ctaDesc")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t("merci.ctaCases")}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("merci.ctaServices")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
