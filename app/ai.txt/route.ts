export async function GET() {
    const body = `# ai.txt
  User-agent: *
  Allow: /
  Sitemap: https://wct-systems.fr/sitemap.xml
  LLMs: https://wct-systems.fr/llms.txt
  Contact: contact@wct-systems.fr
  `;
  
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }