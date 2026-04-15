"use client";

import { useState } from "react";
import Link from "next/link";

export type CaseStudy = {
  slug: string;
  org: string;
  sector: string;
  size: string;
  location: string;
  service: string;
  serviceLabel: string;
  title: string;
  context: string;
  delivered: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  isPME: boolean;
};

const SERVICE_COLORS: Record<string, string> = {
  "site-web": "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-400",
  "automatisation": "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-400",
  "integration-ia": "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800/40 dark:bg-fuchsia-950/30 dark:text-fuchsia-400",
  "digital-workplace": "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800/40 dark:bg-cyan-950/30 dark:text-cyan-400",
  "pack-scale": "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/40 dark:bg-violet-950/30 dark:text-violet-400",
};

function getBadgeClass(service: string) {
  return SERVICE_COLORS[service] ?? SERVICE_COLORS["pack-scale"];
}

export function CasesList({ cases }: { cases: CaseStudy[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const pme = cases.filter((c) => c.isPME);
  const grands = cases.filter((c) => !c.isPME);

  const services = Array.from(new Map(pme.map((c) => [c.service, c.serviceLabel])));
  const filteredPME = filter ? pme.filter((c) => c.service === filter) : pme;

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mt-14 mb-8">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
            filter === null
              ? "border-violet-300 bg-violet-100 text-violet-700 dark:border-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
              : "border-border bg-background text-muted-foreground hover:bg-muted dark:border-white/[0.08]"
          }`}
        >
          Tous ({pme.length})
        </button>
        {services.map(([slug, label]) => (
          <button
            key={slug}
            onClick={() => setFilter(slug === filter ? null : slug)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              filter === slug
                ? getBadgeClass(slug)
                : "border-border bg-background text-muted-foreground hover:bg-muted dark:border-white/[0.08]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* PME */}
      <section aria-label="PME accompagnées">
        <h2 className="font-display font-bold text-2xl tracking-tight mb-6">PME accompagnées</h2>
        <p className="text-xs text-muted-foreground mb-6 italic">
          Noms anonymisés à la demande de nos clients. Les chiffres sont réels et vérifiables sur demande.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredPME.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
      </section>

      {/* Grands comptes */}
      <section className="mt-20" aria-label="Grands comptes">
        <h2 className="font-display font-bold text-2xl tracking-tight mb-6">Grands comptes & institutions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {grands.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
      </section>
    </>
  );
}

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <article
      id={c.slug}
      className="flex flex-col rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getBadgeClass(c.service)}`}>
          {c.serviceLabel}
        </span>
        {!c.isPME && (
          <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
            Grand compte
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {c.org} — {c.size} — {c.location}
      </p>

      <h3 className="mt-2 font-display font-bold text-lg tracking-tight leading-snug">{c.title}</h3>

      {/* Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {c.metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border bg-muted/60 p-3 text-center dark:border-white/[0.06] dark:bg-white/[0.03]">
            <div className="text-xl font-bold font-mono tracking-tight">{m.value}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground uppercase tracking-wide">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Expandable details */}
      <details className="mt-4 group">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
          Voir le détail
          <span className="transition-transform duration-200 group-open:rotate-90">&rsaquo;</span>
        </summary>

        <div className="mt-4 space-y-4 text-sm">
          <p className="text-muted-foreground">{c.context}</p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2">Livré</p>
            <ul className="space-y-1.5">
              {c.delivered.map((d) => (
                <li key={d} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2">Résultats</p>
            <ul className="space-y-1.5">
              {c.results.map((r) => (
                <li key={r} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {c.stack.map((t) => (
              <span key={t} className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </details>

      {/* Mini CTA */}
      <div className="mt-auto pt-4">
        <Link
          href="/contact"
          className="inline-flex items-center text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Un projet similaire ? &rarr;
        </Link>
      </div>
    </article>
  );
}
