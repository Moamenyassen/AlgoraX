import { useState } from 'react';
import { MessageCircle, Mail, Phone, Send, Copy, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { contact, emailLink, phoneLink, whatsappLink } from '../data/contact';

// The ways to reach Algora, as cards. WhatsApp and Call only show once a number is set in data/contact.js.
// `topic` picks the pre-filled WhatsApp message (general, reach, mindo, solutions).
const ContactChannels = ({ topic = 'general', showForm = true, dark = false }) => {
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

    const card = `group grid content-start gap-1 rounded-2xl border p-5 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet ${dark ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white' : 'border-line bg-white hover:border-ink text-ink'}`;
    const sub = dark ? 'text-[#c8c3dc]' : 'text-muted';
    const icon = 'mb-2 grid h-10 w-10 place-items-center rounded-full';

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {wa && (
                <a href={wa} target="_blank" rel="noopener" className={card}>
                    <span className={`${icon} bg-whatsapp text-white`}><MessageCircle size={20} aria-hidden="true" /></span>
                    <span className="text-lg font-semibold">{c.whatsapp}</span>
                    <span className={`text-sm ${sub}`}>{c.whatsappDesc}</span>
                </a>
            )}
            <div className={card}>
                <span className={`${icon} bg-violet text-white`}><Mail size={20} aria-hidden="true" /></span>
                <a href={emailLink()} className="text-lg font-semibold hover:underline">{c.email}</a>
                <span className={`text-sm ${sub}`}>{c.emailDesc}</span>
                <span className="mt-2 flex flex-wrap items-center gap-2">
                    <span dir="ltr" className="select-all font-mono text-sm">{contact.email}</span>
                    <button type="button" onClick={copyEmail} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${dark ? 'border-white/20' : 'border-line'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet`}>
                        {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                        <span aria-live="polite">{copied ? c.copied : c.copy}</span>
                    </button>
                </span>
            </div>
            {tel && (
                <a href={tel} className={card}>
                    <span className={`${icon} bg-reach text-white`}><Phone size={20} aria-hidden="true" /></span>
                    <span className="text-lg font-semibold">{c.call}</span>
                    <span className={`text-sm ${sub}`}>{c.callDesc}</span>
                    <span dir="ltr" className="mt-2 font-mono text-sm">{contact.phone}</span>
                </a>
            )}
            {showForm && (
                <a href={`${href('contact')}#message`} className={card}>
                    <span className={`${icon} bg-mindo text-white`}><Send size={20} aria-hidden="true" /></span>
                    <span className="text-lg font-semibold">{c.form}</span>
                    <span className={`text-sm ${sub}`}>{c.formDesc}</span>
                </a>
            )}
        </div>
    );
};

export default ContactChannels;
