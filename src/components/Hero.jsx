import React from 'react';
import { motion as Motion } from 'framer-motion';
import Button from './Button';
import { ChevronRight, TrendingUp, Zap, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import algoraxDashboard from '../assets/dashboard-v2.webp';

const Hero = ({ onOpenDemo }) => {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-secondary/20 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-6 z-10 relative">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left rtl:lg:text-right">
                        <Motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-gray-300 text-sm font-medium">{t.hero.badge}</span>
                            </div>

                            <h2 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white">
                                {t.hero.titleStart} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient-x">
                                    {t.hero.titleEnd}
                                </span>
                            </h2>

                            <p className="text-gray-400 text-lg lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                {t.hero.desc}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Button variant="primary" className="flex items-center" onClick={() => onOpenDemo('demo')}>
                                    {t.hero.start} {isRTL ? <ChevronLeft aria-hidden="true" className="mr-2 w-4 h-4" /> : <ChevronRight aria-hidden="true" className="ml-2 w-4 h-4" />}
                                </Button>
                                <a href="#how-it-works" className="px-6 py-2 rounded-full font-medium border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t.hero.demo}</a>
                            </div>
                        </Motion.div>
                    </div>

                    {/* Visual Content */}
                    <div className="lg:w-1/2 relative">
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full aspect-[4/3] max-w-[600px] mx-auto perspective-1000"
                        >
                            <Motion.div
                                animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Main Image with Glow */}
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

                                <img
                                    src={algoraxDashboard}
                                    alt={t.hero.imageAlt}
                                    width="1024"
                                    height="1024"
                                    loading="lazy"
                                    className="relative z-10 w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl"
                                />

                                {/* Floating Overlay Card 1 */}
                                <Motion.div
                                    animate={{ y: [-15, 0, -15] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-8 -left-8 bg-black/60 backdrop-blur-xl border border-primary/30 p-4 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.2)] z-20"
                                    style={{ transform: "translateZ(50px)" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/20 p-2 rounded-lg text-primary"><TrendingUp size={20} /></div>
                                        <div className="text-left rtl:text-right">
                                            <div className="text-xs text-gray-400 font-medium">{t.hero.stats.planning}</div>
                                            <div className="text-xl font-bold text-white">{t.hero.stats.planningValue}</div>
                                        </div>
                                    </div>
                                </Motion.div>

                                {/* Floating Overlay Card 2 */}
                                <Motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="absolute -top-6 -right-6 bg-black/60 backdrop-blur-xl border border-secondary/30 p-4 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.2)] z-20"
                                    style={{ transform: "translateZ(30px)" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-secondary/20 p-2 rounded-lg text-secondary"><Zap size={20} /></div>
                                        <div className="text-left rtl:text-right">
                                            <div className="text-xs text-gray-400 font-medium">{t.hero.stats.rerouting}</div>
                                            <div className="text-xl font-bold text-white">{t.hero.stats.rerouteValue}</div>
                                        </div>
                                    </div>
                                </Motion.div>
                            </Motion.div>
                        </Motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
