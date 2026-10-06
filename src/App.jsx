import React, { useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';
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
  const [modal, setModal] = useState({ isOpen: false, type: 'demo', key: 0 });
  const { t } = useLanguage();

  // type: 'demo' or 'general'. A new key gives the form a fresh state each time it opens.
  const openModal = (type = 'demo') => setModal((m) => ({ isOpen: true, type, key: m.key + 1 }));
  const closeModal = useCallback(() => setModal((m) => ({ ...m, isOpen: false })), []);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-dark text-white selection:bg-primary/30">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-black focus:px-4 focus:py-2 focus:rounded-full">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar onOpenDemo={openModal} />

        <main id="main">
          {/* 1. Corporate Introduction */}
          <AlgoraHero />
          <Services />

          {/* 2. Flagship Product: Reach */}
          <div id="products" className="relative pt-24 pb-12 bg-dark-acc border-t border-white/5 scroll-mt-16">
            <div className="container mx-auto px-6 text-center">
              <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">{t.productHeader.label}</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.productHeader.title}</h2>
              <p className="text-gray-300 max-w-xl mx-auto">{t.productHeader.desc}</p>
            </div>
          </div>

          <Hero onOpenDemo={openModal} />
          <Features />
          <Workflow />
          <Testimonials />
          <CallToAction onOpenDemo={openModal} />
        </main>
        <Footer />
        <DemoModal key={modal.key} isOpen={modal.isOpen} initialType={modal.type} onClose={closeModal} />
      </div>
    </MotionConfig>
  );
}

export default App;
