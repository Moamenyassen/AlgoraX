import React from 'react';
import { motion as Motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { ArrowDown, Rocket, Code, Brain } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import NeuralBackground from './NeuralBackground';
import TextReveal from './TextReveal';

const AlgoraHero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 md:pt-20 bg-dark">
            {/* Abstract Background - Kept for depth, Neural added on top */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px] md:blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] md:blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 z-10 text-center relative">
                <Motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="max-w-4xl mx-auto relative p-6 md:p-12 rounded-3xl"
                >
                    {/* Magic Prismatic Border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-white/5 to-secondary/20 blur-sm -z-10 animate-pulse" />
                    <div className="absolute inset-0 rounded-3xl border border-white/10 -z-10" />

                    <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-primary/10 border border-primary/20 rounded-full px-4 md:px-6 py-2 mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                        <Rocket size={16} className="text-primary animate-bounce md:w-[18px] md:h-[18px]" />
                        <span className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">{t.algoraHero.badge}</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]">
                        <div className="relative inline-block">
                            <TextReveal text={t.algoraHero.titleStart} className="block mb-2" />
                            {/* Floating highlight */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 blur-2xl rounded-full" />
                        </div>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                            {t.algoraHero.titleEnd}
                        </span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        {t.algoraHero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                        <MagneticButton variant="primary" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold uppercase tracking-wider rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:shadow-[0_0_60px_rgba(0,240,255,0.6)]">
                            {t.algoraHero.explore}
                        </MagneticButton>
                        <a href="#products" className="group text-gray-400 hover:text-primary transition-all duration-300 flex items-center gap-3 rtl:flex-row-reverse text-base md:text-lg font-medium">
                            {t.algoraHero.viewProducts}
                            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform md:w-[20px] md:h-[20px]" />
                        </a>
                    </div>
                </Motion.div>

                {/* Floating Icons */}
                <Motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute top-1/4 left-[10%] opacity-20 hidden lg:block"
                >
                    <Code size={64} className="text-primary" />
                </Motion.div>
                <Motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-[10%] opacity-20 hidden lg:block"
                >
                    <Brain size={64} className="text-secondary" />
                </Motion.div>
            </div>
        </section>
    );
};

export default AlgoraHero;
