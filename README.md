# Joys Homes & Developers — Website

Marketing website for **Joys Homes & Developers**, a construction company based in Thrissur, Kerala, India, specialising in eco-friendly luxury homes, commercial construction, interior design, and renovation.

Live site: https://joyshomes.com

## Tech Stack

- SvelteKit — application framework
- Tailwind CSS — styling
- GSAP (ScrollTrigger, ScrollToPlugin) — scroll-driven animations
- Resend — transactional email for quote requests
- Netlify — hosting and serverless functions, via @sveltejs/adapter-netlify

## Features

- Cinematic, scroll-driven hero, project carousel, and achievements sections built with GSAP and ScrollTrigger
- "Get a Quote" modal with a server-side validated lead capture form
- Quote requests delivered by email via Resend to the business inbox
- SEO and GEO optimised: JSON-LD structured data (LocalBusiness, FAQPage, WebSite), sitemap.xml, robots.txt, llms.txt
- Responsive image galleries using AVIF and WebP via @sveltejs/enhanced-img

## Project Structure

    src/
    ├── lib/
    │   ├── components/     Hero, Navbar, Carousel, Achievements, Gallery, Footer, QuoteModal, SEO
    │   ├── assets/          Images: hero, carousel, gallery
    │   └── schema.ts         Centralised Schema.org structured data
    ├── routes/
    │   ├── +page.svelte       Homepage
    │   ├── +layout.svelte     Global layout and SEO
    │   ├── api/quote/          Server route for quote request submissions
    │   ├── privacy-policy/
    │   ├── terms-of-service/
    │   └── sitemap.xml/       Dynamic sitemap
    static/                    Favicons, manifest, robots.txt, llms.txt, _headers

## Local Development

Requirements: Node.js 20+, npm

    npm install
    cp .env.example .env
    npm run dev

## Environment Variables

Create a `.env` file in the project root. This file is not committed to git.

    RESEND_API_KEY=your_resend_api_key_here

This is required for the "Get a Quote" form (`/api/quote`) to send email notifications via Resend. Get a key at resend.com.

For production, this same variable must also be set in Netlify under Site configuration → Environment variables.

## Deployment

This site auto-deploys to Netlify on every push to `main`, configured via `netlify.toml`:

    [build]
      command = "npm run build"
      publish = "build"

    [functions]
      directory = "netlify/functions"

Uses @sveltejs/adapter-netlify, which converts server routes such as `/api/quote` into Netlify Functions automatically.

## License

Copyright (c) 2026 Joys Homes & Developers. All rights reserved.

This repository is proprietary and confidential. See the [LICENSE](./LICENSE) file for full terms. No part of this codebase, its content, or its assets may be copied, reused, redistributed, modified, or repurposed without explicit written permission from Joys Homes & Developers.