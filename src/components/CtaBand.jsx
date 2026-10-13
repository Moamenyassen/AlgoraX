import ContactChannels from './ContactChannels';
import { useLanguage } from '../hooks/useLanguage';

// Closing contact band at the bottom of every page.
const CtaBand = ({ title, desc, topic = 'general' }) => {
    const { t } = useLanguage();
    return (
        <section className="bg-ink py-16 text-white sm:py-20" aria-labelledby="cta-title">
            <div className="container-x grid gap-8">
                <div className="grid max-w-2xl gap-3">
                    <span className="h-1 w-24 rounded-full bg-ribbon" aria-hidden="true" />
                    <h2 id="cta-title" className="font-display text-3xl font-bold sm:text-4xl">{title ?? t.cta.title}</h2>
                    <p className="text-lg text-[#c8c3dc]">{desc ?? t.cta.desc} {t.contactChannels.reply}</p>
                </div>
                <ContactChannels topic={topic} dark />
            </div>
        </section>
    );
};

export default CtaBand;
