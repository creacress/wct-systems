import Link from "next/link";

const ALL_SERVICES = [
  {
    id: "trouver-prospects",
    title: "Prospection IA",
    desc: "Ciblage IA, enrichissement automatique, scoring, intégration CRM.",
    href: "/services/trouver-prospects",
    color: "emerald",
  },
  {
    id: "site-web-moderne",
    title: "Site Web Moderne",
    desc: "Site rapide, SEO + SEO IA, mobile-first, templates sectoriels.",
    href: "/services/site-web-moderne",
    color: "sky",
  },
  {
    id: "automatiser-relances",
    title: "Automatisation RPA",
    desc: "Relances, CRM, reporting, facturation. 200+ intégrations.",
    href: "/services/automatiser-relances",
    color: "amber",
  },
  {
    id: "integration-ia",
    title: "Intégration IA",
    desc: "Chatbot, agents IA métier, RAG sur vos données.",
    href: "/services/integration-ia",
    color: "fuchsia",
  },
  {
    id: "digital-workplace",
    title: "Digital Workplace",
    desc: "Bureau virtuel gamifié, messagerie, KPI, intégration 200+ outils.",
    href: "/services/digital-workplace",
    color: "cyan",
  },
];

const COLOR_CLASSES: Record<string, string> = {
  emerald: "border-emerald-200/60 hover:border-emerald-300/80 dark:border-emerald-900/30 dark:hover:border-emerald-800/50",
  sky: "border-sky-200/60 hover:border-sky-300/80 dark:border-sky-900/30 dark:hover:border-sky-800/50",
  amber: "border-amber-200/60 hover:border-amber-300/80 dark:border-amber-900/30 dark:hover:border-amber-800/50",
  fuchsia: "border-fuchsia-200/60 hover:border-fuchsia-300/80 dark:border-fuchsia-900/30 dark:hover:border-fuchsia-800/50",
  cyan: "border-cyan-200/60 hover:border-cyan-300/80 dark:border-cyan-900/30 dark:hover:border-cyan-800/50",
};

interface RelatedServicesProps {
  currentService: string;
}

export default function RelatedServices({ currentService }: RelatedServicesProps) {
  const others = ALL_SERVICES.filter((s) => s.id !== currentService).slice(0, 3);

  return (
    <section aria-label="Autres services" className="mt-20">
      <h2 className="font-display font-bold text-2xl tracking-tight mb-6">
        Autres services pour PME
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {others.map((service) => (
          <Link key={service.id} href={service.href} className="group block">
            <div
              className={`h-full rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/[0.04] ${COLOR_CLASSES[service.color] ?? ""}`}
            >
              <h3 className="font-bold tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
              <span className="mt-4 inline-block text-xs font-medium text-violet-600 dark:text-violet-400 group-hover:underline">
                En savoir plus &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
