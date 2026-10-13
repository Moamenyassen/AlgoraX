import { Sparkles } from 'lucide-react';

// Endless strip of what Algora does. The list is doubled so the loop has no gap.
const Marquee = ({ items }) => (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5" aria-label={items.join(', ')}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-night to-transparent rtl:bg-gradient-to-l" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-night to-transparent rtl:bg-gradient-to-r" />
        <div className="marquee flex w-max gap-10" aria-hidden="true">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-semibold text-fog/80 sm:text-2xl">
                    {item}
                    <Sparkles size={18} className="text-violet-soft" />
                </span>
            ))}
        </div>
    </div>
);

export default Marquee;
