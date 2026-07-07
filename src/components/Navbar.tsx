import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  PhoneCall, 
  HeartHandshake, 
  MapPin,
  Calendar,
  Image as ImageIcon,
  Users,
  ShieldAlert,
  Settings
} from 'lucide-react';
import { Language, Theme } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
}

export default function Navbar({
  currentLanguage,
  setLanguage,
  currentTheme,
  setTheme,
  activeTab,
  setActiveTab,
  onSearchClick
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { id: 'about', labelEn: 'About Us', labelHi: 'हमारे बारे में' },
    { id: 'services', labelEn: 'Services', labelHi: 'सेवाएँ', hasSub: true },
    { id: 'dispensary', labelEn: 'Dispensary', labelHi: 'औषधालय' },
    { id: 'membership', labelEn: 'Membership', labelHi: 'सदस्यता' },
    { id: 'gallery', labelEn: 'Gallery', labelHi: 'गैलरी' },
    { id: 'events', labelEn: 'Camps & Events', labelHi: 'शिविर और कार्यक्रम' },
    { id: 'volunteer', labelEn: 'Volunteer', labelHi: 'स्वयंसेवक' },
    { id: 'donate', labelEn: 'Donate', labelHi: 'दान करें', highlight: true },
    { id: 'contact', labelEn: 'Contact Us', labelHi: 'संपर्क करें' }
  ];

  const servicesList = [
    { id: 'opd', nameEn: 'Free General OPD', nameHi: 'निःशुल्क सामान्य ओपीडी' },
    { id: 'medicines', nameEn: 'Free Medicines', nameHi: 'निःशुल्क दवाएं' },
    { id: 'bp-sugar', nameEn: 'BP & Sugar Checkup', nameHi: 'बीपी और शुगर जांच' },
    { id: 'ecg', nameEn: 'Free ECG Camps', nameHi: 'निःशुल्क ईसीजी शिविर' },
    { id: 'ayurvedic', nameEn: 'Ayurvedic Care', nameHi: 'आयुर्वेदिक चिकित्सा' },
    { id: 'physio', nameEn: 'Physiotherapy', nameHi: 'फिजियोथेरेपी' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    setShowMegaMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 shadow-sm transition-colors duration-300">
      {/* Top Bar for Urgent/Contact Info */}
      <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-xs py-1.5 px-4 border-b border-neutral-100 dark:border-neutral-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-amber-600 dark:text-amber-500" />
              <span>G-1/13A, Budh Vihar Phase-1, New Delhi</span>
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall size={13} className="text-emerald-600 dark:text-emerald-500" />
              <span>9212277091, 9871871398</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-amber-600 dark:text-amber-500 animate-[pulse_2s_infinite]">
              {currentLanguage === 'hi' ? "व्यापार नहीं, सेवा।" : "Trade No, Service Only."}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <button 
              onClick={() => handleNavClick('admin')}
              className="hover:text-amber-500 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <Settings size={12} />
              <span>{currentLanguage === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <Logo size={80} animated={true} />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-white leading-tight font-sans tracking-tight group-hover:text-amber-600 transition-colors">
              {currentLanguage === 'hi' ? "धर्मार्थ जनकल्याण" : "Dharmarth Jankalyan"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-500 leading-none tracking-wider uppercase">
              {currentLanguage === 'hi' ? "फाउंडेशन • स्वस्थ समाज" : "Foundation • Welfare"}
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const label = currentLanguage === 'hi' ? item.labelHi : item.labelEn;

            if (item.hasSub) {
              return (
                <div 
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <button
                    onClick={() => handleNavClick('services')}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'services' 
                        ? 'text-amber-600 bg-amber-500/5 dark:text-amber-500' 
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronDown size={14} className={`transform transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {showMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-64 rounded-xl bg-white dark:bg-neutral-950 shadow-xl border border-neutral-100 dark:border-neutral-800 p-3 grid grid-cols-1 gap-1"
                      >
                        <div className="px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-400 dark:text-neutral-600 uppercase mb-1">
                          {currentLanguage === 'hi' ? "हमारी सेवाएँ" : "OUR SERVICES"}
                        </div>
                        {servicesList.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => handleNavClick('services')}
                            className="text-left w-full px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-amber-600 dark:hover:text-amber-500 transition-all"
                          >
                            {currentLanguage === 'hi' ? service.nameHi : service.nameEn}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all relative ${
                  item.highlight
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 ml-2'
                    : isActive
                      ? 'text-amber-600 bg-amber-500/5 dark:text-amber-500'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <span>{label}</span>
                {isActive && !item.highlight && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Toolbar Controls (Theme, Language, Search, Mobile Trigger) */}
        <div className="flex items-center space-x-2">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search"
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
          >
            <Search size={18} />
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title={currentLanguage === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Globe size={14} className="text-amber-500" />
            <span>{currentLanguage === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
          >
            {currentTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1.5 flex flex-col max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const label = currentLanguage === 'hi' ? item.labelHi : item.labelEn;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      item.highlight
                        ? 'bg-amber-500 text-white text-center shadow-md font-bold mt-2'
                        : isActive
                          ? 'text-amber-600 bg-amber-500/10 dark:text-amber-500'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              {/* Admin Panel Link in Mobile Menu */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center gap-2 ${
                  activeTab === 'admin'
                    ? 'text-amber-500 bg-amber-500/5'
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                <Settings size={15} />
                <span>{currentLanguage === 'hi' ? 'एडमिन पैनल' : 'Admin Panel (CMS)'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
