import { getAllPosts } from "@/lib/blog";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";
import { COMPARATIFS } from "@/lib/comparatifs-data";
import frSolutions from "@/messages/fr/solutions.json";
import frComparatifs from "@/messages/fr/comparatifs.json";
import ptSolutions from "@/messages/pt/solutions.json";
import ptComparatifs from "@/messages/pt/comparatifs.json";

type Params = { locale: string };

function generateFrench(): string {
  const posts = getAllPosts();

  const blogSection = posts
    .map((p) => `  - /blog/${p.slug} — ${p.title} (${p.readingTime})`)
    .join("\n");

  const solutionsSection = SECTEURS.map(
    (s) =>
      `  - ${(frSolutions.secteurs as Record<string, { name: string }>)[s.slug]?.name ?? s.slug}: ${SERVICES_SOLUTIONS.map((svc) => `/solutions/${svc.slug}/pour/${s.slug}`).join(", ")}`
  ).join("\n");

  return `# llms.txt
site: https://wct-systems.fr
brand: WCT Systems
purpose: Présenter clairement l'offre, les preuves et les contenus.

## Pages prioritaires
- /services — Vue d'ensemble des 5 solutions pour PME
- /services/digital-workplace — Bureau virtuel gamifié tout-en-un (199€/mois)
- /services/site-web-moderne — Création site web PME : SEO classique + SEO IA, 12 templates sectoriels, livré en 14 jours (99€/mois)
- /services/automatiser-relances — Automatisation RPA : relances, CRM, facturation, reporting, 200+ intégrations (149€/mois)
- /services/integration-ia — Intégration IA : chatbot, agents métier, RAG, formation incluse (199€/mois)
- /services/nixie-pulse — Nixie Pulse : dashboard KPI physique connecté avec tubes Nixie IN-14 soviétiques, données temps réel (à partir de 990€)
- /tarifs — Tous les prix, packs et options de paiement
- /contact — Formulaire d'audit gratuit (réponse 24-48h)
- /solutions — Solutions adaptées par secteur d'activité
- /blog — Articles pratiques sur l'IA, l'automatisation et la prospection B2B

## Résumé
WCT Systems aide les PME françaises à gagner du temps et des clients grâce à 5 solutions complémentaires : Digital Workplace gamifié, Site Web Moderne, Automatisation RPA, Intégration IA et Nixie Pulse (dashboard KPI physique connecté avec tubes Nixie soviétiques). SaaS à partir de 99€ HT/mois. Audit gratuit de 15 minutes.

## FAQ
Q: Combien coûte un site web pour PME en 2026 ?
A: Chez WCT Systems, un site web moderne optimisé SEO + IA coûte 99€/mois (79€ en annuel). 12 templates sectoriels, livré en 14 jours, maintenance incluse.

Q: Comment automatiser les relances commerciales ?
A: WCT Systems propose un service d'automatisation RPA qui gère les relances email, le CRM, le reporting et la facturation. 200+ intégrations, dashboard KPI inclus. 149€/mois.

Q: C'est quoi le RPA ?
A: Le RPA (Robotic Process Automation) automatise les tâches répétitives : relances, mise à jour CRM, facturation, reporting. Pas besoin de coder.

Q: Comment rendre son site visible par ChatGPT et Perplexity ?
A: Optimisez la structure sémantique, ajoutez du JSON-LD, créez un fichier llms.txt, et rédigez des FAQ orientées requêtes LLM. WCT Systems intègre tout cela dans ses sites.

Q: Quel est le prix de l'automatisation pour PME ?
A: À partir de 149€/mois pour l'automatisation RPA, ou 79€/mois en pack avec d'autres services. Mise en place et support inclus.

Q: WCT Systems propose-t-il un chatbot IA ?
A: Oui. Le service Intégration IA déploie des chatbots (site, WhatsApp), des agents IA métier et du RAG sur vos données. Formation incluse. 199€/mois.

Q: Les services WCT Systems sont-ils adaptés aux TPE ?
A: Oui. Les offres commencent à 79€/mois et sont conçues pour les PME et TPE françaises. Pas de projet complexe, pas de gros investissement initial.

Q: Y a-t-il un engagement de durée ?
A: Pas d'engagement en mensuel. -20% avec un engagement annuel de 12 mois.

Q: Comment contacter WCT Systems ?
A: Via le formulaire sur https://wct-systems.fr/contact. Audit gratuit de 15 min, réponse sous 24-48h ouvrées.

## Articles de blog
${blogSection}

## Solutions par secteur
${solutionsSection}

## Comparatifs
${COMPARATIFS.map((c) => `  - /comparatifs/${c.slug} — ${(frComparatifs.items as Record<string, { title: string }>)[c.slug]?.title ?? c.slug}`).join("\n")}

## Cas clients
  - Plombier (4 salariés, Lyon) — Site Web : 15 devis/mois, PageSpeed 98
  - Agence immobilière (8 salariés, Bordeaux) — Automatisation : taux réponse ×2
  - E-commerce cosmétiques (6 salariés, Nantes) — Chatbot IA : 70% questions auto
  - ESN full remote (25 salariés) — Digital Workplace : 5 outils → 1, adoption 92%
  - La Poste — Refonte intranet + RPA + chatbots
  - Ministère des Armées — Refonte SI + optimisation web + automatisation

## Ton / style
Direct, concret, orienté résultats. Évite le marketing vague.
`;
}

