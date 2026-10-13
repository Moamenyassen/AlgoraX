// Every page of the site, in both languages. The prerender script writes one HTML file per entry.
export const PAGES = ['home', 'reach', 'mindo', 'solutions', 'about', 'contact', 'privacy'];
export const LANGS = ['en', 'ar'];

export const pathFor = (lang, page) => {
    const prefix = lang === 'ar' ? '/ar' : '';
    return page === 'home' ? `${prefix}/` : `${prefix}/${page}/`;
};

export const parsePath = (pathname) => {
    const parts = pathname.split('/').filter(Boolean);
    const lang = parts[0] === 'ar' ? 'ar' : 'en';
    if (lang === 'ar') parts.shift();
    if (parts.length === 0) return { lang, page: 'home' };
    if (parts.length === 1 && PAGES.includes(parts[0])) return { lang, page: parts[0] };
    return { lang, page: 'notFound' };
};
