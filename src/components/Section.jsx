import Reveal from './Reveal';

// Section heading: a small label, a title and an optional intro line.
export const SectionHead = ({ eyebrow, title, desc, tone = 'text-violet-soft', center = false, className = '' }) => (
    <Reveal className={`grid gap-4 ${center ? 'mx-auto max-w-3xl justify-items-center text-center' : 'max-w-2xl'} ${className}`}>
        {eyebrow && <span className={`eyebrow ${tone}`}><span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />{eyebrow}</span>}
        <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">{title}</h2>
        {desc && <p className="text-lg leading-relaxed text-fog">{desc}</p>}
    </Reveal>
);
