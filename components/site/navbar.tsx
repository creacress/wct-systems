"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/cas-clients", label: "Cas clients" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "A propos" },
] as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const ctaHref = "/contact";
  const ctaLabel = "Audit gratuit";

  const items = useMemo(() => NAV_ITEMS, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 dark:border-white/[0.06] dark:bg-background/90">
      {/* Skip link (a11y) */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-semibold tracking-tight"
          aria-label="Aller à l'accueil"
        >
          <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-background shadow-sm">
            <Image
              src="/images/logo-wct-systems.png"
              alt="WCT Systems"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-foreground/10" />
          </span>
          <span className="text-base">
            WCT <span className="text-muted-foreground">Systems</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Navigation principale">
          {items.map((it) => {
            const active = pathname === it.href || pathname?.startsWith(`${it.href}/`);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "relative rounded-xl px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/30",
                  active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                aria-current={active ? "page" : undefined}
              >
                {it.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-violet-600"
                  />
                ) : null}
              </Link>
            );
          })}

          <Link
            href="/connexion"
            className={cn(
              "ml-1 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/30",
              pathname === "/connexion"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Connexion
          </Link>

          <Link
            href={ctaHref}
            className="ml-2 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          >
            {ctaLabel}
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl border bg-background p-2 shadow-sm transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 md:hidden dark:border-white/[0.12] dark:bg-white/[0.05]"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay + drawer */}
      <div className={cn("md:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        <div
          id="mobile-nav"
          className={cn(
            "fixed right-0 top-0 z-50 h-dvh w-[86vw] max-w-sm border-l bg-background shadow-2xl transition-transform dark:border-white/[0.06] dark:bg-[#0c0c0f]",
            open ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile"
        >
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="inline-flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background shadow-sm">
  <Image
    src="/images/logo-wct-systems.png"
    alt="WCT Systems"
    width={36}
    height={36}
    className="h-9 w-9 rounded-full object-cover"
  />
</span>
              <p className="text-sm font-medium">Navigation</p>
            </div>

            <button
              type="button"
              className="rounded-2xl border bg-background p-2 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-5">
            <div className="grid gap-2">
              {items.map((it) => {
                const active = pathname === it.href || pathname?.startsWith(`${it.href}/`);
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/30",
                      active ? "bg-violet-600 text-white" : "bg-background hover:bg-muted"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {it.label}
                  </Link>
                );
              })}

              <Link
                href="/connexion"
                className={cn(
                  "mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-violet-500/30",
                  pathname === "/connexion" ? "bg-violet-600 text-white" : "bg-background hover:bg-muted"
                )}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Espace client
              </Link>

              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                {ctaLabel}
              </Link>
            </div>

            <div className="mt-6 rounded-3xl border bg-muted p-4 text-sm dark:border-violet-500/10 dark:bg-violet-500/[0.06]">
              <p className="font-medium">Audit express</p>
              <p className="mt-1 text-muted-foreground">
                15 minutes. 3 automatisations prioritaires. Un plan clair.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}