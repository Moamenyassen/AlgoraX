# AlgoraX

Company website for AlgoraX and its flagship product, **Reach** (AI sales route optimization). Built with React 19, Vite, Tailwind CSS and Framer Motion, in English and Arabic.

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

## Content

All text, in both languages, lives in `src/data/translations.js`. Testimonials stay hidden until real quotes are added to `testimonials.items`.

## Deploy

`npm run build`, then upload the contents of `dist/` to the web root (`public_html` on Hostinger). The `deploy` branch of this repo always holds the latest built site.
