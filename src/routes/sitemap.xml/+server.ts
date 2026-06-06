// src/routes/sitemap.xml/+server.ts
// Dynamically generated sitemap — auto-served at /sitemap.xml

import type { RequestHandler } from '@sveltejs/kit';

const SITE_URL = 'https://joyshomes.com';

// For a single-page site with anchor sections, list the page + anchor URLs.
// lastmod: use ISO date string (YYYY-MM-DD). Update when content changes.
const pages = [
  {
    loc: `${SITE_URL}/`,
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: '1.0',
  },
  {
    loc: `${SITE_URL}/#projects-layer`,
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    loc: `${SITE_URL}/#about-layer`,
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    loc: `${SITE_URL}/#insights-layer`,
    lastmod: '2026-06-01',
    changefreq: 'yearly',
    priority: '0.7',
  },
  { 
    loc: `${SITE_URL}/#faq`,
    lastmod: '2026-06-06', 
    changefreq: 'monthly', 
    priority: '0.8' 
  },
];

export const GET: RequestHandler = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
>
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
      'Cache-Control': 'public, max-age=3600', // cache for 1 hour
    },
  });
};