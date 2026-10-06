import React, { useState, useRef, useEffect, useId } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { X, Check, Loader } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import emailjs from '@emailjs/browser';

const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

const InputField = ({ label, type = "text", placeholder, name, required = false, autoComplete, dir }) => {
    const id = useId();
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
            <input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                dir={dir}
                className={inputClass}
            />
        </div>
    );
};

// Keys are loaded from the .env file
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

const DemoModal = ({ isOpen, onClose, initialType = 'demo' }) => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [inquiryType, setInquiryType] = useState(initialType); // 'general' or 'demo'
    const form = useRef();
    const dialogRef = useRef();
    const titleId = useId();
    const messageId = useId();
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    // Lock page scroll, close on Escape, keep keyboard focus inside the dialog, and restore focus on close.
    useEffect(() => {
        if (!isOpen) return;
        const previouslyFocused = document.activeElement;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';

        const focusFirst = requestAnimationFrame(() => {
            (dialogRef.current?.querySelector('input') ?? dialogRef.current?.querySelector('button'))?.focus();
        });

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab' || !dialogRef.current) return;
            const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleKey);

        return () => {
            cancelAnimationFrame(focusFirst);
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = overflow;
            previouslyFocused?.focus?.();
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const formJson = Object.fromEntries(formData.entries());

        // Honeypot: real visitors never see or fill this field, bots usually do.
        if (formJson.website) {
            setStatus('success');
            return;
        }
        delete formJson.website;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error("EmailJS keys are missing. Check your .env file.");
            setStatus('error');
            return;
        }

        setStatus('loading');

        // Consolidated message body so all data is visible even if the EmailJS
        // template does not use the individual variables.
        const header = inquiryType === 'general' ? 'New General Inquiry' : 'New Demo Request';
        const formattedMessage = `
${header}
------------------------------------------------
Name: ${formJson.first_name} ${formJson.last_name}
Email: ${formJson.email}
Phone: ${formJson.phone || 'N/A'}
Company: ${formJson.company_name || 'N/A'}
Location: ${formJson.company_location || 'N/A'}
Job Title: ${formJson.job_title || 'N/A'}
Team Size: ${formJson.team_size || 'N/A'}
Language: ${language}
------------------------------------------------

Message:
${formJson.message || 'N/A'}
        `.trim();

        const templateParams = {
            ...formJson,
            inquiry_type: header,
            from_name: `${formJson.first_name} ${formJson.last_name}`,
            to_name: 'AlgoraX Team',
            reply_to: formJson.email,
            message: formattedMessage,
            message_body: formattedMessage,
            content: formattedMessage
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
            }, (error) => {
                console.error('Failed to send email:', error?.text);
                setStatus('error');
            });
    };

    const tabClass = (active) => `flex-1 py-2 text-sm font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active
        ? 'bg-primary text-black shadow-lg'
        : 'text-gray-300 hover:text-white'
        }`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        aria-hidden="true"
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
                        <Motion.div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto shadow-2xl pointer-events-auto relative"
                        >
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label={t.modal.close}
                                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-gray-400 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                            >
                                <X aria-hidden="true" size={24} />
                            </button>

                            <div className="p-6 sm:p-8">

                                {status !== 'success' ? (
                                    <>
                                        <h2 id={titleId} className="text-2xl font-bold text-white mb-4">{t.modal.title}</h2>

                                        {/* Inquiry Type Toggle */}
                                        <div className="flex bg-white/5 p-1 rounded-lg mb-6" role="group">
                                            <button type="button" aria-pressed={inquiryType === 'general'} onClick={() => setInquiryType('general')} className={tabClass(inquiryType === 'general')}>
                                                {t.modal.types.general}
                                            </button>
                                            <button type="button" aria-pressed={inquiryType === 'demo'} onClick={() => setInquiryType('demo')} className={tabClass(inquiryType === 'demo')}>
                                                {t.modal.types.demo}
                                            </button>
                                        </div>

                                        <form ref={form} onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                                                <InputField label={t.modal.labels.firstName} name="first_name" placeholder={t.modal.placeholders.firstName} autoComplete="given-name" required />
                                                <InputField label={t.modal.labels.lastName} name="last_name" placeholder={t.modal.placeholders.lastName} autoComplete="family-name" required />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                                                <InputField label={t.modal.labels.email} name="email" type="email" placeholder={t.modal.placeholders.email} autoComplete="email" dir="ltr" required />
                                                <InputField label={t.modal.labels.phone} name="phone" type="tel" placeholder={t.modal.placeholders.phone} autoComplete="tel" dir="ltr" />
                                            </div>

                                            {inquiryType === 'demo' && (
                                                <Motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                                                        <InputField label={t.modal.labels.company} name="company_name" placeholder={t.modal.placeholders.company} autoComplete="organization" required />
                                                        <InputField label={t.modal.labels.location} name="company_location" placeholder={t.modal.placeholders.location} autoComplete="country-name" />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                                                        <InputField label={t.modal.labels.job} name="job_title" placeholder={t.modal.placeholders.job} autoComplete="organization-title" />
                                                        <InputField label={t.modal.labels.size} name="team_size" type="number" placeholder={t.modal.placeholders.size} />
                                                    </div>
                                                </Motion.div>
                                            )}

                                            <div className="mb-4">
                                                <label htmlFor={messageId} className="block text-gray-300 text-sm font-medium mb-2">{t.modal.labels.message}</label>
                                                <textarea
                                                    id={messageId}
                                                    name="message"
                                                    required={inquiryType === 'general'}
                                                    placeholder={t.modal.placeholders.message}
                                                    rows={3}
                                                    className={`${inputClass} resize-none`}
                                                />
                                            </div>

                                            {/* Honeypot field for spam bots, hidden from people and screen readers */}
                                            <div className="hidden" aria-hidden="true">
                                                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                                            </div>

                                            <Button type="submit" variant="primary" className="w-full mt-4 flex justify-center py-3" disabled={status === 'loading'}>
                                                {status === 'loading' ? (
                                                    <span className="flex items-center gap-2">
                                                        <Loader aria-hidden="true" className="animate-spin" size={20} />
                                                        <span>{t.modal.sending}</span>
                                                    </span>
                                                ) : (
                                                    inquiryType === 'general' ? t.modal.submitGeneral : t.modal.submit
                                                )}
                                            </Button>
                                            {status === 'error' && (
                                                <p role="alert" className="text-red-400 text-sm mt-3 text-center">{t.modal.error}</p>
                                            )}
                                        </form>
                                    </>
                                ) : (
                                    <div className="text-center py-12" role="status">
                                        <div aria-hidden="true" className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                                            <Check size={32} />
                                        </div>
                                        <h2 id={titleId} className="text-2xl font-bold text-white mb-4">{t.modal.success.title}</h2>
                                        <p className="text-gray-300 mb-8">
                                            {t.modal.success.desc}
                                        </p>
                                        <div className="text-sm text-gray-400 mb-8">
                                            {t.modal.success.direct} <a href="mailto:info@algoraxco.com" dir="ltr" className="text-primary hover:underline">info@algoraxco.com</a>
                                        </div>
                                        <Button variant="secondary" onClick={onClose}>
                                            {t.modal.success.close}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Decoration */}
                            <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                        </Motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DemoModal;
