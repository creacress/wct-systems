import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";
import Breadcrumbs from "@/components/site/breadcrumbs";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  const params: { service: string; secteur: string }[] = [];
  for (const service of SERVICES_SOLUTIONS) {
    for (const secteur of SECTEURS) {
      params.push({ service: service.slug, secteur: secteur.slug });
    }
  }
  return params;
}

function findData(serviceSlug: string, secteurSlug: string) {
  const service = SERVICES_SOLUTIONS.find((s) => s.slug === serviceSlug);
  const secteur = SECTEURS.find((s) => s.slug === secteurSlug);
  if (!service || !secteur) return null;
  const solution = secteur.solutions[service.slug as keyof typeof secteur.solutions];
  if (!solution) return null;
  return { service, secteur, solution };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; secteur: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, secteur: secteurSlug } = await params;
  const data = findData(serviceSlug, secteurSlug);
  if (!data) return {};

  const { service, secteur } = data;
  const title = `${service.name} pour ${secteur.name} — WCT Systems`;
  const description = `${service.name} adaptée aux ${secteur.name.toLowerCase()} : ${data.solution} À partir de ${service.price}€/mois.`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${secteur.name.toLowerCase()}`,
      `${secteur.name.toLowerCase()} automatisation`,
      `${secteur.name.toLowerCase()} IA`,
    ],
    alternates: { canonical: `/solutions/${serviceSlug}/pour/${secteurSlug}` },
  };
}

export default async function SolutionSecteurPage({
  params,
}: {
  params: Promise<{ service: string; secteur: string }>;
}) {
  const { service: serviceSlug, secteur: secteurSlug } = await params;
  const data = findData(serviceSlug, secteurSlug);
  if (!data) notFound();

  const { service, secteur, solution } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
          { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/solutions/${serviceSlug}/pour/${secteurSlug}` },
        ],
      },
      {
        "@type": "Service",
        name: `${service.name} pour ${secteur.name}`,
        description: solution,
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        areaServed: { "@type": "Country", name: "France" },
        offers: {
          "@type": "Offer",
          price: service.price,
          priceCurrency: "EUR",
          priceSpecification: { "@type": "UnitPriceSpecification", price: service.price, priceCurrency: "EUR", unitText: "MONTH" },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: secteur.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const otherServices = SERVICES_SOLUTIONS.filter((s) => s.slug !== serviceSlug);

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/30 via-background to-background dark:from-violet-950/10" />
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.05)" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: service.name },
          { label: `Pour ${secteur.name}` },
        ]} />

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-400">
              {service.name} &bull; {secteur.name}
            </div>

            <h1 className="font-display font-bold text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {service.name}
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                pour {secteur.name.toLowerCase()}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">{solution}</p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Audit gratuit &mdash; 15 min
              </Link>
              <Link
                href={service.serviceHref}
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Détail du service &rarr;
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* PROBLÈME */}
        <ScrollReveal direction="up" delay={60}>
          <section className="mt-16 rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
            <h2 className="font-display font-bold text-xl tracking-tight mb-4">
              Le défi des {secteur.name.toLowerCase()}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{secteur.problemType}.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Ces problèmes sont courants dans votre secteur. La bonne nouvelle : ils se résolvent avec les bons outils, sans projet complexe.
            </p>
          </section>
        </ScrollReveal>

        {/* SOLUTION */}
        <ScrollReveal direction="up" delay={80}>
          <section className="mt-12">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              Comment {service.name.toLowerCase()} s&apos;adapte à votre secteur
            </h2>
            <div className="rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="text-muted-foreground leading-relaxed">{solution}</p>
              <div className="mt-6 flex items-center gap-4 text-sm">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  À partir de {service.price}€ HT/mois
                </span>
                <span className="text-muted-foreground">Mise en place incluse</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-12 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-8 dark:border-violet-900/20 dark:from-violet-950/20 dark:to-indigo-950/10">
            <h2 className="font-display font-bold text-xl tracking-tight mb-4">
              ROI estimé pour {secteur.name.toLowerCase()}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">3x</div>
                <div className="mt-1 text-sm text-muted-foreground">plus de leads qualifiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">10h</div>
                <div className="mt-1 text-sm text-muted-foreground">gagnées par semaine</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">2 mois</div>
                <div className="mt-1 text-sm text-muted-foreground">pour le retour sur investissement</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={120}>
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              Questions fréquentes
            </h2>
            <div className="space-y-3">
              {secteur.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-sm">
                    {f.q}
                    <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* AUTRES SERVICES */}
        <ScrollReveal direction="up" delay={140}>
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              Autres solutions pour {secteur.name.toLowerCase()}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}/pour/${secteurSlug}`}
                  className="group rounded-3xl border bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-violet-200/80 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-800/30"
                >
                  <h3 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{s.description}</p>
                  <span className="mt-3 inline-block text-xs font-medium text-violet-600 dark:text-violet-400">
                    Dès {s.price}€/mois &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA FINAL */}
        <ScrollReveal direction="up" delay={160}>
          <section className="mt-16 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-10 text-center dark:border-violet-900/20 dark:from-violet-950/25 dark:to-indigo-950/15">
            <h2 className="font-display font-bold text-2xl tracking-tight">
              Prêt à transformer votre activité ?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Audit gratuit de 15 min pour {secteur.name.toLowerCase()}. On analyse votre situation et on propose un plan concret.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l&apos;audit gratuit
            </Link>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
