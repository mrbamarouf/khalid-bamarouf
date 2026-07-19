# Khalid Bamarouf AI Automation Experience

A desktop-led digital experience for Khalid Bamarouf, positioned around AI automation, custom AI apps, agents, backend engineering, cloud infrastructure, APIs, and integration.

The project uses Next.js, TypeScript, Tailwind CSS, and Framer Motion. Content lives in `src/content/site-content.ts`, with WhatsApp and email stored in `src/content/contact-config.ts` so English, Arabic, navigation, and contact details can be edited from one place.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: start local development.
- `npm run lint`: run ESLint.
- `npx tsc --noEmit`: run TypeScript checks.
- `npm run build`: create a production build.

## Brand Assets

- Source logo: `brand-assets/khalid-bamarouf-logo.png`
- Transparent logo: `public/brand/khalid-bamarouf-logo-transparent.png`
- Local photography: `public/images/`
- Image attribution: `IMAGE-SOURCES.md`

## Content Model

The visible English experience is complete. Arabic content and RTL metadata are built into the same content model and can be activated through the language switch without mixing page languages.
