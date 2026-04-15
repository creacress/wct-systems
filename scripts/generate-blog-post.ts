#!/usr/bin/env npx tsx

/**
 * scripts/generate-blog-post.ts
 *
 * Génère automatiquement un article de blog MDX via l'API Claude.
 * Usage : npx tsx scripts/generate-blog-post.ts
 * Cron : 0 8 * * 1,4  (lundi + jeudi à 8h)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const MODEL = "claude-sonnet-4-20250514";

// ── Services et pages du site ──────────────────────────────────────────

const SERVICES = [
  {
    slug: "site-web",
    name: "Site Web Moderne",
    href: "/services/site-web-moderne",
    contactParam: "site-web",
    tags: ["Site Web", "SEO", "Conversion"],
  },
  {
    slug: "automatisation",
    name: "Automatisation RPA",
    href: "/services/automatiser-relances",
    contactParam: "automatisation",
    tags: ["Automatisation", "n8n", "Workflows"],
  },
  {
    slug: "integration-ia",
    name: "Intégration IA",
    href: "/services/integration-ia",
    contactParam: "integration-ia",
    tags: ["IA", "Chatbot", "RAG"],
  },
  {
    slug: "digital-workplace",
    name: "Digital Workplace",
    href: "/services/digital-workplace",
    contactParam: "digital-workplace",
    tags: ["Digital Workplace", "Collaboration", "Remote"],
  },
];

const INTERNAL_PAGES = [
  "/comparatifs/zapier-vs-n8n",
  "/comparatifs/wordpress-vs-nextjs-site-pme",
  "/comparatifs/chatbot-ia-vs-faq-statique",
  "/comparatifs/make-vs-n8n",
  "/cas-clients",
  "/tarifs",
  "/solutions",
];

// ── Récupérer les articles existants ───────────────────────────────────

function getExistingArticles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const content = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
      const titleMatch = content.match(/^title:\s*"(.+)"/m);
      return titleMatch?.[1] ?? f;
    });
}

function getExistingSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

// ── Choisir le service le moins couvert ────────────────────────────────

function getLeastCoveredService(): (typeof SERVICES)[number] {
  const existing = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).map((f) => {
        const content = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
        const serviceMatch = content.match(/^service:\s*"(.+)"/m);
        return serviceMatch?.[1] ?? "";
      })
    : [];

  const counts = SERVICES.map((s) => ({
    service: s,
    count: existing.filter((e) => e === s.slug).length,
  }));

  counts.sort((a, b) => a.count - b.count);

  // Parmi les moins couverts, en choisir un au hasard
  const minCount = counts[0].count;
  const leastCovered = counts.filter((c) => c.count === minCount);
  return leastCovered[Math.floor(Math.random() * leastCovered.length)].service;
}

// ── Générer le slug à partir du titre ──────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ── Prompt système ─────────────────────────────────────────────────────

function buildSystemPrompt(
  service: (typeof SERVICES)[number],
  existingTitles: string[]
): string {
  return `Tu es un rédacteur SEO expert pour le blog de WCT Systems (webcresson.com).
WCT Systems est une entreprise française qui propose 5 solutions pour PME : Digital Workplace, Site Web Moderne, Automatisation RPA, Intégration IA, Nixie Pulse.

Tu dois écrire un article de blog en français pour le service "${service.name}".

RÈGLES DE RÉDACTION :
- Ton : direct, concret, orienté résultats. Tu parles à un dirigeant de PME qui n'a pas le temps.
- Longueur : 800-1200 mots
- Structure : titre H1 (dans le frontmatter), puis H2 pour chaque section, H3 si nécessaire
- Pas de H1 dans le corps de l'article (le H1 est le title du frontmatter)
- Pas de jargon inutile, pas de phrases creuses
- Des exemples concrets, des chiffres quand possible
- Markdown standard uniquement (pas de composants React, pas de JSX)

MAILLAGE INTERNE OBLIGATOIRE :
- Inclure 2-3 liens internes vers des pages du site :
  - La page du service : ${service.href}
  - Au moins 1 lien parmi : ${INTERNAL_PAGES.join(", ")}
  - Format markdown : [texte du lien](url)

CTA FINAL :
- Terminer par un séparateur --- puis un paragraphe en gras avec un lien vers /contact?service=${service.contactParam}
- Format : **Vous voulez [bénéfice] ?** [Réservez un audit gratuit →](/contact?service=${service.contactParam})

FORMAT DE SORTIE — TRÈS IMPORTANT :
Tu dois répondre avec UNIQUEMENT le fichier MDX complet, sans aucun texte avant ou après.
Le fichier commence par --- et se termine par le dernier paragraphe de l'article.

Le frontmatter DOIT avoir exactement ces champs :
---
title: "Titre de l'article orienté requête SEO"
description: "Description meta de 150-160 caractères ciblant une requête longue traîne"
date: "${new Date().toISOString().split("T")[0]}"
tags: ${JSON.stringify(service.tags.slice(0, 2).concat(["PME"]))}
author: "WCT Systems"
service: "${service.slug}"
---

ARTICLES EXISTANTS (ne pas dupliquer ces sujets) :
${existingTitles.map((t) => `- ${t}`).join("\n")}

IMPORTANT : Le sujet doit être DIFFÉRENT de tous les articles existants. Cible une requête longue traîne spécifique et utile pour une PME française.`;
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY manquante");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // 1. Choisir le service le moins couvert
  const service = getLeastCoveredService();
  console.log(`📝 Service sélectionné : ${service.name}`);

  // 2. Récupérer les articles existants
  const existingTitles = getExistingArticles();
  const existingSlugs = getExistingSlugs();
  console.log(`📚 Articles existants : ${existingTitles.length}`);

  // 3. Générer l'article
  console.log("🤖 Génération en cours...");
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content:
          "Écris un nouvel article de blog MDX. Réponds UNIQUEMENT avec le fichier MDX complet (frontmatter + contenu), rien d'autre.",
      },
    ],
    system: buildSystemPrompt(service, existingTitles),
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  // 4. Nettoyer le MDX (enlever les backticks markdown si présents)
  let mdx = text.trim();
  if (mdx.startsWith("```")) {
    mdx = mdx
      .replace(/^```\w*\n?/, "")
      .replace(/\n?```$/, "")
      .trim();
  }

  // Vérifier que le frontmatter est présent
  if (!mdx.startsWith("---")) {
    console.error("❌ Le MDX généré ne commence pas par le frontmatter ---");
    process.exit(1);
  }

  // 5. Extraire le titre pour le slug
  const titleMatch = mdx.match(/^title:\s*"(.+)"/m);
  if (!titleMatch) {
    console.error("❌ Pas de titre trouvé dans le frontmatter");
    process.exit(1);
  }

  let slug = slugify(titleMatch[1]);

  // Vérifier que le slug n'existe pas déjà
  if (existingSlugs.includes(slug)) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  // 6. Sauvegarder
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdx + "\n", "utf-8");
  console.log(`✅ Article créé : ${filePath}`);
  console.log(`📄 Titre : ${titleMatch[1]}`);
  console.log(`🏷️  Service : ${service.name}`);
  console.log(`🔗 URL : /blog/${slug}`);

  return { slug, title: titleMatch[1], service: service.name, filePath };
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
