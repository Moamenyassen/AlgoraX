import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactDock from './components/ContactDock';
import Home from './pages/Home';
import Reach from './pages/Reach';
import Mindo from './pages/Mindo';
import Solutions from './pages/Solutions';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './context/LanguageProvider';
import { content } from './data/content';
import { useSiteMotion } from './components/useSiteMotion';

const PAGES = { home: Home, reach: Reach, mindo: Mindo, solutions: Solutions, about: About, contact: Contact, privacy: Privacy, notFound: NotFound };
const DOCK_TOPIC = { reach: 'reach', mindo: 'mindo', solutions: 'solutions' };

function App({ lang, page }) {
    const Page = PAGES[page] ?? NotFound;
    useSiteMotion();
    return (
        <LanguageProvider lang={lang} page={page}>
            <div lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-night font-sans text-white">
                <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2 focus:text-white">
                    {content[lang].nav.skip}
                </a>
                <Navbar />
                <main id="main">
                    <Page />
                </main>
                <Footer />
                {page !== 'contact' && <ContactDock topic={DOCK_TOPIC[page] ?? 'general'} />}
            </div>
        </LanguageProvider>
    );
}

export default App;
