import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <Logo />

                    <div className="text-gray-400 text-sm">{t.footer.copyright}</div>

                    {/* Add social profile links here once the accounts exist. */}
                    <a href="mailto:info@algoraxco.com" className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                        <span>{t.footer.contact}</span> <span dir="ltr">info@algoraxco.com</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
