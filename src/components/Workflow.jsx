import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Map, Wrench, TrendingUp, Search, ArrowDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Logo from './Logo';

const Workflow = () => {
    const { t } = useLanguage();

    const icons = [
        <Map className="w-6 h-6" />,
        <Wrench className="w-6 h-6" />,
        <TrendingUp className="w-6 h-6" />,
        <Search className="w-6 h-6" />
    ];

    const colors = [
        "from-blue-400 to-cyan-300",
        "from-cyan-300 to-teal-300",
        "from-teal-300 to-purple-400",
        "from-purple-400 to-pink-500"
    ];

    return (
        <section id="how-it-works" className="py-24 scroll-mt-20 bg-dark relative overflow-hidden">
            {/* Animated Logo Accent */}
            <Motion.div
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    opacity: [0.04, 0.09, 0.04]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 bottom-40 pointer-events-none" aria-hidden="true"
            >
                <Logo className="w-96 h-96" decorative />
            </Motion.div>

            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-medium tracking-wider uppercase text-sm">{t.workflow.label}</span>
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mt-2 mb-6">{t.workflow.title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t.workflow.desc}
                    </p>
                </Motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block transform -translate-x-1/2"></div>

                    {t.workflow.steps.map((step, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                            {/* Text Content */}
                            <Motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`md:w-5/12 text-center ${index % 2 === 0 ? 'md:text-right rtl:md:text-left' : 'md:text-left rtl:md:text-right'} mb-8 md:mb-0`}
                            >
                                <div aria-hidden="true" className={`inline-flex mb-3 md:hidden p-3 rounded-full bg-gradient-to-br ${colors[index]} shadow-lg text-black`}>
                                    {icons[index]}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                            </Motion.div>

                            {/* Center Icon (Desktop) */}
                            <Motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                aria-hidden="true"
                                className="hidden md:flex relative z-10 w-16 h-16 rounded-full bg-dark border-4 border-dark-acc items-center justify-center shadow-2xl"
                            >
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors[index]} opacity-20 blur-md`}></div>
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center text-black font-bold shadow-inner`}>
                                    {icons[index]}
                                </div>
                            </Motion.div>

                            {/* Visual/Empty Layout Placeholder */}
                            <div className="md:w-5/12"></div>
                        </div>
                    ))}

                    {/* Final Arrow */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-8"
                    >
                        <div className="animate-bounce text-primary/50" aria-hidden="true">
                            <ArrowDown size={32} />
                        </div>
                    </Motion.div>

                </div>
            </div>
        </section>
    );
};

export default Workflow;
