import React from 'react';
import { motion as Motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false, ...rest }) => {
    const baseStyle = "px-6 py-2 rounded-full font-medium transition-all duration-300 transform shadow-[0_0_10px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
        secondary: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
        glow: "bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
    };

    return (
        <Motion.button
            whileTap={disabled ? undefined : { scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {children}
        </Motion.button>
    );
};

export default Button;
