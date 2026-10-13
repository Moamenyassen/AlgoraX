import ContactChannels from './ContactChannels';
import Reveal from './Reveal';
import { useLanguage } from '../hooks/useLanguage';

// Closing contact band at the bottom of every page.
const CtaBand = ({ title, desc, topic = 'general' }) => {
    const { t } = useLanguage();
    return (
        <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="cta-title">
            <div aria-hidden="true" className="orb pointer-events-none absolute -top-40 start-1/4 h-[28rem] w-[28rem] rounded-full bg-violet/25 blur-[120px]" />
            <div aria-hidden="true" className="orb pointer-events-none absolute -bottom-40 end-0 h-[24rem] w-[24rem] rounded-full bg-cyan/15 blur-[120px]" style={{ animationDelay: '-6s' }} />
            <div className="container-x relative grid gap-12">
                <Reveal className="mx-auto grid max-w-3xl justify-items-center gap-5 text-center">
                    <span className="eyebrow text-cyan"><span className="h-2 w-2 animate-pulse rounded-full bg-whatsapp" />{t.contactChannels.reply}</span>
                    <h2 id="cta-title" className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">{title ?? t.cta.title}</h2>
                    <p className="max-w-xl text-lg text-fog">{desc ?? t.cta.desc}</p>
                </Reveal>
                <ContactChannels topic={topic} />
            </div>
        </section>
    );
};

export default CtaBand;
