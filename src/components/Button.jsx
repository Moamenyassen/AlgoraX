import React from 'react';
import { motion as Motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseStyle = "px-6 py-2 rounded-full font-medium transition-all duration-300 transform shadow-[0_0_10px_rgba(0,0,0,0.3)]";

    const variants = {
        primary: "bg-primary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
        secondary: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
        glow: "bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(189,0,255,0.5)]"
    };

    return (
        <Motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </Motion.button>
    );
};

export default Button;
