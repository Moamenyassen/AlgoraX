import Brand from './Brand';
import { useLanguage } from '../hooks/useLanguage';
import { contact, emailLink, phoneLink, whatsappLink } from '../data/contact';

const Footer = () => {
    const { t, href } = useLanguage();
    const wa = whatsappLink(t.contactChannels.prefill.general);
    const tel = phoneLink();
    const linkClass = 'text-[#c8c3dc] hover:text-white transition-colors';
    return (
        <footer className="bg-ink text-white">
            <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
                <div className="grid content-start gap-3">
                    <Brand light />
                    <p className="text-[#c8c3dc]">{t.footer.tagline}</p>
                </div>
                <div className="grid content-start gap-2">
                    <span className="eyebrow text-violet-soft">{t.footer.products}</span>
                    <a className={linkClass} href={href('reach')}>Reach</a>
                    <a className={linkClass} href={href('mindo')}>Mindo</a>
                </div>
                <div className="grid content-start gap-2">
                    <span className="eyebrow text-violet-soft">{t.footer.company}</span>
                    <a className={linkClass} href={href('solutions')}>{t.nav.solutions}</a>
                    <a className={linkClass} href={href('about')}>{t.nav.about}</a>
                    <a className={linkClass} href={href('contact')}>{t.nav.contact}</a>
                    <a className={linkClass} href={href('privacy')}>{t.footer.privacy}</a>
                </div>
                <div className="grid content-start gap-2">
                    <span className="eyebrow text-violet-soft">{t.contactChannels.title}</span>
                    {wa && <a className={linkClass} href={wa} target="_blank" rel="noopener">{t.contactChannels.whatsapp}</a>}
                    <a className={linkClass} href={emailLink()} dir="ltr">{contact.email}</a>
                    {tel && <a className={linkClass} href={tel} dir="ltr">{contact.phone}</a>}
                </div>
            </div>
            <div className="border-t border-white/10">
                <p className="container-x py-5 text-sm text-[#a7a2c0]">{t.footer.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
