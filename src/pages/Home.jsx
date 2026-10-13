import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import HeroCanvas from '../components/HeroCanvas';
import { RouteMini, ShelfMini } from '../components/Visuals';
import ProductCards from '../components/ProductCards';
import Process from '../components/Process';
import { SectionHead } from '../components/Section';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import MindoMark from '../components/MindoMark';
import CtaBand from '../components/CtaBand';
import { serviceIcons } from '../components/serviceIcons';

const Home = () => {
    const { t, href, dir } = useLanguage();
    const h = t.home;
    const p = t.products;
    const arrow = <ArrowRight size={16} aria-hidden="true" className={dir === 'rtl' ? 'rotate-180' : ''} />;
    return (
        <>
            <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-28">
                <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
                <div aria-hidden="true" className="orb absolute -start-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-violet/30 blur-[140px]" />
                <div aria-hidden="true" className="orb absolute -end-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan/20 blur-[140px]" style={{ animationDelay: '-8s' }} />
                <div className="absolute inset-0 -z-10 opacity-70 lg:opacity-100"><HeroCanvas rtl={dir === 'rtl'} /></div>

                <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
                    <div className="grid gap-7">
                        <Reveal>
                            <span className="eyebrow rounded-full border border-white/15 bg-white/5 px-4 py-2 text-fog backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_10px_#2fe0c4]" />{h.eyebrow}
                            </span>
                        </Reveal>
                        <Reveal delay={100} as="h1" className="font-display text-[clamp(2.75rem,7vw,5.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-white">
                            {h.titleStart} <span className="text-ribbon shimmer">{h.titleAccent}</span>
                        </Reveal>
                        <Reveal delay={200} as="p" className="max-w-xl text-lg leading-relaxed text-fog sm:text-xl">{h.desc}</Reveal>
                        <Reveal delay={300} className="flex flex-wrap gap-3">
                            <a href="#products" className="btn-primary">{h.primary} {arrow}</a>
                            <a href={href('contact')} className="btn-ghost">{h.secondary}</a>
                        </Reveal>
                        <Reveal delay={400} className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-sm text-dim">
                            {h.facts.map((f) => <span key={f.label}><b className="font-semibold text-white">{f.value}</b> {f.label}</span>)}
                        </Reveal>
                    </div>

                    <div className="relative hidden h-[30rem] lg:block" aria-hidden="true">
                        <div className="float glass absolute end-0 top-0 w-[19rem] p-4 shadow-[0_30px_80px_-30px_rgba(47,224,196,.5)]">
                            <div className="mb-3 flex items-center justify-between"><span className="eyebrow text-reach">{p.reach.name}</span><span className="h-2 w-2 animate-pulse rounded-full bg-reach" /></div>
                            <RouteMini />
                            <p className="mt-3 text-sm text-fog">{p.reach.tagline}</p>
                        </div>
                        <div className="float-slow glass absolute bottom-0 start-6 w-[19rem] p-4 shadow-[0_30px_80px_-30px_rgba(255,92,147,.5)]">
                            <div className="mb-3 flex items-center gap-2"><MindoMark size={20} /><span className="eyebrow text-mindo">{p.mindo.name}</span></div>
                            <ShelfMini />
                            <p className="mt-3 text-sm text-fog">{p.mindo.tagline}</p>
                        </div>
                    </div>
                </div>
                <a href="#products" className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-dim hover:text-white lg:flex rtl:translate-x-1/2">
                    {h.scroll}<ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
                </a>
            </section>

            <Marquee items={h.ticker} />

            <section id="products" className="relative scroll-mt-20 py-24 sm:py-32" aria-labelledby="products-title">
                <div className="container-x grid gap-14">
                    <SectionHead eyebrow={h.productsEyebrow} title={<span id="products-title">{h.productsTitle}</span>} center />
                    <ProductCards />
                </div>
            </section>

            <section className="relative py-24 sm:py-32">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="container-x grid gap-14">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHead eyebrow={h.solutionsEyebrow} title={h.solutionsTitle} desc={h.solutionsDesc} />
                        <Reveal><a href={href('solutions')} className="btn-ghost">{h.solutionsCta} {arrow}</a></Reveal>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {t.services.map((s, i) => {
                            const Icon = serviceIcons[s.key];
                            return (
                                <Reveal key={s.key} delay={i * 110} className="h-full">
                                    <div className="group spot ring-glow relative grid h-full content-start gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-transform duration-300 hover:-translate-y-1">
                                        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/10 text-white ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"><Icon size={26} aria-hidden="true" /></span>
                                        <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                                        <p className="text-fog">{s.desc}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative pb-24 sm:pb-32">
                <div className="container-x grid gap-14">
                    <SectionHead eyebrow={h.processEyebrow} title={h.processTitle} />
                    <Process />
                </div>
            </section>

            <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-24 sm:py-32">
                <div aria-hidden="true" className="orb absolute -end-32 top-0 h-96 w-96 rounded-full bg-mindo/15 blur-[130px]" />
                <div className="container-x relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
                    <Reveal className="grid gap-5">
                        <span className="eyebrow text-violet-soft"><span className="h-px w-6 bg-current opacity-60" />{h.aboutEyebrow}</span>
                        <p className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-white">{h.aboutTitle}</p>
                    </Reveal>
                    <Reveal delay={150} className="grid justify-items-start gap-6">
                        <p className="text-lg leading-relaxed text-fog">{h.aboutDesc}</p>
                        <a href={href('about')} className="btn-ghost">{h.aboutCta} {arrow}</a>
                    </Reveal>
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default Home;
