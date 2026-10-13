import { Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { ReachPanel } from '../components/Visuals';
import { SectionHead } from '../components/Section';
import CtaBand from '../components/CtaBand';

const Reach = () => {
    const { t, href } = useLanguage();
    const r = t.reach;
    return (
        <>
            <section className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
                <div className="grid gap-5">
                    <span className="eyebrow text-reach">{r.eyebrow}</span>
                    <h1 className="font-display text-[clamp(2.3rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">{r.title}</h1>
                    <p className="max-w-xl text-lg text-muted">{r.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <a href={`${href('contact')}#message`} className="btn bg-reach-deep text-white hover:bg-reach">{r.primary}</a>
                        <a href="#how" className="btn-ghost">{r.secondary}</a>
                    </div>
                </div>
                <ReachPanel />
            </section>

            <section className="bg-gradient-to-br from-reach-deep to-reach-night py-16 text-white sm:py-20">
                <div className="container-x grid gap-4 md:grid-cols-[1fr_1.3fr] md:items-start">
                    <h2 className="font-display text-3xl font-bold sm:text-4xl">{r.problemTitle}</h2>
                    <p className="text-lg text-[#c8dcdc]">{r.problemDesc}</p>
                </div>
            </section>

            <section id="how" className="container-x grid scroll-mt-20 gap-8 py-16 sm:py-20">
                <SectionHead eyebrow={r.stepsEyebrow} title={r.stepsTitle} tone="text-reach" />
                <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {r.steps.map((s, i) => (
                        <li key={s.title} className="grid content-start gap-2 rounded-2xl border border-line bg-white p-5">
                            <span className="font-mono text-xs text-reach" dir="ltr">0{i + 1}</span>
                            <h3 className="font-display text-xl font-bold">{s.title}</h3>
                            <p className="text-muted">{s.desc}</p>
                        </li>
                    ))}
                </ol>
                <div className="grid gap-3 rounded-2xl border border-line bg-white p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                    <h3 className="font-display text-xl font-bold">{r.forTitle}</h3>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
                        {r.for.map((x) => <li key={x} className="flex items-center gap-2"><Check size={16} className="text-reach" aria-hidden="true" />{x}</li>)}
                    </ul>
                </div>
            </section>

            <CtaBand title={r.ctaTitle} desc={r.ctaDesc} topic="reach" />
        </>
    );
};

export default Reach;
