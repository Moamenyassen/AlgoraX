import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
const LATIN_ONLY = /^[\x20-\x7E]*$/;

// Scrambles Latin text into place. Screen readers always get the real text, and
// non-Latin text (e.g. Arabic) or reduced-motion users see the final text immediately.
const TextReveal = ({ text, className = "" }) => {
    const reduceMotion = useReducedMotion();
    const animate = Boolean(text) && !reduceMotion && LATIN_ONLY.test(text);
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!animate) return;

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => (index < iterations ? letter : CHARS[Math.floor(Math.random() * CHARS.length)]))
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text, animate]);

    if (!text) return null;

    return (
        <span className={className}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true" className={animate ? "font-mono" : undefined}>
                {animate ? displayText : text}
            </span>
        </span>
    );
};

export default TextReveal;
