import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Mail, Phone, Send, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { contact, emailLink, phoneLink, whatsappLink } from '../data/contact';

// Floating "talk to us" button on every page. One tap opens the contact options.
const ContactDock = ({ topic = 'general' }) => {
    const { t, href } = useLanguage();
    const c = t.contactChannels;
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);
    const wa = whatsappLink(c.prefill[topic] ?? c.prefill.general);
    const tel = phoneLink();

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        const onClick = (e) => panelRef.current && !panelRef.current.contains(e.target) && setOpen(false);
        document.addEventListener('keydown', onKey);
        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('click', onClick);
        };
    }, [open]);

    const item = 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-ink hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet';
    const dot = 'grid h-9 w-9 shrink-0 place-items-center rounded-full text-white';

    return (
        <div ref={panelRef} className="fixed bottom-5 end-5 z-50 grid justify-items-end gap-3" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <div id="contact-dock" hidden={!open} className="w-72 rounded-2xl border border-line bg-white p-2 shadow-2xl">
                <p className="px-3 pb-1 pt-2 text-sm text-muted">{c.reply}</p>
                {wa && <a className={item} href={wa} target="_blank" rel="noopener"><span className={`${dot} bg-whatsapp`}><MessageCircle size={18} aria-hidden="true" /></span>{c.whatsapp}</a>}
                {tel && <a className={item} href={tel}><span className={`${dot} bg-reach`}><Phone size={18} aria-hidden="true" /></span><span dir="ltr">{contact.phone}</span></a>}
                <a className={item} href={emailLink()}><span className={`${dot} bg-violet`}><Mail size={18} aria-hidden="true" /></span><span dir="ltr" className="truncate">{contact.email}</span></a>
                <a className={item} href={`${href('contact')}#message`}><span className={`${dot} bg-mindo`}><Send size={18} aria-hidden="true" /></span>{c.form}</a>
            </div>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="contact-dock"
                className={`flex h-14 items-center gap-2 rounded-full px-5 font-medium text-white shadow-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 ${wa ? 'bg-whatsapp hover:bg-[#178246]' : 'bg-ink hover:bg-violet'}`}
            >
                {open ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
                <span>{c.title}</span>
            </button>
        </div>
    );
};

export default ContactDock;
