import { Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { ReachPanel } from '../components/Visuals';
import { SectionHead } from '../components/Section';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import CtaBand from '../components/CtaBand';

const Reach = () => {
    const { t, href } = useLanguage();
    const r = t.reach;
    return (
        <>
            <PageHero
                glow="reach"
                eyebrow={r.eyebrow}
                eyebrowClass="text-reach"
                title={r.title}
                desc={r.desc}
                actions={<>
                    <a href={`${href('contact')}#message`} className="btn bg-gradient-to-r from-teal to-cyan text-night shadow-[0_10px_40px_-10px_rgba(47,224,196,.8)] hover:-translate-y-0.5">{r.primary}</a>
                    <a href="#how" className="btn-ghost">{r.secondary}</a>
                </>}
                visual={<ReachPanel />}
            />

            <section className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(160deg,#07303a,#07061a_70%)] py-24 sm:py-28">
                <div className="container-x grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start">
                    <Reveal as="h2" className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">{r.problemTitle}</Reveal>
                    <Reveal delay={120} as="p" className="text-lg leading-relaxed text-fog">{r.problemDesc}</Reveal>
                </div>
            </section>

            <section id="how" className="container-x grid scroll-mt-24 gap-14 py-24 sm:py-32">
                <SectionHead eyebrow={r.stepsEyebrow} title={r.stepsTitle} tone="text-reach" />
                <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {r.steps.map((s, i) => (
                        <Reveal as="li" key={s.title} delay={i * 110} className="h-full">
                            <div className="group spot ring-glow relative grid h-full content-start gap-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1">
                                <span className="font-mono text-sm text-reach" dir="ltr">0{i + 1}</span>
                                <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                                <p className="text-fog">{s.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </ol>
                <Reveal className="glass grid gap-4 p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
                    <h3 className="font-display text-xl font-bold text-white">{r.forTitle}</h3>
                    <ul className="flex flex-wrap gap-3">
                        {r.for.map((x) => <li key={x} className="flex items-center gap-2 rounded-full border border-reach/30 bg-reach/10 px-4 py-2 text-sm text-white"><Check size={15} className="text-reach" aria-hidden="true" />{x}</li>)}
                    </ul>
                </Reveal>
            </section>

            <CtaBand title={r.ctaTitle} desc={r.ctaDesc} topic="reach" />
        </>
    );
};

export default Reach;
