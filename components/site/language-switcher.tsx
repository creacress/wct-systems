"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    // Set cookie to remember choice (1 year)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: newLocale as (typeof routing.locales)[number] });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="inline-flex items-center">
          {i > 0 && <span className="text-gray-500 mx-0.5">|</span>}
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={cn(
              "rounded px-1.5 py-0.5 font-medium uppercase transition-colors",
              locale === loc
                ? "bg-violet-600 text-white"
                : "text-gray-400 hover:text-white"
            )}
            aria-label={loc === "fr" ? "Français" : "Português"}
            aria-current={locale === loc ? "true" : undefined}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
