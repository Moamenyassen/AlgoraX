// Turns the built single-page app into one static HTML file per page and language,
// so every page loads with its content already in place (good for Google and slow phones).
// Runs after `vite build` and the SSR build; see the "build" script in package.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Update this if the site is served from a different address.
const SITE = 'https://algoraxco.com';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const { PAGES, LANGS, pathFor } = await import(pathToFileURL(path.join(root, 'src/routes.js')).href);
const { content } = await import(pathToFileURL(path.join(root, 'src/data/content.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const head = (lang, page) => {
    const meta = content[lang].meta[page];
    const tags = [
        `<title>${esc(meta.title)}</title>`,
        `<meta name="description" content="${esc(meta.description)}" />`,
        `<meta property="og:title" content="${esc(meta.title)}" />`,
        `<meta property="og:description" content="${esc(meta.description)}" />`,
        `<meta property="og:locale" content="${lang === 'ar' ? 'ar_SA' : 'en_US'}" />`,
    ];
    if (page !== 'notFound') {
        const url = SITE + pathFor(lang, page);
        tags.push(
            `<link rel="canonical" href="${url}" />`,
            `<meta property="og:url" content="${url}" />`,
            ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE + pathFor(l, page)}" />`),
            `<link rel="alternate" hreflang="x-default" href="${SITE + pathFor('en', page)}" />`,
        );
    } else {
        tags.push('<meta name="robots" content="noindex" />');
    }
    return tags.join('\n  ');
};

const page = (lang, name) => template
    .replace('<html lang="en" dir="ltr">', `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`)
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head(lang, name))
    .replace('<div id="root"></div>', `<div id="root">${render(lang, name)}</div>`);

const write = (rel, html) => {
    const file = path.join(dist, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    console.log('  prerendered', rel);
};

for (const lang of LANGS) {
    for (const name of PAGES) {
        const url = pathFor(lang, name);
        write(path.join(url, 'index.html'), page(lang, name));
    }
}
write('404.html', page('en', 'notFound'));

// Sitemap with both languages of every page.
const entries = PAGES.flatMap((name) => LANGS.map((lang) => `  <url>
    <loc>${SITE + pathFor(lang, name)}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE + pathFor(l, name)}" />`).join('\n')}
  </url>`));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`);

fs.rmSync(ssrDir, { recursive: true, force: true });
