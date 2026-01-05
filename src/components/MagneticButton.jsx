import React, { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';

const MagneticButton = ({ children, className = "", onClick, variant = "primary" }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative px-8 py-4 rounded-full text-lg font-medium transition-colors overflow-hidden group";
    const variants = {
        primary: "bg-primary text-black hover:bg-white",
        secondary: "bg-transparent border border-white/20 text-white hover:border-primary hover:text-primary backdrop-blur-sm"
    };

    return (
        <Motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {/* Liquid Background for Primary */}
            {variant === 'primary' && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-white to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </Motion.button>
    );
};

export default MagneticButton;
