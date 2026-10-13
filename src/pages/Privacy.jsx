import { useLanguage } from '../hooks/useLanguage';

const Privacy = () => {
    const { t } = useLanguage();
    const p = t.privacy;
    return (
        <section className="container-x grid max-w-3xl gap-8 py-14 sm:py-20">
            <div className="grid gap-2">
                <h1 className="font-display text-4xl font-extrabold">{p.title}</h1>
                <p className="text-sm text-muted">{p.updated}</p>
            </div>
            {p.sections.map((s) => (
                <div key={s.title} className="grid gap-2">
                    <h2 className="font-display text-xl font-bold">{s.title}</h2>
                    <p className="text-muted">{s.body}</p>
                </div>
            ))}
        </section>
    );
};

export default Privacy;
