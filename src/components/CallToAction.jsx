import React from 'react';
import Button from './Button';
import { useLanguage } from '../hooks/useLanguage';

const CallToAction = ({ onOpenDemo }) => {
    const { t } = useLanguage();

    return (
        <section id="pricing" className="py-24 bg-gradient-to-br from-dark to-[#050510] relative overflow-hidden">
            {/* Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                        {t.cta.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        {t.cta.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button variant="primary" className="px-8 py-4 text-lg" onClick={onOpenDemo}>{t.cta.primary}</Button>
                        <Button variant="secondary" className="px-8 py-4 text-lg" onClick={onOpenDemo}>{t.cta.secondary}</Button>
                    </div>

                    <p className="mt-6 text-gray-500 text-sm">{t.cta.note}</p>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
