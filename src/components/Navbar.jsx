import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Brand from './Brand';
import { useLanguage } from '../hooks/useLanguage';

const Navbar = () => {
    const { t, href, page, language } = useLanguage();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const other = language === 'en' ? 'ar' : 'en';
    const links = [
        { page: 'reach', label: 'Reach' },
        { page: 'mindo', label: 'Mindo' },
        { page: 'solutions', label: t.nav.solutions },
        { page: 'about', label: t.nav.about },
        { page: 'contact', label: t.nav.contact },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const linkClass = (p) => `relative rounded-md px-1 py-1 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${page === p ? 'text-white after:absolute after:-bottom-1 after:start-1 after:end-1 after:h-px after:bg-ribbon' : 'text-fog'}`;

    return (
        <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? 'border-b border-white/10 bg-night/75 backdrop-blur-xl' : 'border-b border-transparent'}`}>
            <nav className={`container-x flex items-center gap-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`} aria-label="Main">
                <a href={href('home')} aria-label={t.nav.home} className="me-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                    <Brand />
                </a>
                <ul className="hidden items-center gap-7 text-[15px] md:flex">
                    {links.map((l) => (
                        <li key={l.page}><a href={href(l.page)} className={linkClass(l.page)} aria-current={page === l.page ? 'page' : undefined}>{l.label}</a></li>
                    ))}
                    <li><a href={href(page === 'notFound' ? 'home' : page, other)} hrefLang={other} lang={other} aria-label={t.nav.languageLabel} className={linkClass('')}>{t.nav.language}</a></li>
                </ul>
                <a href={href('contact')} className="btn-primary hidden !py-2.5 md:inline-flex">{t.nav.talk}</a>
                <button
                    type="button"
                    className="rounded-md p-2 text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
            </nav>
            <div id="mobile-menu" hidden={!open} className="border-t border-white/10 md:hidden">
                <ul className="container-x grid gap-1 py-4 text-lg">
                    {links.map((l) => (
                        <li key={l.page}><a href={href(l.page)} className="block rounded-xl px-3 py-2.5 text-fog hover:bg-white/5 hover:text-white" aria-current={page === l.page ? 'page' : undefined}>{l.label}</a></li>
                    ))}
                    <li><a href={href(page === 'notFound' ? 'home' : page, other)} hrefLang={other} lang={other} className="block rounded-xl px-3 py-2.5 text-fog hover:bg-white/5">{t.nav.language}</a></li>
                    <li className="pt-2"><a href={href('contact')} className="btn-primary w-full">{t.nav.talk}</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
