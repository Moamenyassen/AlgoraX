import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { MindoPanel } from '../components/Visuals';
import { SectionHead } from '../components/Section';
import MindoMark from '../components/MindoMark';
import CtaBand from '../components/CtaBand';

const Mindo = () => {
    const { t, href } = useLanguage();
    const m = t.mindo;
    return (
        <div className="bg-mindo-warm">
            <section className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
                <div className="grid gap-5">
                    <span className="flex items-center gap-2"><MindoMark size={28} /><span className="eyebrow text-mindo">{m.eyebrow}</span></span>
                    <h1 className="font-display text-[clamp(2.3rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">{m.title}</h1>
                    <p className="max-w-xl text-lg text-muted">{m.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <a href={`${href('contact')}#message`} className="btn bg-mindo text-white hover:bg-[#b23f67]">{m.primary}</a>
                        <a href="#client" className="btn-ghost">{m.secondary}</a>
                    </div>
                </div>
                <MindoPanel />
            </section>

            <section className="container-x grid gap-8 py-16 sm:py-20">
                <SectionHead eyebrow={m.learnsEyebrow} title={m.learnsTitle} tone="text-mindo" />
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {m.learns.map((s) => (
                        <li key={s.title} className="grid content-start gap-2 rounded-2xl border border-[#ecdfe3] bg-white p-5">
                            <span className="eyebrow text-mindo">{s.tag}</span>
                            <h3 className="font-display text-xl font-bold">{s.title}</h3>
                            <p className="text-muted">{s.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="client" className="scroll-mt-20 bg-gradient-to-br from-mindo-deep to-mindo-night py-16 text-white sm:py-20">
                <div className="container-x grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
                    <div className="grid gap-3">
                        <span className="eyebrow text-mindo-glow">{m.clientEyebrow}</span>
                        <h2 className="font-display text-3xl font-bold sm:text-4xl" dir="ltr" style={{ textAlign: 'start' }}>{m.clientTitle}</h2>
                        <p className="text-lg text-[#e3cdd6]">{m.clientDesc}</p>
                    </div>
                    <div className="grid justify-items-start gap-4 md:justify-items-end">
                        <a href="https://www.glowy-shop.com" target="_blank" rel="noopener" className="btn bg-white text-mindo-deep hover:bg-mindo-warm">{m.clientCta} <ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                </div>
            </section>

            <CtaBand title={m.ctaTitle} desc={m.ctaDesc} topic="mindo" />
        </div>
    );
};

export default Mindo;
