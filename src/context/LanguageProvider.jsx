import React, { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../data/translations';

const STORAGE_KEY = 'algorax-lang';

// Initial language: ?lang= in the URL wins, then the saved choice, then English.
const getInitialLanguage = () => {
    try {
        const fromUrl = new URLSearchParams(window.location.search).get('lang');
        if (fromUrl && translations[fromUrl]) return fromUrl;
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved && translations[saved]) return saved;
    } catch {
        // Storage can be unavailable (private mode); fall back to English.
    }
    return 'en';
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(getInitialLanguage);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

    useEffect(() => {
        const t = translations[language];
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        document.title = t.meta.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);

        try {
            window.localStorage.setItem(STORAGE_KEY, language);
        } catch {
            // Ignore storage errors.
        }

        // Keep the language in the URL so the Arabic version can be linked and shared.
        const url = new URL(window.location.href);
        if (language === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', language);
        window.history.replaceState(null, '', url);
    }, [language]);

    const value = {
        language,
        toggleLanguage,
        t: translations[language],
        dir: language === 'ar' ? 'rtl' : 'ltr'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
