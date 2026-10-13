import { useLanguage } from '../hooks/useLanguage';

// Discover → Design → Build → Run. Numbered because it is a real sequence.
const Process = () => {
    const { t } = useLanguage();
    return (
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.map((s, i) => (
                <li key={s.title} className="grid content-start gap-2 border-t-2 border-ink pt-4">
                    <span className="font-mono text-xs text-violet" dir="ltr">0{i + 1}</span>
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                    <p className="text-muted">{s.desc}</p>
                </li>
            ))}
        </ol>
    );
};

export default Process;
