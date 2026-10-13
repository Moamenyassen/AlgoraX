import { useLanguage } from '../hooks/useLanguage';

const NotFound = () => {
    const { t, href } = useLanguage();
    return (
        <section className="container-x grid justify-items-start gap-6 py-24">
            <span className="font-mono text-sm text-violet">404</span>
            <h1 className="font-display text-4xl font-extrabold">{t.notFound.title}</h1>
            <a href={href('home')} className="btn-dark">{t.notFound.cta}</a>
        </section>
    );
};

export default NotFound;
