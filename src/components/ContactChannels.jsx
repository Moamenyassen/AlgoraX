import { useState } from 'react';
import { MessageCircle, Mail, Phone, Send, Copy, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { contact, emailLink, phoneLink, whatsappLink } from '../data/contact';
import Reveal from './Reveal';

// The ways to reach Algora, as cards. WhatsApp and Call only show once a number is set in data/contact.js.
// `topic` picks the pre-filled WhatsApp message (general, reach, mindo, solutions).
const ContactChannels = ({ topic = 'general', showForm = true }) => {
    const { t, href } = useLanguage();
    const c = t.contactChannels;
    const [copied, setCopied] = useState(false);
    const wa = whatsappLink(c.prefill[topic] ?? c.prefill.general);
    const tel = phoneLink();

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contact.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be blocked; the address is still visible to select by hand.
        }
    };

    const card = 'group spot ring-glow relative grid h-full content-start gap-1.5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-start backdrop-blur transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan';
    const icon = 'mb-3 grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110';
    const items = [];
    if (wa) items.push(
        <a key="wa" href={wa} target="_blank" rel="noopener" className={card}>
            <span className={`${icon} bg-whatsapp shadow-[0_0_30px_rgba(37,211,102,.5)]`}><MessageCircle size={22} aria-hidden="true" /></span>
            <span className="text-lg font-semibold text-white">{c.whatsapp}</span>
            <span className="text-sm text-fog">{c.whatsappDesc}</span>
            {contact.phone && <span dir="ltr" className="mt-2 font-mono text-sm text-whatsapp">{contact.phone}</span>}
        </a>
    );
    items.push(
        <div key="mail" className={card}>
            <span className={`${icon} bg-violet shadow-[0_0_30px_rgba(124,92,255,.5)]`}><Mail size={22} aria-hidden="true" /></span>
            <a href={emailLink()} className="text-lg font-semibold text-white hover:underline">{c.email}</a>
            <span className="text-sm text-fog">{c.emailDesc}</span>
            <span className="mt-2 flex flex-wrap items-center gap-2">
                <span dir="ltr" className="select-all font-mono text-sm text-violet-soft">{contact.email}</span>
                <button type="button" onClick={copyEmail} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-xs text-fog hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                    {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                    <span aria-live="polite">{copied ? c.copied : c.copy}</span>
                </button>
            </span>
        </div>
    );
    if (tel) items.push(
        <a key="tel" href={tel} className={card}>
            <span className={`${icon} bg-[#0fb5a0] shadow-[0_0_30px_rgba(47,224,196,.45)]`}><Phone size={22} aria-hidden="true" /></span>
            <span className="text-lg font-semibold text-white">{c.call}</span>
            <span className="text-sm text-fog">{c.callDesc}</span>
            <span dir="ltr" className="mt-2 font-mono text-sm text-teal">{contact.phone}</span>
        </a>
    );
    if (showForm) items.push(
        <a key="form" href={`${href('contact')}#message`} className={card}>
            <span className={`${icon} bg-mindo shadow-[0_0_30px_rgba(255,92,147,.5)]`}><Send size={22} aria-hidden="true" /></span>
            <span className="text-lg font-semibold text-white">{c.form}</span>
            <span className="text-sm text-fog">{c.formDesc}</span>
        </a>
    );

    return (
        <div className={`grid gap-4 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {items.map((item, i) => <Reveal key={item.key} delay={i * 90}>{item}</Reveal>)}
        </div>
    );
};

export default ContactChannels;
