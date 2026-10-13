import { useLanguage } from '../hooks/useLanguage';
import { SectionHead } from '../components/Section';
import Process from '../components/Process';
import CtaBand from '../components/CtaBand';
import { serviceIcons } from '../components/serviceIcons';

const Solutions = () => {
    const { t } = useLanguage();
    const s = t.solutions;
    return (
        <>
            <section className="container-x grid gap-5 py-14 sm:py-20">
                <span className="eyebrow text-violet">{s.eyebrow}</span>
                <h1 className="max-w-3xl font-display text-[clamp(2.3rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">{s.title}</h1>
                <p className="max-w-2xl text-lg text-muted">{s.desc}</p>
            </section>
            <section className="container-x grid gap-8 pb-16 sm:pb-20">
                <SectionHead title={s.servicesTitle} />
                <div className="grid gap-4 md:grid-cols-3">
                    {t.services.map((x) => {
                        const Icon = serviceIcons[x.key];
                        return (
                            <div key={x.key} className="grid content-start gap-3 rounded-2xl border border-line bg-white p-6">
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet"><Icon size={22} aria-hidden="true" /></span>
                                <h3 className="font-display text-xl font-bold">{x.title}</h3>
                                <p className="text-muted">{x.desc}</p>
                                <p className="border-t border-line pt-3 text-sm text-ink">{s.examples[x.key]}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="container-x grid gap-8 pb-16 sm:pb-20">
                <SectionHead title={s.processTitle} />
                <Process />
            </section>
            <CtaBand title={s.ctaTitle} desc={s.ctaDesc} topic="solutions" />
        </>
    );
};

export default Solutions;
