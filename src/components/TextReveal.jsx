import React, { useState, useEffect } from 'react';

const TextReveal = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    useEffect(() => {
        if (!text) return; // Guard clause

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    if (!text) return null;

    return (
        <span className={`font-mono ${className}`}>
            {displayText}
        </span>
    );
};

export default TextReveal;
