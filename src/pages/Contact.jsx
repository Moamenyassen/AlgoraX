import { useLanguage } from '../hooks/useLanguage';
import ContactChannels from '../components/ContactChannels';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    const { t } = useLanguage();
    const c = t.contactPage;
    return (
        <section className="container-x grid gap-10 py-14 sm:py-20">
            <div className="grid max-w-2xl gap-4">
                <span className="eyebrow text-violet">{c.eyebrow}</span>
                <h1 className="font-display text-[clamp(2.3rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">{c.title}</h1>
                <p className="text-lg text-muted">{c.desc} {t.contactChannels.reply}</p>
            </div>
            <ContactChannels showForm={false} />
            <div id="message" className="scroll-mt-24 max-w-3xl">
                <ContactForm />
            </div>
        </section>
    );
};

export default Contact;
