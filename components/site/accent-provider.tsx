/**
 * Accent color tokens for service pages.
 * Each service has a unique color identity.
 */

export type AccentTheme = "violet" | "emerald" | "sky" | "amber" | "fuchsia" | "cyan";

export interface AccentTokens {
  gradient: string;
  badge: string;
  glow: string;
  cardHover: string;
  ctaSecondary: string;
}

const ACCENT_TOKENS: Record<AccentTheme, AccentTokens> = {
  violet: {
    gradient: "from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400",
    badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-300",
    glow: "rgba(139, 92, 246, 0.06)",
    cardHover: "hover:border-violet-200/80 dark:hover:border-violet-800/30",
    ctaSecondary: "text-violet-600 dark:text-violet-400",
  },
  emerald: {
    gradient: "from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-300",
    glow: "rgba(16, 185, 129, 0.06)",
    cardHover: "hover:border-emerald-200/80 dark:hover:border-emerald-500/20",
    ctaSecondary: "text-emerald-600 dark:text-emerald-400",
  },
  sky: {
    gradient: "from-sky-600 via-blue-500 to-indigo-500 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400",
    badge: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/50 dark:bg-sky-950/30 dark:text-sky-300",
    glow: "rgba(14, 165, 233, 0.06)",
    cardHover: "hover:border-sky-200/80 dark:hover:border-sky-800/30",
    ctaSecondary: "text-sky-600 dark:text-sky-400",
  },
  amber: {
    gradient: "from-amber-600 via-orange-500 to-yellow-500 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400",
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-300",
    glow: "rgba(245, 158, 11, 0.06)",
    cardHover: "hover:border-amber-200/80 dark:hover:border-amber-800/30",
    ctaSecondary: "text-amber-600 dark:text-amber-400",
  },
  fuchsia: {
    gradient: "from-fuchsia-600 via-pink-500 to-rose-500 dark:from-fuchsia-400 dark:via-pink-400 dark:to-rose-400",
    badge: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800/50 dark:bg-fuchsia-950/30 dark:text-fuchsia-300",
    glow: "rgba(217, 70, 239, 0.06)",
    cardHover: "hover:border-fuchsia-200/80 dark:hover:border-fuchsia-800/30",
    ctaSecondary: "text-fuchsia-600 dark:text-fuchsia-400",
  },
  cyan: {
    gradient: "from-cyan-500 via-teal-400 to-lime-400 dark:from-cyan-400 dark:via-teal-300 dark:to-lime-300",
    badge: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800/50 dark:bg-cyan-950/30 dark:text-cyan-300",
    glow: "rgba(6, 182, 212, 0.06)",
    cardHover: "hover:border-cyan-200/80 dark:hover:border-cyan-800/30",
    ctaSecondary: "text-cyan-600 dark:text-cyan-400",
  },
};

export function getAccent(theme: AccentTheme): AccentTokens {
  return ACCENT_TOKENS[theme];
}
