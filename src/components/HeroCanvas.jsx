import { useEffect, useRef } from 'react';

// Animated hero background: streams of light flow along one ribbon that splits into two strands,
// one for Reach (violet to teal) and one for Mindo (violet to pink). Draws a single still frame
// for people who turn motion off, and pauses while off screen.
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(lerp(v, c2[i], t)));
const VIOLET = [124, 92, 255];
const TEAL = [47, 224, 196];
const PINK = [255, 92, 147];

const bezier = (p0, p1, p2, p3, t) => {
    const u = 1 - t;
    return [
        u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
};

const HeroCanvas = ({ rtl = false }) => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
        let mouse = [0, 0], target = [0, 0];

        const count = window.innerWidth < 700 ? 140 : 320;
        const particles = Array.from({ length: count }, () => ({
            t: Math.random(),
            speed: 0.0012 + Math.random() * 0.0022,
            branch: Math.random() < 0.5 ? 0 : 1,
            off: (Math.random() - 0.5) * 2,
            size: 0.6 + Math.random() * 1.8,
            wob: Math.random() * Math.PI * 2,
        }));
        const stars = Array.from({ length: 90 }, () => [Math.random(), Math.random(), Math.random() * 0.8 + 0.2]);

        const paths = () => {
            const split = [w * 0.5, h * 0.55];
            const trunk = [[-w * 0.05, h * 0.62], [w * 0.15, h * 0.6], [w * 0.3, h * 0.56], split];
            const up = [split, [w * 0.66, h * 0.54], [w * 0.74, h * 0.2], [w * 1.05, h * 0.18]];
            const down = [split, [w * 0.66, h * 0.56], [w * 0.74, h * 0.9], [w * 1.05, h * 0.88]];
            return { trunk, branches: [up, down] };
        };

        const resize = () => {
            const r = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = r.width; h = r.height;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const point = (p, { trunk, branches }) => {
            // First 45% of the journey runs along the trunk, the rest along one of the branches.
            const onTrunk = p.t < 0.45;
            const local = onTrunk ? p.t / 0.45 : (p.t - 0.45) / 0.55;
            const seg = onTrunk ? trunk : branches[p.branch];
            const [x, y] = bezier(...seg, local);
            const spread = (onTrunk ? 16 : 10 + local * 46) * p.off;
            return [x, y + spread + Math.sin(p.wob + p.t * 12) * 3];
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            mouse = [lerp(mouse[0], target[0], 0.05), lerp(mouse[1], target[1], 0.05)];
            const geo = paths();

            ctx.save();
            if (rtl) { ctx.translate(w, 0); ctx.scale(-1, 1); }
            ctx.translate(mouse[0] * 18, mouse[1] * 12);

            stars.forEach(([sx, sy, a]) => {
                ctx.fillStyle = `rgba(185,180,214,${a * 0.35})`;
                ctx.fillRect(sx * w, sy * h, 1.2, 1.2);
            });

            // Soft guide lines under the particles
            ctx.lineWidth = 1;
            [geo.trunk, ...geo.branches].forEach((seg, i) => {
                const g = ctx.createLinearGradient(seg[0][0], 0, seg[3][0], 0);
                g.addColorStop(0, 'rgba(124,92,255,0.25)');
                g.addColorStop(1, i === 2 ? 'rgba(255,92,147,0.25)' : 'rgba(47,224,196,0.25)');
                ctx.strokeStyle = g;
                ctx.beginPath(); ctx.moveTo(...seg[0]); ctx.bezierCurveTo(...seg[1], ...seg[2], ...seg[3]); ctx.stroke();
            });

            ctx.globalCompositeOperation = 'lighter';
            particles.forEach((p) => {
                const [x, y] = point(p, geo);
                const k = p.t < 0.45 ? 0 : (p.t - 0.45) / 0.55;
                const [r, g, b] = mix(VIOLET, p.branch ? PINK : TEAL, k);
                const a = Math.sin(Math.PI * p.t) * 0.9;
                ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.18})`;
                ctx.beginPath(); ctx.arc(x, y, p.size * 4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
                if (!reduce) { p.t += p.speed; if (p.t > 1) { p.t = 0; p.branch = Math.random() < 0.5 ? 0 : 1; } }
            });

            // Glowing end nodes
            geo.branches.forEach((seg, i) => {
                const [x, y] = bezier(...seg, 0.82);
                const c = i ? PINK : TEAL;
                const g = ctx.createRadialGradient(x, y, 0, x, y, 40);
                g.addColorStop(0, `rgba(${c.join(',')},0.55)`);
                g.addColorStop(1, `rgba(${c.join(',')},0)`);
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 40, 0, Math.PI * 2); ctx.fill();
            });
            ctx.restore();
            ctx.globalCompositeOperation = 'source-over';

            if (!reduce && visible) raf = requestAnimationFrame(draw);
        };

        resize();
        draw();
        const onResize = () => { resize(); if (reduce) draw(); };
        const onMove = (e) => { target = [e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5]; };
        const io = new IntersectionObserver(([e]) => {
            const was = visible;
            visible = e.isIntersecting;
            if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
        });
        io.observe(canvas);
        window.addEventListener('resize', onResize);
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onMove);
        };
    }, [rtl]);

    return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

export default HeroCanvas;
