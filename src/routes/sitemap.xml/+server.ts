import type { RequestHandler } from '@sveltejs/kit';

const SITE_URL = 'https://joyshomes.com';

const pages = [
  {
    loc: `${SITE_URL}/`,
    lastmod: '2026-07-22',
    changefreq: 'monthly',
    priority: '1.0',
    images: [
      `${SITE_URL}/images/gallery/harmony-house.jpg`,
      `${SITE_URL}/images/gallery/the-oasis.jpg`,
      `${SITE_URL}/images/gallery/multipurpose-building.jpg`,
      `${SITE_URL}/images/gallery/the-pinnacle.jpg`,
    ],
  },
];

export const GET: RequestHandler = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
>
${pages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${page.images.map((img) => `    <image:image><image:loc>${img}</image:loc></image:image>`).join('\n')}
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