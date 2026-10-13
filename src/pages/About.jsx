import { useLanguage } from '../hooks/useLanguage';
import { SectionHead } from '../components/Section';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import ProductCards from '../components/ProductCards';
import CtaBand from '../components/CtaBand';

const About = () => {
    const { t } = useLanguage();
    const a = t.about;
    return (
        <>
            <PageHero eyebrow={a.eyebrow} title={a.title} desc={a.desc} />
            <section className="container-x grid gap-14 pb-24 sm:pb-32">
                <SectionHead title={a.beliefsTitle} />
                <div className="grid gap-5 md:grid-cols-3">
                    {a.beliefs.map((b, i) => (
                        <Reveal key={b.title} delay={i * 110} className="h-full">
                            <div className="spot ring-glow relative grid h-full content-start gap-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                                <span className="flex items-center gap-3" aria-hidden="true"><span className="text-ribbon font-display text-4xl font-extrabold" dir="ltr">0{i + 1}</span><span className="h-1 w-10 rounded-full bg-ribbon" /></span>
                                <h3 className="font-display text-2xl font-bold text-white">{b.title}</h3>
                                <p className="text-fog">{b.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
            <section className="border-y border-white/10 bg-white/[0.02] py-24 sm:py-32">
                <div className="container-x grid gap-14">
                    <SectionHead title={a.productsTitle} center />
                    <ProductCards />
                </div>
            </section>
            <CtaBand />
        </>
    );
};

export default About;
