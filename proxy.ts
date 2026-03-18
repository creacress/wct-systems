/**
 * Proxy Next.js 16 — remplace middleware.ts
 * Protection des routes /prospects via NextAuth v5 (JWT cookie)
 */
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl

  // /prospects et /admin → protégés, redirige vers /connexion si non authentifié
  if (!req.auth && (pathname.startsWith('/prospects') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/connexion', req.url))
  }

  // /connexion → si déjà connecté, redirige vers /prospects
  if (req.auth && pathname === '/connexion') {
    return NextResponse.redirect(new URL('/prospects', req.url))
  }
})

export const config = {
  matcher: ['/prospects/:path*', '/admin/:path*', '/connexion'],
}
