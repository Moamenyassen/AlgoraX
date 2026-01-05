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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [hoveredTab, setHoveredTab] = useState(null);

    const navItems = [
        { key: 'solutions', label: t.nav.solutions },
        { key: 'products', label: t.nav.products },
        { key: 'mission', label: t.nav.mission },
        { key: 'contact', label: t.nav.contact },
    ];

    return (
        <Motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-primary/20 py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-4 cursor-pointer rtl:space-x-reverse group relative">
                    <div className="relative">
                        <Logo className="w-20 h-20" />
                        {/* Magic Sparkles */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-sparkle" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary rounded-full animate-sparkle delay-700" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter uppercase relative">
                        <span className="text-white">Algora</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x">X</span>

                        {/* Hidden Shimmer Layer */}
                        <span className="absolute inset-0 text-white/20 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">AlgoraX</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse" onMouseLeave={() => setHoveredTab(null)}>
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href={`#${item.key}`}
                            onMouseEnter={() => setHoveredTab(item.key)}
                            className="relative px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-gray-300 hover:text-white transition-colors z-[1]"
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

                    <button
                        onClick={toggleLanguage}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                        <Globe size={18} />
                        <span className="text-sm font-medium uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
                    </button>

                    <Button variant="primary" onClick={onOpenDemo}>{t.nav.partner}</Button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                        <span className="text-sm font-bold uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
                    </button>
                    <div className="text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <Motion.div
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
                        <Button variant="primary" className="w-full text-center" onClick={() => { setIsOpen(false); onOpenDemo(); }}>{t.nav.partner}</Button>
                    </div>
                </Motion.div>
            )}
        </Motion.nav>
    );
};

export default Navbar;
