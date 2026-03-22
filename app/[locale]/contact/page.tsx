import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { ContactFormTracker } from "@/components/site/contact-form-tracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SERVICE_VALUES = [
  "digital-workplace",
  "prospection-ia",
  "site-web",
  "automatisation",
  "integration-ia",
  "q2c-facturation",
  "pack-starter",
  "pack-business",
  "pack-scale",
  "autre",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/contacto" : "/contact"}`,
      languages: {
        fr: `${siteUrl}/contact`,
        "pt-PT": `${siteUrl}/pt/contacto`,
        "x-default": `${siteUrl}/contact`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const t = await getTranslations("contact");
  const preselect = (searchParams?.service ?? "").toLowerCase();
  const selected = SERVICE_VALUES.some((s) => s === preselect) ? preselect : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: t("jsonLd.contactPageName"),
        url: `${SITE_URL}/contact`,
        description: t("jsonLd.contactPageDescription"),
        isPartOf: {
          "@type": "WebSite",
          name: "WCT Systems",
          url: SITE_URL,
        },
      },
      {
        "@type": "Organization",
        name: "WCT Systems",
        url: SITE_URL,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          availableLanguage: ["fr", "pt"],
          url: `${SITE_URL}/contact`,
        },
        areaServed: { "@type": "Country", name: "France" },
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Clean professional background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/30 via-background to-background dark:from-violet-950/10" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              {t("hero.badge")}
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.title")}
              <span className="block text-muted-foreground text-3xl sm:text-4xl md:text-5xl mt-2 font-normal">
                {t("hero.titleSub")}
              </span>
            </h1>

            <p
              className="max-w-3xl text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.description") as string }}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("hero.ctaServices")}
              </Link>
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("hero.ctaCases")}
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* CONTENT */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-14 grid gap-8 lg:grid-cols-5">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border bg-background/80 p-6 shadow-lg backdrop-blur sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.04]">
                <div className="mb-6 border-b pb-6 dark:border-white/[0.06]">
                  <h2 className="font-display font-bold text-xl tracking-tight">
                    {t("form.title")}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("form.subtitle")}
                  </p>
                </div>

                {/* NOTE: ce form poste vers /api/contact */}
                <form
                  action="/api/contact"
                  method="post"
                  className="grid gap-5"
                  aria-label={t("form.ariaLabel")}
                >
                  {/* Honeypot anti-spam */}
                  <div className="hidden">
                    <label>
                      {t("form.honeypotLabel")}
                      <input name="company_website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t("form.labelName")}
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
                        placeholder={t("form.placeholderName")}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("form.labelEmail")}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
                        placeholder={t("form.placeholderEmail")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        {t("form.labelCompany")}{" "}
                        <span className="ml-1 text-xs text-muted-foreground">
                          {t("form.optional")}
                        </span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        autoComplete="organization"
                        className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
                        placeholder={t("form.placeholderCompany")}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {t("form.labelPhone")}{" "}
                        <span className="ml-1 text-xs text-muted-foreground">
                          {t("form.optional")}
                        </span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
                        placeholder={t("form.placeholderPhone")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="service" className="text-sm font-medium">
                      {t("form.labelSubject")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue={selected}
                      className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
                    >
                      <option value="">{t("form.placeholderSubject")}</option>
                      {SERVICE_VALUES.map((val) => (
                        <option key={val} value={val}>
                          {t(`services.${val}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("form.labelMessage")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="min-h-[140px] rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/30 dark:border-white/[0.1] dark:bg-white/[0.04]"
                      placeholder={t("form.placeholderMessage")}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("form.messageExample")}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 rounded-3xl border bg-muted/60 p-4 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      {t("form.consent")}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-1 inline-flex h-13 items-center justify-center rounded-2xl bg-violet-600 px-8 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                  >
                    {t("form.submit")}
                  </button>

                  <p className="text-xs text-muted-foreground">
                    {t("form.responseTime")}
                  </p>
                </form>
              </div>
            </div>

            {/* Side info */}
            <aside className="lg:col-span-2">
              <div className="grid gap-6">
                <div className="rounded-3xl border bg-linear-to-br from-violet-50/60 to-background p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-violet-950/20 dark:to-background">
                  <p className="text-sm font-semibold">{t("sidebar.whatYouGet")}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                    {[0, 1, 2, 3].map((i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 rounded-2xl border bg-background px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                        {t(`sidebar.benefits.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border bg-linear-to-br from-muted/80 to-muted/40 p-6 shadow-sm dark:border-white/[0.06] dark:from-violet-500/[0.06] dark:to-violet-500/[0.02]">
                  <p className="text-sm font-semibold">{t("sidebar.goFaster")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("sidebar.goFasterDesc")}
                  </p>
                  <ol className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2 rounded-2xl border bg-background px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-400">1</span>
                      {t("sidebar.tip1")}
                    </li>
                    <li className="flex items-start gap-2 rounded-2xl border bg-background px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-400">2</span>
                      {t("sidebar.tip2")}
                    </li>
                    <li className="flex items-start gap-2 rounded-2xl border bg-background px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-400">3</span>
                      {t("sidebar.tip3")}
                    </li>
                  </ol>
                </div>

                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold">{t("sidebar.alternative")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("sidebar.alternativeDesc")}
                  </p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition hover:bg-muted"
                  >
                    {t("sidebar.chooseService")}
                  </Link>
                </div>
              </div>
            </aside>
          </section>
        </ScrollReveal>

      </div>
      <ContactFormTracker />
    </main>
  );
}
