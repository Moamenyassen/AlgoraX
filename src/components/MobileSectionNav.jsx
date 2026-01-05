import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const MobileSectionNav = () => {
    const [direction, setDirection] = useState('down'); // 'down' or 'up'
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Only relevant on mobile, but CSS handles display.
            // We'll fade it in a bit after scrolling, or always show if desirable.
            setIsVisible(true);

            // Check if near bottom to switch direction
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.offsetHeight;

            // Tolerance of 50px
            if (scrollPosition >= documentHeight - 50) {
                setDirection('up');
            } else {
                setDirection('down');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNav = () => {
        if (direction === 'up') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Strategy: Find all potential "sections" (main children + footer)
        // We want the next one that starts significantly below current scroll
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');

        let candidates = [];
        if (main) {
            candidates = Array.from(main.children);
        }
        if (footer) {
            candidates.push(footer);
        }

        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Find the first element whose TOP is definitely below the current view top
        // We add a small buffer (e.g. 100px) so we don't just stay on a large section
        let nextTarget = candidates.find(el => {
            const rect = el.getBoundingClientRect();
            const absTop = rect.top + window.scrollY;

            // If the element's top is further down than where we are + a bit
            return absTop > currentScroll + (viewportHeight * 0.3);
        });

        if (nextTarget) {
            nextTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Fallback: Scroll down one page height
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <Motion.button
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    onClick={handleNav}
                    className="md:hidden fixed bottom-6 right-6 z-50 bg-primary/90 text-black p-3 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] backdrop-blur-sm border border-white/20 hover:scale-110 active:scale-95 transition-all"
                    aria-label={direction === 'up' ? "Scroll to top" : "Next section"}
                >
                    {direction === 'up' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </Motion.button>
            )}
        </AnimatePresence>
    );
};

export default MobileSectionNav;
