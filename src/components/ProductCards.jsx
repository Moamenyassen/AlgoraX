import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { RouteMini, ShelfMini } from './Visuals';
import MindoMark from './MindoMark';
import Reveal from './Reveal';

// The two product cards, shown on Home and About.
const ProductCards = () => {
    const { t, href, dir } = useLanguage();
    const p = t.products;
    const arrow = <ArrowRight size={16} aria-hidden="true" className={`transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />;
    const card = 'group spot tilt ring-glow relative grid h-full content-start gap-5 overflow-hidden rounded-[28px] border border-white/10 p-7 sm:p-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan';
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
                <a href={href('reach')} className={`${card} bg-[radial-gradient(120%_80%_at_0%_0%,rgba(47,224,196,.18),transparent_60%),linear-gradient(160deg,#08303a,#0a0f24)]`}>
                    <span className="eyebrow text-reach">{p.reach.name} · {p.reach.kind}</span>
                    <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-[2.1rem]">{p.reach.tagline}</h3>
                    <RouteMini />
                    <p className="text-fog">{p.reach.desc}</p>
                    <span className="inline-flex items-center gap-2 font-medium text-reach">{p.reach.cta} {arrow}</span>
                </a>
            </Reveal>
            <Reveal delay={120}>
                <a href={href('mindo')} className={`${card} bg-[radial-gradient(120%_80%_at_100%_0%,rgba(255,92,147,.2),transparent_60%),linear-gradient(160deg,#2c0b22,#0d0a22)]`}>
                    <span className="flex items-center gap-2.5"><MindoMark size={24} /><span className="eyebrow text-mindo">{p.mindo.name} · {p.mindo.kind}</span></span>
                    <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-[2.1rem]">{p.mindo.tagline}</h3>
                    <ShelfMini />
                    <p className="text-fog">{p.mindo.desc}</p>
                    <span className="inline-flex items-center gap-2 font-medium text-mindo">{p.mindo.cta} {arrow}</span>
                </a>
            </Reveal>
        </div>
    );
};

export default ProductCards;
