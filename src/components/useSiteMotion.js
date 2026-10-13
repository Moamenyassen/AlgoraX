import { useEffect } from 'react';

// Site-wide motion: reveals sections as they scroll into view, moves the light inside `.spot` cards
// with the pointer, and tilts `.tilt` cards slightly. Nothing moves when the visitor turns motion off.
export const useSiteMotion = () => {
    useEffect(() => {
        const root = document.documentElement;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        root.classList.add('js');
        window.__motionReady = true;

        const items = document.querySelectorAll('.reveal');
        let observer;
        if (reduce || !('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('in'));
        } else {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        observer.unobserve(e.target);
                    }
                });
            }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
            items.forEach((el) => observer.observe(el));
        }

        const onMove = (e) => {
            const spot = e.target.closest?.('.spot');
            if (spot) {
                const r = spot.getBoundingClientRect();
                spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
                spot.style.setProperty('--my', `${e.clientY - r.top}px`);
            }
            if (reduce) return;
            const tilt = e.target.closest?.('.tilt');
            if (tilt) {
                const r = tilt.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                tilt.style.setProperty('--rx', `${x * 6}deg`);
                tilt.style.setProperty('--ry', `${-y * 6}deg`);
            }
        };
        const onLeave = (e) => {
            const tilt = e.target.closest?.('.tilt');
            if (tilt && !tilt.contains(e.relatedTarget)) {
                tilt.style.setProperty('--rx', '0deg');
                tilt.style.setProperty('--ry', '0deg');
            }
        };
        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerout', onLeave, { passive: true });
        return () => {
            observer?.disconnect();
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerout', onLeave);
        };
    }, []);
};
