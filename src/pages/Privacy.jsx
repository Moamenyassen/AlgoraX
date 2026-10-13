import { useLanguage } from '../hooks/useLanguage';

const Privacy = () => {
    const { t } = useLanguage();
    const p = t.privacy;
    return (
        <section className="container-x grid max-w-3xl gap-10 pb-24 pt-36 sm:pt-44">
            <div className="grid gap-3">
                <h1 className="font-display text-5xl font-extrabold tracking-tight text-white">{p.title}</h1>
                <p className="text-sm text-dim">{p.updated}</p>
            </div>
            {p.sections.map((s) => (
                <div key={s.title} className="grid gap-2 border-t border-white/10 pt-6">
                    <h2 className="font-display text-xl font-bold text-white">{s.title}</h2>
                    <p className="leading-relaxed text-fog">{s.body}</p>
                </div>
            ))}
        </section>
    );
};

export default Privacy;
