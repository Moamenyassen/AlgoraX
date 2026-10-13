import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Brand from './Brand';
import { useLanguage } from '../hooks/useLanguage';

const Navbar = () => {
    const { t, href, page, language } = useLanguage();
    const [open, setOpen] = useState(false);
    const other = language === 'en' ? 'ar' : 'en';
    const links = [
        { page: 'reach', label: 'Reach' },
        { page: 'mindo', label: 'Mindo' },
        { page: 'solutions', label: t.nav.solutions },
        { page: 'about', label: t.nav.about },
        { page: 'contact', label: t.nav.contact },
    ];
    const linkClass = (p) => `rounded-md px-1 py-1 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet ${page === p ? 'text-ink font-medium' : 'text-[#4b4664]'}`;

    return (
        <header className="sticky top-0 z-40 border-b border-line/70 bg-mist/85 backdrop-blur">
            <nav className="container-x flex h-16 items-center gap-6" aria-label="Main">
                <a href={href('home')} aria-label={t.nav.home} className="me-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet">
                    <Brand />
                </a>
                <ul className="hidden items-center gap-6 text-[15px] md:flex">
                    {links.map((l) => (
                        <li key={l.page}><a href={href(l.page)} className={linkClass(l.page)} aria-current={page === l.page ? 'page' : undefined}>{l.label}</a></li>
                    ))}
                    <li><a href={href(page === 'notFound' ? 'home' : page, other)} hrefLang={other} lang={other} aria-label={t.nav.languageLabel} className={linkClass('')}>{t.nav.language}</a></li>
                </ul>
                <a href={href('contact')} className="btn-dark hidden md:inline-flex">{t.nav.talk}</a>
                <button
                    type="button"
                    className="rounded-md p-2 text-ink md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
            </nav>
            <div id="mobile-menu" hidden={!open} className="border-t border-line bg-mist md:hidden">
                <ul className="container-x grid gap-1 py-4 text-lg">
                    {links.map((l) => (
                        <li key={l.page}><a href={href(l.page)} className="block rounded-lg px-2 py-2 hover:bg-white" aria-current={page === l.page ? 'page' : undefined}>{l.label}</a></li>
                    ))}
                    <li><a href={href(page === 'notFound' ? 'home' : page, other)} hrefLang={other} lang={other} className="block rounded-lg px-2 py-2 hover:bg-white">{t.nav.language}</a></li>
                    <li className="pt-2"><a href={href('contact')} className="btn-dark w-full">{t.nav.talk}</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
