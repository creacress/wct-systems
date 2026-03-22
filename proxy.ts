/**
 * Proxy Next.js 16 — remplace middleware.ts
 * Combine next-intl (i18n routing) + NextAuth v5 (JWT cookie)
 */
import createIntlMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // /prospects et /admin → protégés, redirige vers /connexion si non authentifié
  if (
    !req.auth &&
    (pathname.startsWith("/prospects") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/connexion", req.url));
  }

  // /connexion → si déjà connecté, redirige vers /prospects
  if (req.auth && pathname === "/connexion") {
    return NextResponse.redirect(new URL("/prospects", req.url));
  }

  // Routes protégées authentifiées → pas de i18n
  if (
    pathname.startsWith("/prospects") ||
    pathname.startsWith("/admin") ||
    pathname === "/connexion"
  ) {
    return NextResponse.next();
  }

  // Geo-detection: redirect Portuguese visitors to /pt
  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry");
  const hasLocaleCookie = req.cookies.get("NEXT_LOCALE");

  if (
    country === "PT" &&
    !hasLocaleCookie &&
    !pathname.startsWith("/pt")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = `/pt${pathname}`;
    return NextResponse.redirect(url, 302);
  }

  // Toutes les autres routes → i18n middleware
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
