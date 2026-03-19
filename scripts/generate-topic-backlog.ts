#!/usr/bin/env npx tsx

/**
 * scripts/generate-topic-backlog.ts
 *
 * Génère un backlog de 30 sujets de blog, répartis par service.
 * Usage : npx tsx scripts/generate-topic-backlog.ts
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function getExistingTitles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const content = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
      const match = content.match(/^title:\s*"(.+)"/m);
      return match?.[1] ?? "";
    })
    .filter(Boolean);
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY manquante");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const existing = getExistingTitles();

  console.log(`📚 Articles existants : ${existing.length}`);
  console.log("🤖 Génération du backlog...");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Génère 30 sujets d'articles de blog pour WCT Systems (webcresson.com), une entreprise française qui propose 6 SaaS pour PME :
1. Prospection IA
2. Site Web Moderne
3. Automatisation RPA
4. Intégration IA
5. Digital Workplace
6. Q2C Facturation SaaS

Chaque sujet doit :
- Cibler une requête longue traîne spécifique (pas des requêtes génériques)
- Être utile pour un dirigeant de PME française
- Être DIFFÉRENT des articles existants : ${existing.join(", ")}

Format pour chaque sujet :
[NUMÉRO]. [SERVICE] — "[TITRE]" → requête ciblée : "[requête Google]"

Répartis équitablement : 6 sujets par service.`,
      },
    ],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  const outputPath = path.join(process.cwd(), "scripts/topic-backlog.md");
  fs.writeFileSync(
    outputPath,
    `# Blog Topic Backlog\n\nGénéré le ${new Date().toISOString().split("T")[0]}\n\n## Articles existants (${existing.length})\n${existing.map((t) => `- ${t}`).join("\n")}\n\n## Nouveaux sujets proposés\n\n${text}\n`,
    "utf-8"
  );

  console.log(`✅ Backlog généré : ${outputPath}`);
  console.log(text);
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
