import ScrollReveal from "@/components/ui/scroll-reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
  initials: string;
  accent: "violet" | "cyan" | "amber" | "fuchsia";
  service: string;
};

// Curated testimonials based on anonymized cases from /cas-clients.
// Keep quotes realistic, specific, and measurable — avoid generic praise.
const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "On avait 5 outils SaaS différents pour 25 personnes. En 3 semaines, WCT Systems a tout migré dans leur Digital Workplace. L'adoption est à 92 % et on économise 800 €/mois. Le système de XP a vraiment fait la différence sur l'engagement.",
    name: "M. Durand",
    role: "CEO",
    org: "ESN full remote, 25 salariés",
    initials: "MD",
    accent: "violet",
    service: "Digital Workplace",
  },
  {
    quote:
      "Le chatbot IA traite 70 % des questions clients pendant qu'on dort. Installation en 10 jours, formation comprise. Notre SAV s'est allégé sans perdre en qualité.",
    name: "S. Bernard",
    role: "Fondatrice",
    org: "E-commerce cosmétiques (Nantes)",
    initials: "SB",
    accent: "fuchsia",
    service: "Intégration IA",
  },
  {
    quote:
      "L'automatisation des relances + la facturation a libéré 40 h/mois. On a redéployé ce temps sur le conseil client. ROI en 2 mois.",
    name: "J. Moreau",
    role: "Associé",
    org: "Cabinet comptable (10 collab.)",
    initials: "JM",
    accent: "amber",
    service: "Automatisation RPA",
  },
  {
    quote:
      "Site livré en 14 jours. PageSpeed à 98, et on reçoit 15 devis par mois sans publicité. Le SEO + IA marche vraiment.",
    name: "F. Laurent",
    role: "Dirigeant",
    org: "Artisan plombier (4 salariés, Lyon)",
    initials: "FL",
    accent: "cyan",
    service: "Site Web Moderne",
  },
];

const accentClasses: Record<Testimonial["accent"], { bg: string; text: string; ring: string }> = {
  violet: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300", ring: "ring-violet-200/60 dark:ring-violet-800/50" },
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-700 dark:text-cyan-300", ring: "ring-cyan-200/60 dark:ring-cyan-800/50" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", ring: "ring-amber-200/60 dark:ring-amber-800/50" },
  fuchsia: { bg: "bg-fuchsia-100 dark:bg-fuchsia-900/40", text: "text-fuchsia-700 dark:text-fuchsia-300", ring: "ring-fuchsia-200/60 dark:ring-fuchsia-800/50" },
};

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 8c-4.4 0-8 3.6-8 8v8h8v-8H6c0-2.2 1.8-4 4-4V8zm16 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
    </svg>
  );
}

function Avatar({ initials, accent }: { initials: string; accent: Testimonial["accent"] }) {
  const styles = accentClasses[accent];
  return (
    <span
      aria-hidden
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ring-2 ring-offset-2 ring-offset-[var(--surface)] ${styles.bg} ${styles.text} ${styles.ring}`}
    >
      {initials}
    </span>
  );
}

export function TestimonialsBento() {
  const [flagship, ...rest] = TESTIMONIALS;
  const flagshipAccent = accentClasses[flagship.accent];

  return (
    <section className="mt-20 sm:mt-28" aria-label="Témoignages clients">
      <ScrollReveal>
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Ils nous font confiance
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
            Des PME qui{" "}
            <span className="font-serif-display italic">transforment</span>{" "}
            leur façon de travailler
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cas anonymisés, chiffres réels. Secteurs & tailles représentatifs.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {/* Flagship — 2×2 on lg */}
        <ScrollReveal className="lg:col-span-2 lg:row-span-2">
          <article className="bento-card surface-noise flex h-full flex-col gap-6 p-6 sm:p-8" data-speakable>
            <QuoteMark className={`h-8 w-8 ${flagshipAccent.text}`} />
            <blockquote className="flex flex-1 flex-col gap-6">
              <p className="font-display text-lg leading-[1.5] tracking-[-0.01em] text-foreground sm:text-xl">
                « {flagship.quote} »
              </p>
              <footer className="flex items-center gap-4">
                <Avatar initials={flagship.initials} accent={flagship.accent} />
                <div>
                  <cite className="block not-italic">
                    <span className="text-sm font-medium text-foreground">
                      {flagship.name}
                    </span>
                    <span className="text-sm text-muted-foreground"> · {flagship.role}</span>
                  </cite>
                  <span className="text-xs text-muted-foreground">{flagship.org}</span>
                </div>
              </footer>
            </blockquote>
            <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${flagshipAccent.bg} ${flagshipAccent.text}`}>
              {flagship.service}
            </span>
          </article>
        </ScrollReveal>

        {/* Smaller testimonials */}
        {rest.map((t, i) => {
          const styles = accentClasses[t.accent];
          return (
            <ScrollReveal key={t.name + t.org} delay={i * 60}>
              <article className="bento-card flex h-full flex-col gap-4 p-5 sm:p-6" data-speakable>
                <QuoteMark className={`h-6 w-6 ${styles.text}`} />
                <blockquote className="flex flex-1 flex-col gap-4">
                  <p className="text-sm leading-relaxed text-foreground sm:text-base">
                    « {t.quote} »
                  </p>
                  <footer className="flex items-center gap-3">
                    <Avatar initials={t.initials} accent={t.accent} />
                    <div className="min-w-0">
                      <cite className="block text-sm font-medium not-italic text-foreground">
                        {t.name}
                      </cite>
                      <span className="block truncate text-xs text-muted-foreground">
                        {t.role} · {t.org}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
