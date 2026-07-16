import type { RequestHandler } from '@sveltejs/kit';

const SITE_URL = 'https://joyshomes.com';

const pages = [
  {
    loc: `${SITE_URL}/`,
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: '1.0',
  },
];

export const GET: RequestHandler = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};