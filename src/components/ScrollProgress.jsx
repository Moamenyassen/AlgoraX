import React from "react";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const { dir } = useLanguage();

    return (
        <Motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 origin-[0%]"
            style={{
                scaleX,
                transformOrigin: dir === 'rtl' ? '100% 50%' : '0% 50%'
            }}
        />
    );
};

export default ScrollProgress;
