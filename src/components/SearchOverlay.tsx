import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, Heart, Shield, Activity, Calendar, HelpCircle, Phone } from 'lucide-react';
import { Language } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigate: (tabId: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, language, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const directory = [
    { id: 'about', labelEn: 'About Foundation, Mission & Vision', labelHi: 'फाउंडेशन के बारे में, मिशन और विजन', icon: Shield },
    { id: 'services', labelEn: 'Free General OPD & Medicines', labelHi: 'निःशुल्क सामान्य ओपीडी और दवाएं', icon: Activity },
    { id: 'dispensary', labelEn: 'Free Dispensary & Doctor Availability', labelHi: 'निःशुल्क औषधालय और डॉक्टरों की उपलब्धता', icon: Heart },
    { id: 'membership', labelEn: 'Become a Trustee or Member', labelHi: 'ट्रस्टी या सदस्य बनें', icon: Heart },
    { id: 'events', labelEn: 'Health Camps & Announcements', labelHi: 'स्वास्थ्य शिविर और घोषणाएं', icon: Calendar },
    { id: 'donate', labelEn: 'Donate Money, QR Code, Bank Transfer', labelHi: 'धन दान करें, क्यूआर कोड, बैंक ट्रांसफर', icon: Heart },
    { id: 'contact', labelEn: 'Contact Numbers, Address & WhatsApp', labelHi: 'संपर्क नंबर, पता और व्हाट्सएप', icon: Phone }
  ];

  const filtered = directory.filter(item => {
    const searchString = `${item.labelEn} ${item.labelHi} ${item.id}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-md">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-xl bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden"
      >
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="text-neutral-400" size={20} />
            <input
              type="text"
              autoFocus
              placeholder={language === 'hi' ? 'खोजें (जैसे: ओपीडी, दान, ट्रस्टी)...' : 'Search pages (e.g., OPD, donate, trustee)...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-base text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 font-medium"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[350px] overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div className="space-y-0.5">
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="w-full text-left flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-all group"
                  >
                    <span className="p-2 rounded-lg bg-amber-500/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                      <Icon size={16} />
                    </span>
                    <span>
                      {language === 'hi' ? item.labelHi : item.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-neutral-400 flex flex-col items-center">
              <HelpCircle size={28} className="text-neutral-300 dark:text-neutral-800 mb-2" />
              <span>{language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
