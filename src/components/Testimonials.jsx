import { motion as Motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Logo from './Logo';

const Testimonials = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            {/* Animated Logo Accent */}
            <Motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.03, 0.06, 0.03]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
                <Logo className="w-[800px] h-[800px]" glow={false} />
            </Motion.div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">{t.testimonials.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.testimonials.items.map((item, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all group">
                            <Quote className="text-primary w-10 h-10 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <p className="text-gray-300 mb-8 italic text-lg line-height-relaxed">
                                "{item.content}"
                            </p>
                            <div>
                                <h4 className="text-white font-bold">{item.name}</h4>
                                <p className="text-secondary text-sm">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
