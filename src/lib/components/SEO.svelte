<script lang="ts">
  // SEO.svelte — drop this inside <svelte:head> from +layout.svelte or +page.svelte
  interface Props {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    noindex?: boolean;
    jsonLd?: object | object[];
  }

  let {
    title = 'Joys Homes & Developers | Luxury & Eco-Friendly Home Builders in Kerala',
    description = 'Joys Homes & Developers — premier construction company in Thrissur, Kerala. Specialising in eco-friendly luxury homes, commercial buildings & renovation. Get a free consultation today.',
    canonical = 'https://joyshomes.com/',
    ogImage = 'https://joyshomes.com/images/og-image.jpg',
    ogType = 'website',
    noindex = false,
    jsonLd = [],
  }: Props = $props();

  // Ensure jsonLd is always an array for multi-schema support
  const schemas = $derived(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
</script>

<svelte:head>
  <!-- ─── Primary ──────────────────────────────────────────── -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  {/if}

  <!-- ─── Open Graph ────────────────────────────────────────── -->
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Joys Homes & Developers — Luxury Home Builders in Kerala" />
  <meta property="og:site_name" content="Joys Homes & Developers" />
  <meta property="og:locale" content="en_IN" />

  <!-- ─── Twitter / X Card ─────────────────────────────────── -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content="Joys Homes & Developers — Luxury Home Builders in Kerala" />

  <!-- ─── Geo / Local ───────────────────────────────────────── -->
  <meta name="geo.region" content="IN-KL" />
  <meta name="geo.placename" content="Thrissur, Kerala, India" />
  <meta name="geo.position" content="10.5276;76.2144" />
  <meta name="ICBM" content="10.5276, 76.2144" />

  <!-- ─── Additional ───────────────────────────────────────── -->
  <meta name="theme-color" content="#ffffff" />
  <meta name="author" content="Joys Homes & Developers" />
  <meta name="keywords" content="home builders Kerala, construction company Thrissur, luxury homes Kerala, eco-friendly homes, green building Kerala, renovation Thrissur, interior design Kerala" />

  <!-- ─── JSON-LD Structured Data (multi-schema) ───────────── -->
  {#each schemas as schema}
    {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
  {/each}
</svelte:head>