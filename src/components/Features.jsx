import React from 'react';
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Map, Wrench, TrendingUp, Search } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import SectionReveal from './SectionReveal';
import Logo from './Logo';

const TiltCard = ({ feature, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const icons = [
        <Map className="w-8 h-8" />,
        <Wrench className="w-8 h-8" />,
        <TrendingUp className="w-8 h-8" />,
        <Search className="w-8 h-8" />
    ];

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative p-8 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
        >
            <div
                style={{ transform: "translateZ(30px)" }}
                className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-colors"
            >
                {icons[index]}
            </div>
            <h3
                style={{ transform: "translateZ(20px)" }}
                className="text-xl font-bold text-white mb-3"
            >
                {feature.title}
            </h3>
            <p
                style={{ transform: "translateZ(10px)" }}
                className="text-gray-400 leading-relaxed"
            >
                {feature.desc}
            </p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Motion.div>
    );
};

const Features = () => {
    const { t } = useLanguage();

    return (
        <section id="features" className="py-12 md:py-24 relative bg-dark overflow-hidden">
            {/* Animated Logo Accent */}
            <Motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                    opacity: [0.03, 0.08, 0.03]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-32 bottom-0 pointer-events-none"
            >
                <Logo className="w-48 h-48 md:w-96 md:h-96" glow={false} />
            </Motion.div>

            <div className="container mx-auto px-4 md:px-6">
                <SectionReveal>
                    <div className="text-center mb-10 md:mb-16">
                        <Motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
                        >
                            Powered by <span className="text-primary">Advanced Intelligence</span>
                        </Motion.h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                            Everything you need to scale your sales operations, packed into one powerful platform.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 perspective-1000">
                    {t.features.map((feature, index) => (
                        <TiltCard key={index} index={index} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
