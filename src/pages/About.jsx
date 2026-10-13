import { useLanguage } from '../hooks/useLanguage';
import { SectionHead } from '../components/Section';
import ProductCards from '../components/ProductCards';
import CtaBand from '../components/CtaBand';

const About = () => {
    const { t } = useLanguage();
    const a = t.about;
    return (
        <>
            <section className="container-x grid gap-5 py-14 sm:py-20">
                <span className="eyebrow text-violet">{a.eyebrow}</span>
                <h1 className="max-w-3xl font-display text-[clamp(2.3rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">{a.title}</h1>
                <p className="max-w-2xl text-lg text-muted">{a.desc}</p>
                <span className="h-1 w-24 rounded-full bg-ribbon" aria-hidden="true" />
            </section>
            <section className="container-x grid gap-8 pb-16 sm:pb-20">
                <SectionHead title={a.beliefsTitle} />
                <div className="grid gap-4 md:grid-cols-3">
                    {a.beliefs.map((b) => (
                        <div key={b.title} className="grid content-start gap-2 rounded-2xl border border-line bg-white p-6">
                            <h3 className="font-display text-xl font-bold">{b.title}</h3>
                            <p className="text-muted">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-ink py-16 sm:py-20">
                <div className="container-x grid gap-8">
                    <SectionHead title={a.productsTitle} light />
                    <ProductCards />
                </div>
            </section>
            <CtaBand />
        </>
    );
};

export default About;
