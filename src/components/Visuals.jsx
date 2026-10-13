import { useLanguage } from '../hooks/useLanguage';

// Hero picture: the Algora ribbon splitting into its two products.
export const Ribbon = () => (
    <svg viewBox="0 0 420 300" className="h-auto w-full" role="img" aria-label="Algora: Reach and Mindo" dir="ltr" style={{ direction: 'ltr' }}>
        <defs>
            <linearGradient id="rg-reach" x1="0" x2="1"><stop offset="0" stopColor="#6a47dc" /><stop offset=".6" stopColor="#3fb7c9" /><stop offset="1" stopColor="#2fc4b4" /></linearGradient>
            <linearGradient id="rg-mindo" x1="0" x2="1"><stop offset="0" stopColor="#6a47dc" /><stop offset=".6" stopColor="#cc4f79" /><stop offset="1" stopColor="#f2b66b" /></linearGradient>
        </defs>
        <path d="M10 150 C 90 150, 120 150, 170 150" stroke="#6a47dc" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M170 150 C 230 150, 240 70, 330 70" stroke="url(#rg-reach)" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M170 150 C 230 150, 240 230, 330 230" stroke="url(#rg-mindo)" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path className="flow" d="M170 150 C 230 150, 240 70, 330 70" stroke="#fff" strokeWidth="2" fill="none" opacity=".85" />
        <path className="flow" d="M170 150 C 230 150, 240 230, 330 230" stroke="#fff" strokeWidth="2" fill="none" opacity=".85" />
        <circle cx="352" cy="70" r="9" fill="#0f9c94" />
        <circle cx="352" cy="230" r="9" fill="#cc4f79" />
        <text x="300" y="40" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="700" fontSize="20" fill="#17142b">Reach</text>
        <text x="300" y="274" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="700" fontSize="20" fill="#17142b">Mindo</text>
        <text x="14" y="125" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#6b6680">ALGORA</text>
    </svg>
);

// Small dark route map for the Reach product card.
export const RouteMini = () => (
    <svg viewBox="0 0 300 120" className="h-auto w-full rounded-xl" aria-hidden="true">
        <rect width="300" height="120" fill="#0b2e36" />
        <path d="M0 40H300M0 80H300M60 0V120M140 0V120M220 0V120" stroke="#174652" />
        <path d="M24 96 L70 60 L118 74 L160 34 L214 52 L270 22" stroke="#5fe0d2" strokeWidth="3" fill="none" strokeLinejoin="round" />
        <g fill="#5fe0d2"><circle cx="24" cy="96" r="5" /><circle cx="70" cy="60" r="5" /><circle cx="118" cy="74" r="5" /><circle cx="160" cy="34" r="5" /><circle cx="214" cy="52" r="5" /><circle cx="270" cy="22" r="6" /></g>
        <circle cx="190" cy="92" r="6" fill="none" stroke="#f2b66b" strokeWidth="2" />
    </svg>
);

// Small dark "what shoppers like" bars for the Mindo product card.
export const ShelfMini = () => {
    const { t } = useLanguage();
    const widths = [160, 124, 92, 64];
    const colors = ['#cc4f79', '#d9637f', '#e88a7a', '#f2b66b'];
    return (
        <div className="grid gap-3 rounded-xl bg-[#33172a] p-4" aria-hidden="true">
            {t.mindo.sections.map((label, i) => (
                <div key={label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3">
                    <span className="eyebrow text-[10px] text-mindo-glow">{label}</span>
                    <span className="block h-2.5 rounded-full" style={{ width: `${(widths[i] / 160) * 100}%`, background: colors[i] }} />
                </div>
            ))}
        </div>
    );
};

// Light route panel for the Reach page hero (illustration with example data).
export const ReachPanel = () => {
    const { t } = useLanguage();
    const v = t.reach.visual;
    return (
        <figure className="grid gap-3 rounded-2xl border border-[#d5e6e6] bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,61,71,.5)]">
            <figcaption className="flex justify-between text-sm text-[#4f6b6e]"><span>{v.rep}</span><span className="eyebrow text-[10px] text-[#8aa1a3]">{v.example}</span></figcaption>
            <svg viewBox="0 0 300 150" className="h-auto w-full rounded-xl" aria-hidden="true" dir="ltr" style={{ direction: 'ltr' }}>
                <rect width="300" height="150" fill="#eef6f6" />
                <path d="M0 50H300M0 100H300M75 0V150M150 0V150M225 0V150" stroke="#d6e8e8" />
                <path className="flow" d="M20 130 L80 90 L120 104 L170 52 L230 70 L280 26" stroke="#0f9c94" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
                <g fill="#0f3d47"><circle cx="20" cy="130" r="6" /><circle cx="80" cy="90" r="6" /><circle cx="120" cy="104" r="6" /><circle cx="170" cy="52" r="6" /><circle cx="230" cy="70" r="6" /><circle cx="280" cy="26" r="7" /></g>
                <circle cx="200" cy="118" r="7" fill="none" stroke="#e08a2e" strokeWidth="2.5" />
            </svg>
            <div className="flex justify-between text-sm"><span className="text-[#4f6b6e]">{v.stops}</span><span className="text-amber-deep">{v.nearby}</span></div>
        </figure>
    );
};

// Shopper behaviour panel for the Mindo page hero (illustration with example data).
export const MindoPanel = () => {
    const { t } = useLanguage();
    const v = t.mindo.visual;
    const values = [100, 62, 38, 24];
    return (
        <figure className="grid gap-3 rounded-2xl border border-[#ecdfe3] bg-white p-5 shadow-[0_16px_40px_-24px_rgba(120,40,70,.4)]">
            <figcaption className="flex justify-between text-sm text-[#6b5a62]"><span>{v.title}</span><span className="eyebrow text-[10px] text-[#a08a92]">{v.example}</span></figcaption>
            <div className="grid gap-2.5">
                {v.rows.map((label, i) => (
                    <div key={label} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-sm">
                        <span>{label}</span>
                        <span className="block h-2.5 rounded-full bg-gradient-to-r from-mindo to-amber" style={{ width: `${values[i]}%` }} />
                        <span className="text-end font-mono text-xs text-[#6b5a62]" dir="ltr">{values[i]}%</span>
                    </div>
                ))}
            </div>
            <p className="rounded-xl bg-[#fff4ec] px-3 py-2.5 text-sm text-[#6a3a2a]">{v.insight}</p>
        </figure>
    );
};
