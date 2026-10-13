import Reveal from './Reveal';

// Opening block for inner pages: label, big title, intro, optional buttons and a visual on the side.
// `glow` tints the background light to match the page's product.
const GLOWS = {
    violet: ['bg-violet/30', 'bg-cyan/15'],
    reach: ['bg-teal/25', 'bg-violet/20'],
    mindo: ['bg-mindo/25', 'bg-mindo-amber/15'],
};

const PageHero = ({ eyebrow, eyebrowClass = 'text-violet-soft', title, desc, actions, visual, glow = 'violet' }) => {
    const [a, b] = GLOWS[glow];
    return (
        <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
            <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
            <div aria-hidden="true" className={`orb absolute -start-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full ${a} blur-[140px]`} />
            <div aria-hidden="true" className={`orb absolute -end-32 top-1/4 -z-10 h-[26rem] w-[26rem] rounded-full ${b} blur-[140px]`} style={{ animationDelay: '-7s' }} />
            <div className={`container-x grid items-center gap-14 ${visual ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
                <div className="grid gap-6">
                    <Reveal className={`eyebrow ${eyebrowClass}`}>{eyebrow}</Reveal>
                    <Reveal delay={100} as="h1" className="max-w-4xl font-display text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white">{title}</Reveal>
                    {desc && <Reveal delay={200} as="p" className="max-w-2xl text-lg leading-relaxed text-fog sm:text-xl">{desc}</Reveal>}
                    {actions && <Reveal delay={300} className="flex flex-wrap gap-3 pt-1">{actions}</Reveal>}
                </div>
                {visual && <Reveal delay={250}>{visual}</Reveal>}
            </div>
        </section>
    );
};

export default PageHero;
