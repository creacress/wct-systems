export async function GET() {
    const body = `# llms.txt
  site: https://wct-systems.fr
  brand: WCT Systems
  purpose: Présenter clairement l'offre, les preuves et les contenus.
  
  ## Pages prioritaires
  - /services
  - /services/trouver-prospects
  - /services/site-web-moderne
  - /services/automatiser-relances
  - /services/integration-ia
  - /tarifs
  - /cas-clients
  - /contact
  - /blog

  ## Résumé (court)
  WCT Systems propose 4 SaaS pour PME : Prospection IA, Site Web Moderne, Automatisation (RPA), Intégration IA. Mise en place incluse, à partir de 79 € HT/mois.
  
  ## Ton / style
  Direct, concret, orienté résultats. Évite le marketing vague.
  `;
  
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }