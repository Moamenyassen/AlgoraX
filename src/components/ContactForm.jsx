import { useId, useRef, useState } from 'react';
import { Check, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../hooks/useLanguage';
import { contact } from '../data/contact';

// Keys come from the .env file (see README).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const inputClass = 'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-dim transition-colors focus:border-violet focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-violet/40 [&>option]:bg-night-2';

const Field = ({ label, children, id }) => (
    <div className="grid gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-fog">{label}</label>
        {children}
    </div>
);

// A short contact form: name, email, optional phone and company, topic and message.
const ContactForm = ({ defaultTopic = 'other' }) => {
    const { t, language } = useLanguage();
    const f = t.form;
    const formRef = useRef();
    const ids = { name: useId(), email: useId(), phone: useId(), company: useId(), topic: useId(), message: useId() };
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [sentTo, setSentTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(formRef.current).entries());

        // Honeypot: real visitors never see or fill this field, bots usually do.
        if (data.website) {
            setStatus('success');
            return;
        }
        delete data.website;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error('EmailJS keys are missing. Check your .env file.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        const topic = t.form.topics[data.topic] ?? data.topic;
        const body = `
New message from the website (${topic})
------------------------------------------------
Name: ${data.name}
Email: ${data.email}
Phone / WhatsApp: ${data.phone || 'N/A'}
Company: ${data.company || 'N/A'}
Language: ${language}
------------------------------------------------

${data.message}
        `.trim();

        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            ...data,
            inquiry_type: topic,
            from_name: data.name,
            first_name: data.name,
            to_name: 'Algora Team',
            reply_to: data.email,
            message: body,
            message_body: body,
            content: body,
        }, PUBLIC_KEY).then(() => {
            setSentTo(data.email);
            setStatus('success');
        }, (error) => {
            console.error('Failed to send email:', error?.text);
            setStatus('error');
        });
    };

    if (status === 'success') {
        return (
            <div role="status" className="glass ring-glow relative grid justify-items-start gap-4 p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-whatsapp/15 text-whatsapp shadow-[0_0_30px_rgba(37,211,102,.4)]"><Check size={26} aria-hidden="true" /></span>
                <h3 className="font-display text-2xl font-bold text-white">{f.successTitle}</h3>
                <p className="text-fog">{f.successDesc.replace('{email}', sentTo || contact.email)}</p>
                <button type="button" className="btn-ghost" onClick={() => setStatus('idle')}>{f.again}</button>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="glass ring-glow relative grid gap-5 p-6 sm:p-9" aria-labelledby="form-title">
            <h3 id="form-title" className="font-display text-2xl font-bold text-white">{f.title}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id={ids.name} label={f.name}><input id={ids.name} name="name" required autoComplete="name" className={inputClass} /></Field>
                <Field id={ids.email} label={f.email}><input id={ids.email} name="email" type="email" required autoComplete="email" dir="ltr" className={inputClass} /></Field>
                <Field id={ids.phone} label={f.phone}><input id={ids.phone} name="phone" type="tel" autoComplete="tel" dir="ltr" className={inputClass} /></Field>
                <Field id={ids.company} label={f.company}><input id={ids.company} name="company" autoComplete="organization" className={inputClass} /></Field>
            </div>
            <Field id={ids.topic} label={f.topic}>
                <select id={ids.topic} name="topic" defaultValue={defaultTopic} className={inputClass}>
                    {Object.entries(f.topics).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
            </Field>
            <Field id={ids.message} label={f.message}>
                <textarea id={ids.message} name="message" required rows={4} placeholder={f.messagePlaceholder} className={`${inputClass} resize-y`} />
            </Field>
            {/* Honeypot field for spam bots, hidden from people and screen readers */}
            <div className="hidden" aria-hidden="true"><input type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
            <button type="submit" className="btn-primary justify-self-start" disabled={status === 'loading'}>
                {status === 'loading' ? <><Loader size={18} className="animate-spin" aria-hidden="true" />{f.sending}</> : f.send}
            </button>
            {status === 'error' && <p role="alert" className="text-sm text-[#ff8a8a]">{f.error}</p>}
        </form>
    );
};

export default ContactForm;
