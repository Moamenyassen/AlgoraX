import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import ContactChannels from '../components/ContactChannels';
import ContactForm from '../components/ContactForm';
import Reveal from '../components/Reveal';

const Contact = () => {
    const { t } = useLanguage();
    const c = t.contactPage;
    return (
        <>
            <PageHero eyebrow={c.eyebrow} title={c.title} desc={`${c.desc} ${t.contactChannels.reply}`} />
            <section className="container-x grid gap-10 pb-24 sm:pb-32">
                <ContactChannels showForm={false} />
                <Reveal id="message" className="max-w-3xl scroll-mt-28">
                    <ContactForm />
                </Reveal>
            </section>
        </>
    );
};

export default Contact;
