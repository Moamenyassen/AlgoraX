import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AlgoraHero from './components/AlgoraHero';
import Services from './components/Services';
import Hero from './components/Hero';
import Features from './components/Features';
import Workflow from './components/Workflow';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import { useLanguage } from './hooks/useLanguage';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const openDemo = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary/30">
      <ScrollProgress />
      <Navbar onOpenDemo={openDemo} />

      <main>
        {/* 1. Corporate Introduction */}
        <AlgoraHero />
        <Services />

        {/* 2. Flagship Product: RouteGeniusAI */}
        <div id="products" className="relative pt-24 pb-12 bg-dark-acc border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">{t.productHeader.label}</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.productHeader.title}</h2>
            <p className="text-gray-400 max-w-xl mx-auto">{t.productHeader.desc}</p>
          </div>
        </div>

        <Hero onOpenDemo={openDemo} />
        <Features />
        <Workflow />
        <Testimonials />
        <CallToAction onOpenDemo={openDemo} />

      </main>
      <Footer />
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
