import React, { useState, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { X, Check, Loader } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import emailjs from '@emailjs/browser';

const InputField = ({ label, type = "text", placeholder, name, required = true }) => (
    <div className="mb-4">
        <label className="block text-gray-400 text-sm font-medium mb-2">{label}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
    </div>
);

// Keys are now loaded from .env file
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const DemoModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [inquiryType, setInquiryType] = useState('demo'); // 'general' or 'demo'
    const form = useRef();
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic check if keys are configured
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error("EmailJS keys are missing or default. Check your .env file.");
            alert("EmailJS configuration is missing or invalid. Please check the console.");
            return;
        }

        setStatus('loading');

        // Construct template parameters manually to ensure correct mapping
        const formData = new FormData(form.current);
        const formJson = Object.fromEntries(formData.entries());

        // Create a consolidated message body to guarantee all data is visible
        // even if the EmailJS template is not configured with specific variables.
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
------------------------------------------------

Message:
${formJson.message}
        `.trim();

        const templateParams = {
            ...formJson, // Keep raw params just in case

            // Standardize sender info
            from_name: `${formJson.first_name} ${formJson.last_name}`,
            to_name: 'AlgoraX Team',
            reply_to: formJson.email,

            // Force the main message field to contain EVERYTHING
            message: formattedMessage,

            // Redundant backup just in case template uses 'message_body' or 'content'
            message_body: formattedMessage,
            content: formattedMessage
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                setStatus('success');
            }, (error) => {
                console.error('Failed to send email:', error.text);
                setStatus('error');
            });
    };

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
                        <Motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl pointer-events-auto relative"
                        >
                            <button
                                onClick={onClose}
                                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-gray-400 hover:text-white transition-colors`}
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8">

                                {status !== 'success' ? (
                                    <>
                                        <h2 className="text-2xl font-bold text-white mb-2">{t.modal.title}</h2>

                                        {/* Inquiry Type Toggle */}
                                        <div className="flex bg-white/5 p-1 rounded-lg mb-6">
                                            <button
                                                type="button"
                                                onClick={() => setInquiryType('general')}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${inquiryType === 'general'
                                                    ? 'bg-primary text-black shadow-lg'
                                                    : 'text-gray-400 hover:text-white'
                                                    }`}
                                            >
                                                General Inquiry
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setInquiryType('demo')}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${inquiryType === 'demo'
                                                    ? 'bg-primary text-black shadow-lg'
                                                    : 'text-gray-400 hover:text-white'
                                                    }`}
                                            >
                                                Book a Demo
                                            </button>
                                        </div>

                                        <form ref={form} onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField label={t.modal.labels.firstName} name="first_name" placeholder={isRTL ? "الاسم" : "Jane"} />
                                                <InputField label={t.modal.labels.lastName} name="last_name" placeholder={isRTL ? "العائلة" : "Doe"} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField label={t.modal.labels.email} name="email" type="email" placeholder="jane@company.com" />
                                                <InputField label="Phone" name="phone" type="tel" placeholder="+1 234 567 890" required={false} />
                                            </div>

                                            {inquiryType === 'demo' && (
                                                <Motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputField label={t.modal.labels.company} name="company_name" placeholder="Acme Inc." required={true} />
                                                        <InputField label="Location" name="company_location" placeholder="New York, USA" required={true} />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputField label={t.modal.labels.job} name="job_title" placeholder={isRTL ? "مدير" : "VP Sales"} required={true} />
                                                        <InputField label={t.modal.labels.size} name="team_size" type="number" placeholder="10" required={true} />
                                                    </div>
                                                </Motion.div>
                                            )}

                                            <div className="mb-4">
                                                <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                                                <textarea
                                                    name="message"
                                                    required={inquiryType === 'general'}
                                                    placeholder="How can we help you?"
                                                    rows={3}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                                />
                                            </div>

                                            <Button variant="primary" className="w-full mt-4 justify-center py-3" disabled={status === 'loading'}>
                                                {status === 'loading' ? (
                                                    <ContentLoader />
                                                ) : (
                                                    inquiryType === 'general' ? 'Send Message' : t.modal.submit
                                                )}
                                            </Button>
                                            {status === 'error' && (
                                                <p className="text-red-500 text-sm mt-3 text-center">Something went wrong. Please try again or email us directly.</p>
                                            )}
                                        </form>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                                            <Check size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t.modal.success.title}</h3>
                                        <p className="text-gray-400 mb-8">
                                            {t.modal.success.desc}
                                        </p>
                                        <div className="text-xs text-secondary/60 mb-8">
                                            Direct Contact: <a href="mailto:info@algoraxco.com" className="hover:text-primary transition-colors">info@algoraxco.com</a>
                                        </div>
                                        <Button variant="secondary" onClick={onClose}>
                                            {t.modal.success.close}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Decoration */}
                            <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                        </Motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

// Helper for loader
const ContentLoader = () => (
    <div className="flex items-center gap-2">
        <Loader className="animate-spin" size={20} />
        <span>Sending...</span>
    </div>
);

export default DemoModal;
