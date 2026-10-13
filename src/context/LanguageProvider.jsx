import { LanguageContext } from './LanguageContext';
import { content } from '../data/content';
import { pathFor } from '../routes';

// The language and page come from the URL (/ar/... is Arabic), so every page can be pre-rendered and shared.
export const LanguageProvider = ({ lang, page, children }) => {
    const value = {
        language: lang,
        page,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        t: content[lang],
        href: (target, targetLang = lang) => pathFor(targetLang, target),
    };
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
