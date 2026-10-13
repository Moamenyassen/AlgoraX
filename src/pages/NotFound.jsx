import { useLanguage } from '../hooks/useLanguage';

const NotFound = () => {
    const { t, href } = useLanguage();
    return (
        <section className="container-x grid min-h-[70vh] content-center justify-items-start gap-6 pt-28">
            <span className="text-ribbon font-display text-8xl font-extrabold">404</span>
            <h1 className="font-display text-4xl font-extrabold text-white">{t.notFound.title}</h1>
            <a href={href('home')} className="btn-primary">{t.notFound.cta}</a>
        </section>
    );
};

export default NotFound;
