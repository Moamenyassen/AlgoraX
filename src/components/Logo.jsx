import React, { useId } from 'react';
import { motion as Motion } from 'framer-motion';

import logoIcon from '../assets/logo-icon.webp';

// `decorative` hides the logo from screen readers (used for faint background accents).
const Logo = ({ className = "", decorative = false }) => {
    const id = useId();
    const gradient1 = `${id}-x1`;
    const gradient2 = `${id}-x2`;
    const glow = `${id}-glow`;

    // Draw the X once on load instead of looping, so it always reads as an "X".
    const xVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.3 }
        }
    };

    return (
        <div
            className={`flex items-center gap-2 select-none ${className}`}
            dir="ltr"
            {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': 'AlgoraX' })}
        >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
                <img src={logoIcon} alt="" width="48" height="48" className="w-full h-full object-contain" />
            </div>

            {/* Application Name & Animated X */}
            <div className="flex items-center gap-0">
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-lg">
                    Algora
                </span>

                <Motion.div
                    className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center ml-0.5"
                    whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 15px rgba(168,85,247,0.6))" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ overflow: 'visible' }}>
                        <defs>
                            <linearGradient id={gradient1} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                            <linearGradient id={gradient2} x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#d8b4fe" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <filter id={glow}>
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <g filter={`url(#${glow})`}>
                            <Motion.path d="M 20 20 L 80 80" stroke={`url(#${gradient1})`} strokeWidth="16" strokeLinecap="round" variants={xVariants} initial="hidden" animate="visible" />
                            <Motion.path d="M 80 20 L 20 80" stroke={`url(#${gradient2})`} strokeWidth="16" strokeLinecap="round" variants={xVariants} initial="hidden" animate="visible" />
                        </g>
                    </svg>
                </Motion.div>
            </div>
        </div>
    );
};

export default Logo;
