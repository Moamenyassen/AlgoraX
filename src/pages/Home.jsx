import { ArrowRight } from 'lucide-react';
import { serviceIcons } from '../components/serviceIcons';
import { useLanguage } from '../hooks/useLanguage';
import { Ribbon } from '../components/Visuals';
import ProductCards from '../components/ProductCards';
import Process from '../components/Process';
import { SectionHead } from '../components/Section';
import CtaBand from '../components/CtaBand';


const Home = () => {
    const { t, href, dir } = useLanguage();
    const h = t.home;
    const arrow = <ArrowRight size={16} aria-hidden="true" className={dir === 'rtl' ? 'rotate-180' : ''} />;
    return (
        <>
            <section className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
                <div className="grid gap-5">
                    <span className="eyebrow text-violet">{h.eyebrow}</span>
                    <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight">
                        {h.titleStart} <span className="bg-ribbon bg-clip-text text-transparent">{h.titleAccent}</span>
                    </h1>
                    <p className="max-w-xl text-lg text-muted">{h.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <a href="#products" className="btn-dark">{h.primary}</a>
                        <a href={href('contact')} className="btn-ghost">{h.secondary}</a>
                    </div>
                </div>
                <div className="mx-auto w-full max-w-md lg:max-w-none"><Ribbon /></div>
            </section>

            <div className="border-y border-line">
                <ul className="container-x flex flex-wrap gap-x-10 gap-y-2 py-4 text-sm text-muted">
                    {h.facts.map((f) => <li key={f.label}><b className="font-semibold text-ink">{f.value}</b> {f.label}</li>)}
                </ul>
            </div>

            <section id="products" className="scroll-mt-20 bg-ink py-16 sm:py-20" aria-labelledby="products-title">
                <div className="container-x grid gap-8">
                    <SectionHead eyebrow={h.productsEyebrow} title={<span id="products-title">{h.productsTitle}</span>} tone="text-violet-soft" light />
                    <ProductCards />
                </div>
            </section>

            <section className="container-x grid gap-8 py-16 sm:py-20">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHead eyebrow={h.solutionsEyebrow} title={h.solutionsTitle} desc={h.solutionsDesc} />
                    <a href={href('solutions')} className="btn-ghost">{h.solutionsCta} {arrow}</a>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {t.services.map((s) => {
                        const Icon = serviceIcons[s.key];
                        return (
                            <div key={s.key} className="grid content-start gap-3 rounded-2xl border border-line bg-white p-6">
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet"><Icon size={22} aria-hidden="true" /></span>
                                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                                <p className="text-muted">{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="container-x grid gap-8 pb-16 sm:pb-20">
                <SectionHead eyebrow={h.processEyebrow} title={h.processTitle} />
                <Process />
            </section>

            <section className="border-t border-line bg-white">
                <div className="container-x grid gap-6 py-16 sm:py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
                    <SectionHead eyebrow={h.aboutEyebrow} title={h.aboutTitle} />
                    <div className="grid justify-items-start gap-5">
                        <p className="text-lg text-muted">{h.aboutDesc}</p>
                        <a href={href('about')} className="btn-ghost">{h.aboutCta} {arrow}</a>
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default Home;
