import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "Intégration IA — Chatbot, Agents & Assistants sur mesure | WCT Systems",
  description:
    "Intégrez l'IA dans votre quotidien : chatbot site/WhatsApp, agents IA métier, RAG sur vos données, connexion outils existants. Formation incluse. Audit gratuit.",
  alternates: { canonical: "/services/integration-ia" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "C'est quoi un agent IA exactement ?",
    a: "Un agent IA est un assistant automatisé qui exécute des tâches : répondre aux clients, qualifier des leads, rédiger des emails, analyser des données. Il s'adapte à votre métier et vos process.",
  },
  {
    q: "Est-ce que l'IA peut utiliser mes données internes ?",
    a: "Oui. Grâce au RAG (Retrieval Augmented Generation), l'IA peut répondre en se basant sur vos documents, FAQ, fiches produits ou base de connaissances. Vos données restent privées.",
  },
  {
    q: "Vous pouvez connecter l'IA à mes outils actuels ?",
    a: "Oui : CRM, Notion, HubSpot, Gmail, Slack, WhatsApp, etc. L'IA s'intègre dans votre workflow existant.",
  },
  {
    q: "Faut-il des compétences techniques pour l'utiliser ?",
    a: "Non. On configure tout pour vous et on forme votre équipe (1h/mois incluse). L'IA est prête à l'emploi.",
  },
] as const;

export default function IntegrationIaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: "Intégration IA",
            item: `${SITE_URL}/services/integration-ia`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Intégration IA — Chatbot, Agents & Assistants sur mesure",
        description:
          "Service d'intégration IA pour PME : chatbot site/WhatsApp, agents IA métier (vente, support, RH), RAG sur vos données, connexion outils existants.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/integration-ia`,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-fuchsia-50/50 via-background to-background dark:from-fuchsia-950/20" />
      <GridPattern variant="dot" color="rgba(217, 70, 239, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-1 text-xs uppercase tracking-wide text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950/50 dark:text-fuchsia-300">
                IA sur mesure &bull; Chatbot &bull; Agents &bull; RAG
              </div>
              <div className="inline-flex items-center rounded-full border border-fuchsia-300 bg-fuchsia-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-fuchsia-500/30">
                Populaire
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              L&apos;IA intégrée
              <span className="block bg-linear-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-fuchsia-400 dark:via-purple-400 dark:to-pink-400">
                dans votre quotidien
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Chatbot pour votre site ou WhatsApp, agents IA pour la vente, le support ou les RH,
              assistants connectés à vos données. On met en place l&apos;IA qui a un impact réel
              sur votre productivité.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact?service=integration-ia"
                className="inline-flex items-center justify-center rounded-2xl bg-fuchsia-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:bg-fuchsia-700"
              >
                Demander un audit gratuit
              </Link>
              <div className="text-sm text-muted-foreground">
                199 &euro; HT/mois &middot; Mise en place incluse &middot; Formation 1h/mois
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* USE CASES */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Cas d&apos;usage concrets</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Chatbot site / WhatsApp",
                  desc: "Répondez aux visiteurs 24/7, qualifiez les leads, prenez des RDV automatiquement.",
                },
                {
                  title: "Agent IA vente",
                  desc: "Rédaction d'emails, scoring de leads, synthèse de conversations, relances intelligentes.",
                },
                {
                  title: "Agent IA support",
                  desc: "Réponses automatiques basées sur votre FAQ et documentation. Escalade aux humains si besoin.",
                },
                {
                  title: "Agent IA RH",
                  desc: "Tri de CV, réponses candidats, synthèse d'entretiens, onboarding automatisé.",
                },
                {
                  title: "RAG sur vos données",
                  desc: "L'IA répond en se basant sur vos documents internes, fiches produits ou base de connaissances.",
                },
                {
                  title: "Connexion outils",
                  desc: "CRM, Notion, HubSpot, Gmail, Slack — l'IA s'intègre dans votre workflow existant.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02] dark:hover:border-fuchsia-500/20 dark:hover:bg-fuchsia-500/[0.06]">
                    <p className="font-display text-sm font-medium">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Ce qui est inclus</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                "Chatbot IA pour votre site / WhatsApp",
                "Agents IA métier (vente, support, RH)",
                "Connexion à vos outils existants",
                "Réponses basées sur vos données (RAG)",
                "Formation équipe incluse (1h/mois)",
                "Support & maintenance continus",
              ].map((item, i) => (
                <ScrollReveal key={item} delay={i * 70}>
                  <div className="group rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02] dark:hover:bg-fuchsia-500/[0.06]">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-100 text-sm font-semibold text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Exemple de ROI</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <ScrollReveal delay={0}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    3h/jour de tâches répétitives (emails, réponses, tri)
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Gain</p>
                  <p className="mt-2 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                    <CountUp end={60} suffix="h/mois" /> récupérées par l&apos;équipe
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Réponses plus rapides, leads qualifiés, satisfaction client
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-6 dark:border-white/[0.06] dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02]">
              <p className="text-sm font-medium">Traduction business</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Un chatbot qui qualifie <strong>20 leads/mois</strong> à votre place
                et un agent qui rédige <strong>50 emails/semaine</strong> — c&apos;est
                l&apos;équivalent d&apos;un mi-temps en moins.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                *Exemple indicatif : dépend de votre volume et complexité des tâches.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* BEFORE AFTER */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Avant / Après</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal delay={0} direction="left">
                <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                  <p className="text-sm font-medium">Avant</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Tâches manuelles répétitives, réponses lentes, leads non qualifiés, données dispersées.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100} direction="right">
                <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-8 dark:border-white/[0.06] dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02]">
                  <p className="text-sm font-medium">Après</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    IA qui répond 24/7, leads qualifiés automatiquement, emails rédigés, données centralisées.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>

            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <ScrollReveal key={f.q} delay={i * 80}>
                  <details className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-fuchsia-50 via-purple-50/60 to-pink-50/30 p-10 text-center shadow-sm dark:border-fuchsia-500/20 dark:from-fuchsia-950/40 dark:via-purple-950/30 dark:to-pink-950/20 dark:shadow-lg dark:shadow-fuchsia-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/10 blur-2xl dark:bg-pink-500/10"
              />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl tracking-tight">Prêt à intégrer l&apos;IA ?</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Audit gratuit → cas d&apos;usage prioritaires → mise en place → formation. On vous accompagne.
                </p>
                <Link
                  href="/contact?service=integration-ia"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-fuchsia-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:bg-fuchsia-700"
                >
                  Réserver l&apos;audit
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Cross-linking */}
        <ScrollReveal delay={80}>
          <section className="mt-12 text-sm text-muted-foreground">
            <p>
              À combiner avec :{" "}
              <Link className="underline hover:opacity-80" href="/services/automatiser-relances">
                Automatisation (RPA)
              </Link>
              {" "}et{" "}
              <Link className="underline hover:opacity-80" href="/services/trouver-prospects">
                Prospection IA
              </Link>
              {" "}pour un système complet.
            </p>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
