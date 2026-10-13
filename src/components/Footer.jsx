import Brand from './Brand';
import { useLanguage } from '../hooks/useLanguage';
import { contact, emailLink, phoneLink, whatsappLink } from '../data/contact';

const Footer = () => {
    const { t, href } = useLanguage();
    const wa = whatsappLink(t.contactChannels.prefill.general);
    const tel = phoneLink();
    const linkClass = 'text-dim hover:text-white transition-colors';
    return (
        <footer className="relative border-t border-white/10 bg-night">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ribbon opacity-60" />
            <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                <div className="grid content-start gap-4">
                    <Brand />
                    <p className="max-w-xs text-dim">{t.footer.tagline}</p>
                </div>
                <div className="grid content-start gap-2.5">
                    <span className="eyebrow text-violet-soft">{t.footer.products}</span>
                    <a className={linkClass} href={href('reach')}>Reach</a>
                    <a className={linkClass} href={href('mindo')}>Mindo</a>
                </div>
                <div className="grid content-start gap-2.5">
                    <span className="eyebrow text-violet-soft">{t.footer.company}</span>
                    <a className={linkClass} href={href('solutions')}>{t.nav.solutions}</a>
                    <a className={linkClass} href={href('about')}>{t.nav.about}</a>
                    <a className={linkClass} href={href('contact')}>{t.nav.contact}</a>
                    <a className={linkClass} href={href('privacy')}>{t.footer.privacy}</a>
                </div>
                <div className="grid content-start gap-2.5">
                    <span className="eyebrow text-violet-soft">{t.contactChannels.title}</span>
                    {wa && <a className={linkClass} href={wa} target="_blank" rel="noopener">{t.contactChannels.whatsapp}</a>}
                    {tel && <a className={linkClass} href={tel} dir="ltr">{contact.phone}</a>}
                    <a className={linkClass} href={emailLink()} dir="ltr">{contact.email}</a>
                </div>
            </div>
            <div className="border-t border-white/5">
                <p className="container-x py-6 text-sm text-dim">{t.footer.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