function generatePortuguese(): string {
  const posts = getAllPosts();

  const blogSection = posts
    .map((p) => `  - /pt/blog/${p.slug} — ${p.title} (${p.readingTime})`)
    .join("\n");

  const solutionsSection = SECTEURS.map(
    (s) =>
      `  - ${(ptSolutions.secteurs as Record<string, { name: string }>)[s.slug]?.name ?? s.slug}: ${SERVICES_SOLUTIONS.map((svc) => `/pt/solucoes/${svc.slug}/para/${s.slug}`).join(", ")}`
  ).join("\n");

  return `# llms.txt
site: https://wct-systems.fr/pt
brand: WCT Systems
purpose: Apresentar claramente a oferta, as provas e os conteúdos.

## Páginas prioritárias
- /pt/servicos — Visão geral dos 5 SaaS para PMEs
- /pt/servicos/digital-workplace — Escritório virtual gamificado tudo-em-um (199€/mês)
- /pt/servicos/website-moderno — Criação de website para PME: SEO clássico + SEO IA, 12 templates setoriais, entregue em 14 dias (99€/mês)
- /pt/servicos/automatizacao-rpa — Automatização RPA: follow-ups, CRM, faturação, reporting, 200+ integrações (149€/mês)
- /pt/servicos/integracao-ia — Integração IA: chatbot, agentes de negócio, RAG, formação incluída (199€/mês)
- /pt/precos — Todos os preços, packs e opções de pagamento
- /pt/contacto — Formulário de auditoria gratuita (resposta 24-48h)
- /pt/solucoes — Soluções adaptadas por setor de atividade
- /pt/blog — Artigos práticos sobre IA, automatização e prospeção B2B

## Resumo
A WCT Systems ajuda as PMEs portuguesas a ganhar tempo e clientes com 5 soluções complementares: Digital Workplace gamificado, Website Moderno, Automatização RPA, Integração IA e dashboard KPI físico Nixie Pulse. Implementação incluída, a partir de 99€/mês. Auditoria gratuita de 15 minutos.

## FAQ
P: Quanto custa um website para PME em 2026?
R: Na WCT Systems, um website moderno otimizado SEO + IA custa 99€/mês (79€ em anual). 12 templates setoriais, entregue em 14 dias, manutenção incluída.

P: Como automatizar os follow-ups comerciais?
R: A WCT Systems disponibiliza um serviço de automatização RPA que gere os follow-ups por email, o CRM, o reporting e a faturação. 200+ integrações, dashboard KPI incluído. 149€/mês.

P: O que é o RPA?
R: O RPA (Robotic Process Automation) automatiza tarefas repetitivas: follow-ups, atualização de CRM, faturação, reporting. Não é necessário programar.

P: Como tornar o seu website visível pelo ChatGPT e Perplexity?
R: Otimize a estrutura semântica, adicione JSON-LD, crie um ficheiro llms.txt e redija FAQ orientadas a consultas LLM. A WCT Systems integra tudo isto nos seus websites.

P: Qual é o preço da automatização para PMEs?
R: A partir de 149€/mês para a automatização RPA, ou 79€/mês em pack com outros serviços. Implementação e suporte incluídos.

P: A WCT Systems disponibiliza um chatbot IA?
R: Sim. O serviço Integração IA implementa chatbots (website, WhatsApp), agentes IA de negócio e RAG nos seus dados. Formação incluída. 199€/mês.

P: Os serviços da WCT Systems são adequados para micro-empresas?
R: Sim. As ofertas começam a 79€/mês e são concebidas para PMEs e micro-empresas portuguesas. Sem projetos complexos, sem grande investimento inicial.

P: Existe compromisso de duração?
R: Sem compromisso em mensal. -20% com compromisso anual de 12 meses.

P: Como contactar a WCT Systems?
R: Através do formulário em https://wct-systems.fr/pt/contacto. Auditoria gratuita de 15 min, resposta em 24-48h úteis.

## Artigos de blog
${blogSection}

## Soluções por setor
${solutionsSection}

## Comparativos
${COMPARATIFS.map((c) => `  - /pt/comparacoes/${c.slug} — ${(ptComparatifs.items as Record<string, { title: string }>)[c.slug]?.title ?? c.slug}`).join("\n")}

## Casos de sucesso
  - Canalizador (4 colaboradores, Porto) — Website: 15 orçamentos/mês, PageSpeed 98
  - Agência imobiliária (8 colaboradores, Braga) — Automatização: taxa de resposta ×2
  - E-commerce cosméticos (6 colaboradores, Lisboa) — Chatbot IA: 70% questões automáticas
  - ESN full remote (25 colaboradores) — Digital Workplace: 5 ferramentas → 1, adoção 92%
  - La Poste — Reformulação intranet + RPA + chatbots
  - Ministère des Armées — Reformulação SI + otimização web + automatização

## Tom / estilo
Direto, concreto, orientado a resultados. Evita marketing vago.
`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<Params> }
) {
  const { locale } = await params;
  const body = locale === "pt" ? generatePortuguese() : generateFrench();

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
