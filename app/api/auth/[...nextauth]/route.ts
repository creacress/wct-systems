/**
 * Handler NextAuth v5 — gère GET /api/auth/* et POST /api/auth/*
 * (signin, signout, callback, session, csrf…)
 */
import { handlers } from '@/auth'

export const { GET, POST } = handlers
