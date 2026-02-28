import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Audit gratuit | WCT Systems",
  description:
    "Contactez WCT Systems. Formulaire simple et rapide pour demander un audit gratuit : prospects, relances, CRM/RDV, KPI, site SEO. Réponse sous 24–48h ouvrées.",
  alternates: { canonical: "/contact" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SERVICES = [
  { value: "prospects", label: "Trouver des prospects" },
  { value: "relances", label: "Automatiser les relances" },
  { value: "rdv", label: "CRM & rendez-vous" },
  { value: "kpi", label: "Dashboard KPI" },
  { value: "site", label: "Site génération de leads" },
  { value: "autre", label: "Autre / à discuter" },
] as const;

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const preselect = (searchParams?.service ?? "").toLowerCase();
  const selected = SERVICES.some((s) => s.value === preselect) ? preselect : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact — WCT Systems",
        url: `${SITE_URL}/contact`,
        description:
          "Page de contact pour demander un audit gratuit (prospects, relances, CRM/RDV, KPI, site SEO).",
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
          availableLanguage: ["fr"],
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

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Contact • Audit gratuit • Réponse 24–48h
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Parlons de votre contexte
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              et livrons une V1 utile
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            Décrivez votre situation en 60 secondes. On revient vers vous avec un
            plan clair : <strong>3 priorités</strong>, une <strong>V1</strong>{" "}
            rapidement, puis optimisation.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Voir les services
            </Link>
            <Link
              href="/cas-clients"
              className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Voir des cas clients
            </Link>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight">
                  Demander un audit
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pas de blabla : vous expliquez, on structure, on propose un plan
                  d’exécution.
                </p>
              </div>

              {/* NOTE: ce form poste vers /api/contact (à créer). */}
              <form
                action="/api/contact"
                method="post"
                className="grid gap-4"
                aria-label="Formulaire de contact"
              >
                {/* Honeypot anti-spam */}
                <div className="hidden">
                  <label>
                    Ne pas remplir
                    <input name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/40"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/40"
                      placeholder="vous@entreprise.fr"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Entreprise{" "}
                      <span className="ml-2 text-xs text-muted-foreground">
                        (optionnel)
                      </span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/40"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Téléphone{" "}
                      <span className="ml-2 text-xs text-muted-foreground">
                        (optionnel)
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/40"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Sujet
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue={selected}
                    className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/40"
                  >
                    <option value="">Choisir…</option>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="min-h-[140px] rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/40"
                    placeholder="En 3 lignes : votre objectif + votre situation actuelle + votre urgence."
                  />
                  <p className="text-xs text-muted-foreground">
                    Exemple : “Je veux 20 demandes/mois. Aujourd’hui je fais tout à
                    la main. Je veux une V1 en 2 semaines.”
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-3xl border bg-muted p-4">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    J’accepte d’être recontacté(e) au sujet de ma demande. (Aucun
                    spam.)
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-violet-600 px-6 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                >
                  Envoyer la demande
                </button>

                <p className="text-xs text-muted-foreground">
                  Réponse sous 24–48h ouvrées. Si votre demande est urgente,
                  indiquez-le dans le message.
                </p>
              </form>
            </div>
          </div>

          {/* Side info */}
          <aside className="lg:col-span-2">
            <div className="grid gap-6">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
                <p className="text-sm font-medium">Ce que vous obtenez</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {[
                    "3 priorités concrètes",
                    "Un plan d’exécution",
                    "Une V1 utile rapidement",
                    "Des KPI pour piloter",
                  ].map((x) => (
                    <li key={x} className="rounded-2xl border bg-background px-3 py-2">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border bg-linear-to-r from-muted to-muted/60 p-6 shadow-sm">
                <p className="text-sm font-medium">Pour aller plus vite</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Donnez ces 3 infos dans votre message :
                </p>
                <ol className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <li className="rounded-2xl border bg-background px-3 py-2">
                    Objectif (ex: 20 demandes/mois)
                  </li>
                  <li className="rounded-2xl border bg-background px-3 py-2">
                    Votre process actuel
                  </li>
                  <li className="rounded-2xl border bg-background px-3 py-2">
                    Délai souhaité
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
                <p className="text-sm font-medium">Alternative</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Vous pouvez aussi passer par la page services pour choisir
                  exactement la brique qui vous intéresse.
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Choisir un service
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}