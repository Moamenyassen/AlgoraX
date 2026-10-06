import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import Button from './Button';
import Logo from './Logo';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Navbar = ({ onOpenDemo }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [hoveredTab, setHoveredTab] = useState(null);

    const navItems = [
        { key: 'solutions', label: t.nav.solutions },
        { key: 'products', label: t.nav.products },
        { key: 'how-it-works', label: t.nav.howItWorks },
        { key: 'contact', label: t.nav.contact },
    ];

    const languageButton = (
        <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.nav.switchLanguage}
            lang={language === 'en' ? 'ar' : 'en'}
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
            <Globe aria-hidden="true" size={18} />
            <span className="text-sm font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
        </button>
    );

    return (
        <Motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Main"
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-dark/90 backdrop-blur-md border-b border-primary/20 py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#top" className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <Logo />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse" onMouseLeave={() => setHoveredTab(null)}>
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href={`#${item.key}`}
                            onMouseEnter={() => setHoveredTab(item.key)}
                            className="relative px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-gray-300 hover:text-white transition-colors z-[1] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            {hoveredTab === item.key && (
                                <Motion.div
                                    layoutId="navbar-spotlight"
                                    className="absolute inset-0 bg-white/10 rounded-full -z-[1] blur-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {item.label}
                        </a>
                    ))}

                    {languageButton}

                    <Button variant="primary" onClick={() => onOpenDemo('general')}>{t.nav.partner}</Button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    {languageButton}
                    <button
                        type="button"
                        className="text-white p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <Motion.div
                    id="mobile-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-dark-acc border-t border-gray-800"
                >
                    <div className="flex flex-col p-6 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={`#${item.key}`}
                                className="text-gray-300 hover:text-primary transition-colors font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <Button variant="primary" className="w-full text-center" onClick={() => { setIsOpen(false); onOpenDemo('general'); }}>{t.nav.partner}</Button>
                    </div>
                </Motion.div>
            )}
        </Motion.nav>
    );
};

export default Navbar;
