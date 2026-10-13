
// Section heading: a small label, a title and an optional intro line.
export const SectionHead = ({ eyebrow, title, desc, tone = 'text-violet', light = false, className = '' }) => (
    <div className={`grid gap-3 max-w-2xl ${className}`}>
        {eyebrow && <span className={`eyebrow ${tone}`}>{eyebrow}</span>}
        <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {desc && <p className={`text-lg ${light ? 'text-[#c8c3dc]' : 'text-muted'}`}>{desc}</p>}
    </div>
);
