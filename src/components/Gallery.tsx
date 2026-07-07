import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon, Eye, Filter } from 'lucide-react';
import { getGallery } from '../lib/firebase';
import { GalleryItem, Language } from '../types';

interface GalleryProps {
  language: Language;
}

export default function Gallery({ language }: GalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      const g = await getGallery();
      setItems(g);
    }
    loadGallery();
  }, []);

  const categories = [
    { id: 'all', labelEn: 'All Photos', labelHi: 'सभी तस्वीरें' },
    { id: 'foundation-meetings', labelEn: 'Foundation Meetings', labelHi: 'स्थापना बैठकें' },
    { id: 'trustee-meetings', labelEn: 'Trustee Meetings', labelHi: 'ट्रस्टी बैठकें' },
    { id: 'health-camps', labelEn: 'Health Camps', labelHi: 'स्वास्थ्य शिविर' },
    { id: 'dispensary', labelEn: 'Dispensary', labelHi: 'धर्मार्थ औषधालय' },
    { id: 'medicine-distribution', labelEn: 'Medicine Distribution', labelHi: 'दवा वितरण शिविर' },
    { id: 'community-programs', labelEn: 'Community Programs', labelHi: 'सामुदायिक कार्यक्रम' },
    { id: 'doctors', labelEn: 'Doctors', labelHi: 'हमारे योग्य चिकित्सक' },
    { id: 'partner-organizations', labelEn: 'Partner Organizations', labelHi: 'सहयोगी संस्थाएं' }
  ];

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">
            {language === 'hi' ? "सेवा दीर्घा" : "OUR SERVICE GALLERY"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "कर्म और सेवा की झलकियाँ" : "Moments of Care & Healing"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat.id
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-850'
              }`}
            >
              {language === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 cursor-pointer"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Info Text */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white flex flex-col justify-end">
                  <span className="text-[9px] font-extrabold font-mono text-amber-400 uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-bold leading-snug">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                </div>

                {/* Quick view icon */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                  <Eye size={16} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
              >
                <img
                  src={selectedImage}
                  alt="Enlarged View"
                  className="max-w-full max-h-[85vh] object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white font-extrabold font-mono text-xs px-3 py-1.5 rounded-full"
                >
                  {language === 'hi' ? "बंद करें" : "Close"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
