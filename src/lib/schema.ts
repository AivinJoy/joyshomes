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
  name: 'Joys Homes & Developers',
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
    { '@type': 'City', name: 'Kozhikode' },
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
    'https://www.linkedin.com/company/joys-homes-developers',
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

// ─── 3. FAQPage — GEO gold: FAQ schema appears in AI Overviews & Perplexity ───
// Add real FAQs relevant to your business. These are strong GEO signals.
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the cost of building a home in Kerala?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cost of building a home in Kerala varies based on design, materials, and location. At Joys Homes & Developers, construction costs typically start from ₹1,800 per sq ft for standard finishes and ₹2,500+ per sq ft for premium and luxury finishes. Contact us for a free detailed estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Joys Homes & Developers build eco-friendly or green homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Eco-friendly construction is a core specialty at Joys Homes & Developers. We incorporate sustainable materials, rainwater harvesting systems, solar-ready designs, and energy-efficient layouts to reduce your home\'s environmental impact and long-term running costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a house in Kerala?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical residential home of 1,500–2,500 sq ft takes between 12 to 18 months from foundation to handover, depending on design complexity and approval timelines. Joys Homes & Developers provides a detailed project schedule before work begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer interior design services along with construction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Joys Homes & Developers offers complete end-to-end services including architectural design, structural construction, and interior design & fit-out, so you have a single point of contact for your entire project.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which areas in Kerala does Joys Homes & Developers serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are headquartered in Thrissur and serve clients across Kerala, including Kochi, Kozhikode, Kottayam, Palakkad, and Kannur. Contact us to discuss your project location.',
      },
    },
  ],
};

// ─── Export all schemas together for easy use in +page.svelte ─────────────────
export const allSchemas = [
  localBusinessSchema,
  websiteSchema,
  faqSchema,
];