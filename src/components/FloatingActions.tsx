import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-center">
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleScrollTop}
            className="p-3 bg-neutral-900 text-white dark:bg-neutral-800 rounded-full hover:bg-neutral-800 hover:-translate-y-0.5 shadow-lg transition-all"
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Direct Call Button */}
      <motion.a
        whileHover={{ scale: 1.1, y: -2 }}
        href="tel:9212277091"
        className="p-3.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-xl transition-all"
        title="Call Helpdesk"
      >
        <Phone size={20} />
      </motion.a>

      {/* WhatsApp Chat Button */}
      <motion.a
        whileHover={{ scale: 1.1, y: -2 }}
        href="https://wa.me/919212277091"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 shadow-xl transition-all"
        title="WhatsApp Support"
      >
        <MessageCircle size={20} fill="currentColor" />
      </motion.a>

    </div>
  );
}
