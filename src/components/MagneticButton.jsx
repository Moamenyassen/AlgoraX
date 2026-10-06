import React, { useRef } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';

// Renders a link when `href` is given, otherwise a button.
const MagneticButton = ({ children, className = "", onClick, href, variant = "primary" }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * 0.2);
        y.set((e.clientY - (top + height / 2)) * 0.2);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const baseStyles = "relative inline-flex px-8 py-4 rounded-full text-lg font-medium transition-colors overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark";
    const variants = {
        primary: "bg-primary text-black hover:bg-white",
        secondary: "bg-transparent border border-white/20 text-white hover:border-primary hover:text-primary backdrop-blur-sm"
    };

    const Component = href ? Motion.a : Motion.button;

    return (
        <Component
            ref={ref}
            href={href}
            type={href ? undefined : 'button'}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {/* Liquid Background for Primary */}
            {variant === 'primary' && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-white to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                {children}
            </span>
        </Component>
    );
};

export default MagneticButton;
