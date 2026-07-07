import React from 'react';
import { Mail, Phone, MapPin, Heart, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (tabId: string) => void;
}

export default function Footer({ language, onNavigate }: FooterProps) {
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy dark:bg-neutral-950 text-neutral-300 font-sans pt-16 pb-8 border-t border-brand-navy/10 dark:border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* NGO Brand Widget */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
            <Logo size={88} animated={false} />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white leading-tight">
                {language === 'hi' ? "धर्मार्थ जनकल्याण" : "Dharmarth Jankalyan"}
              </span>
              <span className="text-xs font-semibold text-emerald-500 tracking-wider uppercase">
                {language === 'hi' ? "फाउंडेशन • स्वस्थ समाज" : "Foundation • Welfare"}
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-neutral-500">
            {language === 'hi' 
              ? "स्वस्थ समाज • सशक्त समाज • समर्पित सेवा। व्यापार रहित, पूर्णतः निःशुल्क चिकित्सा एवं लोक कल्याण सेवा।" 
              : "Healthy Society • Empowered Society • Dedicated Service. Devoid of any commercial values, serving completely free of cost."}
          </p>
          <div className="text-[11px] space-y-1 text-neutral-400 border-t border-white/5 pt-3 font-sans">
            <div><strong className="text-neutral-200">{language === 'hi' ? 'सेक्शन 8 लाइसेंस नं:' : 'Section 8 License No:'}</strong> 185502</div>
            <div><strong className="text-neutral-200">{language === 'hi' ? 'नीति आयोग ID:' : 'NITI Aayog ID:'}</strong> DL/2026/1090575</div>
            <div><strong className="text-neutral-200">{language === 'hi' ? 'ई-अनुदान ID:' : 'e-Anudaan ID:'}</strong> DL20261090575DJF</div>
          </div>
          <div className="flex items-center space-x-3 text-neutral-600">
            <a href="#" className="hover:text-amber-500 transition-colors"><Facebook size={16} /></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><Twitter size={16} /></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><Youtube size={16} /></a>
          </div>
        </div>

        {/* Quick Navigation links */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            {language === 'hi' ? "त्वरित लिंक्स" : "Quick Navigation"}
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li><button onClick={() => handleLinkClick('home')} className="hover:text-white transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</button></li>
            <li><button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors">{language === 'hi' ? 'हमारे बारे में' : 'About Foundation'}</button></li>
            <li><button onClick={() => handleLinkClick('dispensary')} className="hover:text-white transition-colors">{language === 'hi' ? 'औषधालय और डॉक्टर' : 'Free Dispensary'}</button></li>
            <li><button onClick={() => handleLinkClick('membership')} className="hover:text-white transition-colors">{language === 'hi' ? 'ट्रस्टी एवं सदस्यता' : 'Trustees & Members'}</button></li>
            <li><button onClick={() => handleLinkClick('volunteer')} className="hover:text-white transition-colors">{language === 'hi' ? 'स्वयंसेवक' : 'Volunteer'}</button></li>
            <li><button onClick={() => handleLinkClick('donate')} className="hover:text-amber-500 font-bold transition-colors">{language === 'hi' ? 'दान करें' : 'Donate Now'}</button></li>
          </ul>
        </div>

        {/* Free Medical Services listed */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            {language === 'hi' ? "निःशुल्क सेवाएँ" : "Free Services"}
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-500">
            <li>{language === 'hi' ? "निःशुल्क सामान्य ओपीडी" : "Free General OPD"}</li>
            <li>{language === 'hi' ? "निःशुल्क प्रामाणिक दवाएं" : "Free Prescribed Medicines"}</li>
            <li>{language === 'hi' ? "बीपी एवं शुगर जांच" : "BP & Sugar Screening"}</li>
            <li>{language === 'hi' ? "समय-समय पर ईसीजी शिविर" : "Periodic ECG Camps"}</li>
            <li>{language === 'hi' ? "आयुर्वेदिक परामर्श" : "Ayurvedic Pulse Reading"}</li>
            <li>{language === 'hi' ? "फिजियोथेरेपी पुनर्वास" : "Therapeutic Physiotherapy"}</li>
          </ul>
        </div>

        {/* Contact info widget */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            {language === 'hi' ? "संपर्क पता" : "Contact Details"}
          </h3>
          <ul className="space-y-3.5 text-xs text-neutral-500">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span>G-1/13A, Budh Vihar Phase-1, New Delhi</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-emerald-500 shrink-0" />
              <span>9212277091, 9871871398</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-indigo-500 shrink-0" />
              <span>dharmarth@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 dark:border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
        <div className="flex items-center gap-1.5 mb-4 sm:mb-0">
          <span>&copy; {new Date().getFullYear()} Dharmarth Jankalyan Foundation. All Rights Reserved.</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={10} className="text-rose-600" fill="currentColor" />
            <span>for community</span>
          </span>
          <button 
            onClick={handleScrollTop}
            className="flex items-center gap-1 text-neutral-300 hover:text-white dark:text-neutral-500 dark:hover:text-white transition-colors"
          >
            <span>Back To Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>

    </footer>
  );
}
