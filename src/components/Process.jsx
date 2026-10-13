import { useLanguage } from '../hooks/useLanguage';
import Reveal from './Reveal';

// Discover → Design → Build → Run. Numbered because it is a real sequence; a glowing line links the steps.
const Process = () => {
    const { t } = useLanguage();
    return (
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute inset-x-0 top-5 hidden h-px bg-gradient-to-r from-violet/0 via-violet/60 to-cyan/0 lg:block" />
            {t.process.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 110} className="relative grid content-start gap-3">
                    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-violet/50 bg-night font-mono text-sm text-violet-soft shadow-[0_0_24px_rgba(124,92,255,.45)]" dir="ltr">0{i + 1}</span>
                    <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                    <p className="text-fog">{s.desc}</p>
                </Reveal>
            ))}
        </ol>
    );
};

export default Process;
