import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { MindoPanel } from '../components/Visuals';
import { SectionHead } from '../components/Section';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import MindoMark from '../components/MindoMark';
import CtaBand from '../components/CtaBand';

const Mindo = () => {
    const { t, href } = useLanguage();
    const m = t.mindo;
    return (
        <>
            <PageHero
                glow="mindo"
                eyebrow={<><MindoMark size={26} /><span>{m.eyebrow}</span></>}
                eyebrowClass="text-mindo"
                title={m.title}
                desc={m.desc}
                actions={<>
                    <a href={`${href('contact')}#message`} className="btn bg-gradient-to-r from-mindo to-mindo-amber text-white shadow-[0_10px_40px_-10px_rgba(255,92,147,.8)] hover:-translate-y-0.5">{m.primary}</a>
                    <a href="#client" className="btn-ghost">{m.secondary}</a>
                </>}
                visual={<MindoPanel />}
            />

            <section className="container-x grid gap-14 py-24 sm:py-32">
                <SectionHead eyebrow={m.learnsEyebrow} title={m.learnsTitle} tone="text-mindo" />
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {m.learns.map((s, i) => (
                        <Reveal as="li" key={s.title} delay={i * 110} className="h-full">
                            <div className="group spot ring-glow relative grid h-full content-start gap-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1">
                                <span className={`eyebrow ${i < 2 ? 'text-mindo' : 'text-mindo-amber'}`}>{s.tag}</span>
                                <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                                <p className="text-fog">{s.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </section>

            <section id="client" className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-[linear-gradient(160deg,#3a0d29,#07061a_75%)] py-24 sm:py-28">
                <div aria-hidden="true" className="orb absolute -end-24 -top-24 h-96 w-96 rounded-full bg-mindo/25 blur-[130px]" />
                <div className="container-x relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
                    <Reveal className="grid gap-4">
                        <span className="eyebrow text-mindo"><span className="h-px w-6 bg-current opacity-60" />{m.clientEyebrow}</span>
                        <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-none tracking-tight text-white" dir="ltr" style={{ textAlign: 'start' }}>{m.clientTitle}</h2>
                        <p className="text-lg leading-relaxed text-fog">{m.clientDesc}</p>
                    </Reveal>
                    <Reveal delay={150} className="grid justify-items-start md:justify-items-end">
                        <a href="https://www.glowy-shop.com" target="_blank" rel="noopener" className="btn-light">{m.clientCta} <ArrowUpRight size={16} aria-hidden="true" /></a>
                    </Reveal>
                </div>
            </section>

            <CtaBand title={m.ctaTitle} desc={m.ctaDesc} topic="mindo" />
        </>
    );
};

export default Mindo;
