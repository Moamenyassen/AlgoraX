import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 flex items-center space-x-3 rtl:space-x-reverse">
                        <Logo className="w-8 h-8" />
                        <div>
                            <span className="text-xl font-bold tracking-tighter text-white block">RouteGeniusAI</span>
                            <span className="text-xs text-gray-400">{t.footer.product}</span>
                        </div>
                    </div>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0">{t.footer.copyright}</div>

                    <div className="flex flex-col items-center md:items-end space-y-2 mt-4 md:mt-0">
                        <a href="mailto:info@algoraxco.com" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                            <span className="hidden md:inline">Contact:</span> info@algoraxco.com
                        </a>
                        <div className="flex space-x-6 rtl:space-x-reverse">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
