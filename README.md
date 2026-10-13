# AlgoraX

Company website for Algora and its two products, **Reach** (AI sales route planning) and **Mindo** (an ecommerce app that learns shopper behaviour). Built with React 19, Vite and Tailwind CSS, in English and Arabic (`/ar/...`).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # production build in dist/
```

## Contact form

The form sends through EmailJS. Create a `.env` file (it is git-ignored) with:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Content and contact details

All text, in both languages, lives in `src/data/content.js`. Email, WhatsApp number and phone number live in `src/data/contact.js`; the WhatsApp and call buttons appear as soon as a number is filled in.

## Pages

`npm run build` pre-renders every page in both languages (`scripts/prerender.js`) into `dist/`, plus `404.html`, `sitemap.xml` and `_headers` for Cloudflare Pages. Pages are listed in `src/routes.js`.

## Deploy

The site is hosted on **Cloudflare Pages**, connected to this repository. Every push to `main` builds and publishes automatically.

Cloudflare Pages settings:

- Framework preset: None
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: `NODE_VERSION=22`, plus the three `VITE_EMAILJS_*` keys above

Cloudflare serves `dist/404.html` for unknown addresses and applies the cache rules in `public/_headers`.
