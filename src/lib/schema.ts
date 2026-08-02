// src/lib/schema.ts
// Centralised Schema.org structured data — 2026-optimised for SEO + GEO

const SITE_URL = 'https://joyshomes.com';
const LOGO_URL = `${SITE_URL}/android-chrome-512x512.png`;
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// ─── 1. LocalBusiness + HomeAndConstructionBusiness ───────────────────────────
// The most important schema for a local construction company.
// Combines LocalBusiness specifics with HomeAndConstructionBusiness type.
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Joys Homes & Developers | Construction Company & Home Builders in Thrissur, Kerala',
  alternateName: 'Joys Homes',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: OG_IMAGE,
  description:
    'Joys Homes & Developers is a premier construction company in Thrissur, Kerala, specialising in eco-friendly luxury homes, commercial buildings, interior design, and renovation. Serving Kerala since 2010.',
  telephone: '+919048681007',
  email: 'joyshomesin@gmail.com',       // update if different
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, Cheque',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kizhakkepuram Road, Aranattukara',
    addressLocality: 'Thrissur',
    addressRegion: 'Kerala',
    postalCode: '680618',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.5276,
    longitude: 76.2144,
  },
  areaServed: [
    { '@type': 'State', name: 'Kerala' },
    { '@type': 'City', name: 'Thrissur' },
    { '@type': 'City', name: 'Kochi' },
    { '@type': 'City', name: 'Ernakulam' },
    { '@type': 'City', name: 'Kottayam' },
  ],
  serviceType: [
    'Home Construction',
    'Luxury Home Building',
    'Eco-Friendly Construction',
    'Commercial Construction',
    'Interior Design',
    'Home Renovation',
    'Architectural Design',
    'Green Building',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction & Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Luxury Home Construction',
          description: 'Custom luxury home construction tailored to your vision and budget.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Eco-Friendly Green Building',
          description: 'Sustainable construction using eco-friendly materials and practices.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Interior Design & Fit-Out',
          description: 'Full interior design and fit-out services for residential and commercial spaces.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Renovation & Remodelling',
          description: 'Home and commercial renovation services to modernise your existing space.',
        },
      },
    ],
  },
  sameAs: [
    'https://www.linkedin.com/company/joyshomes',
    'https://www.instagram.com/joyshomes',
    'https://www.facebook.com/joyshomes',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};

// ─── 2. WebSite (enables Sitelinks Search Box in Google) ──────────────────────
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Joys Homes & Developers',
  description: 'Premier eco-friendly home builders in Kerala, India.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-IN',
};

// ─── WebPage (ties this page to the organization entity) ──────────────────────
export const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: 'Joys Homes & Developers | Luxury & Eco-Friendly Home Builders in Kerala',
  isPartOf: {
    '@id': `${SITE_URL}/#website`,
  },
  about: {
    '@id': `${SITE_URL}/#organization`,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
  },
  inLanguage: 'en-IN',
};

// ─── 3. FAQPage — GEO gold: FAQ schema appears in AI Overviews & Perplexity ───
// Add real FAQs relevant to your business. These are strong GEO signals.
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide architectural design, planning, 3D rendering, interior design, residential and commercial construction, renovation, turnkey construction, and project management.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is turnkey construction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Turnkey construction is a complete end-to-end service where we handle everything from design and approvals to construction and handover, delivering a ready-to-use property.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you undertake both residential and commercial projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we specialize in both residential homes and commercial buildings of various sizes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help with architectural plans and approvals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We prepare architectural drawings, structural plans, and assist with the necessary approvals and documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide 3D designs before construction starts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we create realistic 3D visualizations and renderings so you can visualize your project before construction begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize my home design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Every project is tailored to your lifestyle, budget, and preferences.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you renovate existing homes and commercial buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We undertake renovation, remodeling, extensions, and structural modifications.',
      },
    },
  ],
};

// ─── Export all schemas together for easy use in +page.svelte ─────────────────
export const allSchemas = [
  localBusinessSchema,
  websiteSchema,
  webPageSchema,
  faqSchema,
];