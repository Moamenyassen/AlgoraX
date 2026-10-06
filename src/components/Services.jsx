import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Code, Server, Lightbulb, Cpu } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import MagicCard from './MagicCard';
import SectionReveal from './SectionReveal';
import Logo from './Logo';

const Services = () => {
    const { t } = useLanguage();

    const icons = [
        <Lightbulb className="w-8 h-8" />,
        <Cpu className="w-8 h-8" />,
        <Code className="w-8 h-8" />,
        <Server className="w-8 h-8" />
    ];

    return (
        <section id="solutions" className="scroll-mt-20 py-12 md:py-24 bg-dark relative border-t border-white/5 overflow-hidden">
            {/* Animated Logo Accent */}
            <Motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-20 top-20 pointer-events-none" aria-hidden="true"
            >
                <Logo className="w-40 h-40 md:w-80 md:h-80" decorative />
            </Motion.div>

            <div className="container mx-auto px-4 md:px-6">
                <SectionReveal>
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">{t.services.title}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                            {t.services.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {t.services.items.map((item, index) => (
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <MagicCard className="p-6 md:p-8 h-full bg-black/40 backdrop-blur-md">
                                <div aria-hidden="true" className="mb-4 md:mb-6 p-3 md:p-4 bg-primary/10 rounded-xl w-fit text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                    {icons[index]}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </MagicCard>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
