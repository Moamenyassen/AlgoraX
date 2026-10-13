import { useLanguage } from '../hooks/useLanguage';

const ROUTE = 'M24 96 L70 60 L118 74 L160 34 L214 52 L270 22';
const STOPS = [[24, 96], [70, 60], [118, 74], [160, 34], [214, 52], [270, 22]];

// Route map that draws itself, with a prospect pinging next to the route.
export const RouteMini = ({ tall = false }) => (
    <svg viewBox="0 0 300 120" className={`h-auto w-full ${tall ? '' : 'rounded-2xl'}`} aria-hidden="true" style={{ direction: 'ltr' }}>
        <defs>
            <linearGradient id="route-line" x1="0" x2="1"><stop offset="0" stopColor="#7c5cff" /><stop offset="1" stopColor="#2fe0c4" /></linearGradient>
            <filter id="route-glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <rect width="300" height="120" fill="#06202a" />
        <path d="M0 30H300M0 60H300M0 90H300M50 0V120M100 0V120M150 0V120M200 0V120M250 0V120" stroke="#0d3440" />
        <path d={ROUTE} stroke="#2fe0c4" strokeOpacity=".15" strokeWidth="3" fill="none" strokeLinejoin="round" />
        <path className="draw" d={ROUTE} stroke="url(#route-line)" strokeWidth="6" fill="none" strokeLinejoin="round" filter="url(#route-glow)" opacity=".7" />
        <path className="draw" d={ROUTE} stroke="url(#route-line)" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        {STOPS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 5 ? 6 : 4.5} fill="#06202a" stroke="#2fe0c4" strokeWidth="2" />)}
        <circle className="ping-dot" cx="190" cy="92" r="5" fill="#ffb35c" />
        <circle cx="190" cy="92" r="5" fill="#ffb35c" />
    </svg>
);

// Bars that fill in turn, showing which shelves shoppers respond to.
export const ShelfMini = () => {
    const { t } = useLanguage();
    const widths = [100, 78, 58, 40];
    return (
        <div className="grid gap-3.5 rounded-2xl bg-[#1d0a18] p-5" aria-hidden="true">
            {t.mindo.sections.map((label, i) => (
                <div key={label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3">
                    <span className="eyebrow text-[10px] text-mindo/90">{label}</span>
                    <span className="block h-2.5 rounded-full bg-white/5">
                        <span className="bar-grow block h-full rounded-full bg-gradient-to-r from-mindo to-mindo-amber shadow-[0_0_14px_rgba(255,92,147,.6)]" style={{ width: `${widths[i]}%`, '--d': `${i * 180}ms` }} />
                    </span>
                </div>
            ))}
        </div>
    );
};

// Reach page hero: a live-looking route plan (illustration with example data).
export const ReachPanel = () => {
    const { t } = useLanguage();
    const v = t.reach.visual;
    return (
        <figure className="glass ring-glow spot tilt relative grid gap-4 overflow-hidden p-5 shadow-[0_30px_80px_-30px_rgba(47,224,196,.45)]">
            <figcaption className="flex items-center justify-between text-sm text-fog">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-reach shadow-[0_0_10px_#2fe0c4]" />{v.rep}</span>
                <span className="eyebrow text-[10px] text-dim">{v.example}</span>
            </figcaption>
            <div className="overflow-hidden rounded-2xl"><RouteMini tall /></div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-fog">{v.stops}</span>
                <span className="rounded-xl border border-mindo-amber/30 bg-mindo-amber/10 px-3 py-2 text-mindo-amber">{v.nearby}</span>
            </div>
        </figure>
    );
};

// Mindo page hero: shopper behaviour that keeps updating (illustration with example data).
export const MindoPanel = () => {
    const { t } = useLanguage();
    const v = t.mindo.visual;
    const values = [100, 62, 38, 24];
    return (
        <figure className="glass ring-glow spot tilt relative grid gap-4 overflow-hidden p-5 shadow-[0_30px_80px_-30px_rgba(255,92,147,.45)]">
            <figcaption className="flex items-center justify-between text-sm text-fog">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-mindo shadow-[0_0_10px_#ff5c93]" />{v.title}</span>
                <span className="eyebrow text-[10px] text-dim">{v.example}</span>
            </figcaption>
            <div className="grid gap-3">
                {v.rows.map((label, i) => (
                    <div key={label} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-sm text-fog">
                        <span>{label}</span>
                        <span className="block h-2.5 rounded-full bg-white/5">
                            <span className="bar-grow block h-full rounded-full bg-gradient-to-r from-mindo to-mindo-amber" style={{ width: `${values[i]}%`, '--d': `${i * 200}ms` }} />
                        </span>
                        <span className="text-end font-mono text-xs text-dim" dir="ltr">{values[i]}%</span>
                    </div>
                ))}
            </div>
            <p className="rounded-xl border border-mindo-amber/25 bg-mindo-amber/10 px-3 py-2.5 text-sm text-[#ffd9b0]">{v.insight}</p>
        </figure>
    );
};
