import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Theme } from './types';

// Import Modular Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import SearchOverlay from './components/SearchOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Dispensary from './components/Dispensary';
import Membership from './components/Membership';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Volunteer from './components/Volunteer';
import Donate from './components/Donate';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('hi'); // Default to Hindi as it matches the primary target community
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize Theme and Language from local persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to light
      document.documentElement.classList.remove('dark');
    }

    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Update DOM classes and save theme
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Save language
  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Render Page Content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero language={language} onNavigate={setActiveTab} />
            <About language={language} />
            <Services language={language} />
            <Dispensary language={language} />
            <Testimonials language={language} />
            <FAQ language={language} />
          </>
        );
      case 'about':
        return <About language={language} />;
      case 'services':
        return <Services language={language} />;
      case 'dispensary':
        return <Dispensary language={language} />;
      case 'membership':
        return <Membership language={language} />;
      case 'gallery':
        return <Gallery language={language} />;
      case 'events':
        return <Events language={language} />;
      case 'volunteer':
        return <Volunteer language={language} />;
      case 'donate':
        return <Donate language={language} />;
      case 'contact':
        return <Contact language={language} />;
      case 'admin':
        return <AdminDashboard language={language} />;
      default:
        return <Hero language={language} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
      
      {/* 1. Loading Preloader Animation */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader 
            language={language}
            onComplete={() => setLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="flex flex-col min-h-screen">
          
          {/* 2. Sticky Navbar */}
          <Navbar 
            currentLanguage={language}
            setLanguage={handleSetLanguage}
            currentTheme={theme}
            setTheme={handleSetTheme}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSearchClick={() => setIsSearchOpen(true)}
          />

          {/* 3. Search Overlay Dialog */}
          <AnimatePresence>
            {isSearchOpen && (
              <SearchOverlay 
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                language={language}
                onNavigate={setActiveTab}
              />
            )}
          </AnimatePresence>

          {/* 4. Main Page View Container with Animated Slide Transition */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 5. Footer */}
          <Footer 
            language={language}
            onNavigate={setActiveTab}
          />

          {/* 6. Back-to-Top, Direct Call, and WhatsApp Actions */}
          <FloatingActions />

        </div>
      )}

    </div>
  );
}
