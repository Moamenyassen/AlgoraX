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

`npm run build` pre-renders every page in both languages (`scripts/prerender.js`) into `dist/`, plus `404.html`, `sitemap.xml` and an `.htaccess` for Hostinger. Pages are listed in `src/routes.js`.

## Deploy

`npm run build`, then upload the contents of `dist/` to the web root (`public_html` on Hostinger). The `deploy` branch of this repo always holds the latest built site.
