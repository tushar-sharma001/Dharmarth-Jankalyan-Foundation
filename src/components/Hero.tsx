import React from 'react';
import { motion } from 'motion/react';
import { Heart, Landmark, Users, Calendar, ArrowRight, ShieldCheck, Activity, Phone } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onNavigate: (tabId: string) => void;
}

export default function Hero({ language, onNavigate }: HeroProps) {
  
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-900 pt-10 pb-20 lg:pt-16 transition-colors duration-300">
      {/* Decorative Wave Particles Background */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Centered Hero Message Panel */}
          <div className="max-w-4xl flex flex-col items-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-full w-fit"
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest font-mono">
                {language === 'hi' ? "सेवा ही सबसे बड़ा धर्म है" : "SERVICE IS THE SUPREME VIRTUE"}
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight font-sans"
              >
                {language === 'hi' ? (
                  <>
                    <span className="text-amber-600 dark:text-amber-500">धर्मार्थ</span> जनकल्याण <span className="text-emerald-700 dark:text-emerald-500 font-extrabold">फाउंडेशन</span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-600 dark:text-amber-500">Dharmarth</span> Jankalyan <span className="text-emerald-700 dark:text-emerald-500 font-extrabold">Foundation</span>
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 font-sans"
              >
                {language === 'hi' ? "जनसेवा की ओर एक कदम — स्वास्थ्य, सम्मान और समाज के लिए" : "A step towards public service — for health, dignity and society"}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-xs sm:text-sm font-extrabold text-emerald-700 dark:text-emerald-500 uppercase tracking-widest font-mono italic"
              >
                {language === 'hi' ? '"मानवता के साथ स्वास्थ्य सेवा"' : '"Healthcare with Humanity"'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 font-sans max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-center"
              >
                <strong className="text-neutral-900 dark:text-white font-bold block mb-1">
                  {language === 'hi' ? "हमारा दृढ़ संकल्प / Core Principle:" : "Our Core Principle:"}
                </strong>
                <span className="font-extrabold text-amber-700 dark:text-amber-400">
                  {language === 'hi' ? "हमारी धर्मार्थ डिस्पेंसरी में इलाज सेवा होगी — व्यापार नहीं।" : "In our charitable dispensary, treatment will be a service — not a business."}
                </span>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 pt-4 justify-center"
            >
              <button
                onClick={() => onNavigate('donate')}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Heart size={16} fill="currentColor" />
                <span>{language === 'hi' ? "दान करें" : "Donate Now"}</span>
              </button>

              <button
                onClick={() => onNavigate('membership')}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Landmark size={16} />
                <span>{language === 'hi' ? "सहयोग / सदस्यता" : "Join & Support"}</span>
              </button>

              <button
                onClick={() => onNavigate('dispensary')}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Activity size={16} />
                <span>{language === 'hi' ? "औषधालय देखें" : "Visit Dispensary"}</span>
              </button>
            </motion.div>

            {/* Minimal trust guarantees */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-semibold text-neutral-400 dark:text-neutral-500"
            >
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Free Consultation</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-amber-500" />
                <span>Govt. Registered NGO</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-indigo-600" />
                <span>Direct Beneficiary Support</span>
              </span>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
