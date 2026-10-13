import { useLanguage } from '../hooks/useLanguage';
import { SectionHead } from '../components/Section';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Process from '../components/Process';
import CtaBand from '../components/CtaBand';
import { serviceIcons } from '../components/serviceIcons';

const Solutions = () => {
    const { t } = useLanguage();
    const s = t.solutions;
    return (
        <>
            <PageHero eyebrow={s.eyebrow} title={s.title} desc={s.desc} />
            <section className="container-x grid gap-14 pb-24 sm:pb-32">
                <SectionHead title={s.servicesTitle} />
                <div className="grid gap-5 md:grid-cols-3">
                    {t.services.map((x, i) => {
                        const Icon = serviceIcons[x.key];
                        return (
                            <Reveal key={x.key} delay={i * 110} className="h-full">
                                <div className="group spot ring-glow relative grid h-full content-start gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-transform duration-300 hover:-translate-y-1">
                                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/10 text-white ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"><Icon size={26} aria-hidden="true" /></span>
                                    <h3 className="font-display text-2xl font-bold text-white">{x.title}</h3>
                                    <p className="text-fog">{x.desc}</p>
                                    <p className="border-t border-white/10 pt-4 text-sm text-violet-soft">{s.examples[x.key]}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>
            <section className="container-x grid gap-14 pb-24 sm:pb-32">
                <SectionHead title={s.processTitle} />
                <Process />
            </section>
            <CtaBand title={s.ctaTitle} desc={s.ctaDesc} topic="solutions" />
        </>
    );
};

export default Solutions;
