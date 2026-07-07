import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getTestimonials } from '../lib/firebase';
import { Testimonial, Language } from '../types';

interface TestimonialsProps {
  language: Language;
}

export default function Testimonials({ language }: TestimonialsProps) {
  const [list, setList] = useState<Testimonial[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      const t = await getTestimonials();
      setList(t);
    }
    loadTestimonials();
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  if (list.length === 0) return null;

  const current = list[activeIdx];

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500 font-mono">
            {language === 'hi' ? "रोगी समीक्षाएं" : "WHAT PATIENTS & MEMBERS SAY"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "लाभार्थियों के अनुभव" : "Stories of Hope & Health"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto bg-neutral-50 dark:bg-neutral-950 p-8 sm:p-12 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xl overflow-hidden min-h-[300px] flex flex-col justify-between">
          
          {/* Saffron Glowing Aura */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Quote Icon */}
          <div className="text-amber-500/20 absolute right-8 top-8">
            <Quote size={80} fill="currentColor" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 relative z-10"
            >
              {/* Stars Rating */}
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-100 leading-relaxed italic">
                "{language === 'hi' ? current.quoteHi : current.quoteEn}"
              </p>

              {/* Profile Details */}
              <div className="flex items-center gap-3.5 pt-4">
                <div className="w-11 h-11 bg-amber-500 text-white font-black text-sm rounded-full flex items-center justify-center border-2 border-white shadow-md font-sans">
                  {current.nameEn.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {language === 'hi' ? current.nameHi : current.nameEn}
                  </h4>
                  <p className="text-[10px] font-semibold text-neutral-400">
                    {language === 'hi' ? current.roleHi : current.roleEn}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls buttons */}
          <div className="flex items-center justify-end space-x-2.5 mt-8 border-t border-neutral-150 dark:border-neutral-850 pt-6 relative z-10">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 hover:text-amber-500 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-amber-400 transition-all shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 hover:text-amber-500 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-amber-400 transition-all shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
