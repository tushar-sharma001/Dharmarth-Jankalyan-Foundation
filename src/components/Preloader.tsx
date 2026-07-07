import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { Language } from '../types';

interface PreloaderProps {
  onComplete: () => void;
  language: Language;
}

export default function Preloader({ onComplete, language }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglinesEn = [
    "Healing Hearts, Serving Lives...",
    "Trade No, Service Only.",
    "A Step Towards Selfless Service...",
    "Dharmarth Jankalyan Foundation"
  ];

  const taglinesHi = [
    "निःशुल्क चिकित्सा, सेवा भाव...",
    "व्यापार नहीं, सेवा।",
    "जनसेवा की ओर एक कदम...",
    "धर्मार्थ जनकल्याण फाउंडेशन"
  ];

  const taglines = language === 'hi' ? taglinesHi : taglinesEn;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small pause at 100%
          return 100;
        }
        return prev + 1;
      });
    }, 18);

    const taglineInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(taglineInterval);
    };
  }, [taglines.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50"
    >
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-70 pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Drawing Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <Logo size={180} animated={true} />
        </motion.div>

        {/* Foundation Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold tracking-normal font-sans text-neutral-900 dark:text-white"
        >
          {language === 'hi' ? "धर्मार्थ जनकल्याण फाउंडेशन" : "Dharmarth Jankalyan Foundation"}
        </motion.h1>

        {/* Animated Tagline Transition */}
        <div className="h-8 mt-2 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-amber-600 dark:text-amber-500 font-mono tracking-wider uppercase"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar container */}
        <div className="w-56 h-[3px] bg-neutral-100 dark:bg-neutral-800 rounded-full mt-10 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-emerald-600 to-indigo-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Counter */}
        <motion.span
          className="text-xs font-semibold font-mono text-neutral-400 mt-2 block"
        >
          {progress}%
        </motion.span>
      </div>

      {/* Decorative Traditional Border corners */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-amber-500/30 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-amber-500/30 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 rounded-br-xl pointer-events-none" />
    </motion.div>
  );
}
