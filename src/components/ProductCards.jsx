import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { RouteMini, ShelfMini } from './Visuals';
import MindoMark from './MindoMark';

// The two product cards, shown on Home and About.
const ProductCards = () => {
    const { t, href, dir } = useLanguage();
    const p = t.products;
    const arrow = <ArrowRight size={16} aria-hidden="true" className={dir === 'rtl' ? 'rotate-180' : ''} />;
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <a href={href('reach')} className="group grid content-start gap-4 rounded-3xl bg-gradient-to-br from-reach-deep to-reach-night p-6 text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reach-glow sm:p-8">
                <span className="eyebrow text-reach-glow">{p.reach.name} · {p.reach.kind}</span>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{p.reach.tagline}</h3>
                <RouteMini />
                <p className="text-[#c8dcdc]">{p.reach.desc}</p>
                <span className="inline-flex items-center gap-2 font-medium">{p.reach.cta} {arrow}</span>
            </a>
            <a href={href('mindo')} className="group grid content-start gap-4 rounded-3xl bg-gradient-to-br from-mindo-deep to-mindo-night p-6 text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mindo-glow sm:p-8">
                <span className="flex items-center gap-2"><MindoMark size={22} /><span className="eyebrow text-mindo-glow">{p.mindo.name} · {p.mindo.kind}</span></span>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{p.mindo.tagline}</h3>
                <ShelfMini />
                <p className="text-[#e3cdd6]">{p.mindo.desc}</p>
                <span className="inline-flex items-center gap-2 font-medium">{p.mindo.cta} {arrow}</span>
            </a>
        </div>
    );
};

export default ProductCards;
