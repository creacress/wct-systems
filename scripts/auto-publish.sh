#!/bin/bash
set -e

# ── Config ──────────────────────────────────────────────────────────────
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

LOG_FILE="$REPO_DIR/logs/blog-auto-$(date +%Y%m%d-%H%M%S).log"
mkdir -p "$REPO_DIR/logs"

echo "$(date) — Début génération article" | tee -a "$LOG_FILE"

# ── 1. Pull les dernières modifications ─────────────────────────────────
git pull --rebase origin main 2>&1 | tee -a "$LOG_FILE"

# ── 2. Générer l'article ───────────────────────────────────────────────
npx tsx scripts/generate-blog-post.ts 2>&1 | tee -a "$LOG_FILE"

# ── 3. Vérifier qu'un nouveau fichier a été créé ───────────────────────
NEW_FILES=$(git status --porcelain content/blog/ | grep "^??" | wc -l)
if [ "$NEW_FILES" -eq 0 ]; then
  echo "$(date) — Aucun nouveau fichier, arrêt" | tee -a "$LOG_FILE"
  exit 0
fi

# ── 4. Build test ──────────────────────────────────────────────────────
echo "$(date) — Test build..." | tee -a "$LOG_FILE"
if ! npm run build 2>&1 | tee -a "$LOG_FILE"; then
  echo "$(date) — ❌ Build échoué, rollback" | tee -a "$LOG_FILE"
  git checkout content/blog/
  exit 1
fi

# ── 5. Commit et push ─────────────────────────────────────────────────
ARTICLE_NAME=$(git status --porcelain content/blog/ | grep "^??" | head -1 | awk '{print $2}')
git add content/blog/
git commit -m "blog: auto-publish $(basename "$ARTICLE_NAME" .mdx)" 2>&1 | tee -a "$LOG_FILE"
git push origin main 2>&1 | tee -a "$LOG_FILE"

echo "$(date) — ✅ Article publié et déployé" | tee -a "$LOG_FILE"
