export async function GET() {
    const body = `# llms.txt
  site: https://wct-systems.fr
  brand: WCT Systems
  purpose: Présenter clairement l'offre, les preuves et les contenus.
  
  ## Pages prioritaires
  - /services
  - /cas-clients
  - /contact
  - /blog
  
  ## Résumé (court)
  WCT Systems construit des systèmes IA + automatisation pour PME : acquisition, qualification, CRM, relances, dashboards KPI.
  
  ## Ton / style
  Direct, concret, orienté résultats. Évite le marketing vague.
  `;
  
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }