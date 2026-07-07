import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Bell, Clock, MapPin, CheckCircle } from 'lucide-react';
import { getEvents } from '../lib/firebase';
import { EventItem, Language } from '../types';

interface EventsProps {
  language: Language;
}

export default function Events({ language }: EventsProps) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  useEffect(() => {
    async function loadEvents() {
      const evts = await getEvents();
      setEvents(evts);
    }
    loadEvents();
  }, []);

  const filtered = events.filter(e => e.status === activeTab);

  return (
    <section className="py-20 bg-[#FAFAFA] dark:bg-neutral-950 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 font-mono">
            {language === 'hi' ? "शिविर और समाचार" : "HEALTH CAMPS & ANNOUNCEMENTS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "नवीनतम कार्यक्रम और शिविर" : "Upcoming Camps & News"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Status Toggle Switch */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex p-1 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {language === 'hi' ? "आगामी शिविर" : "Upcoming Camps"}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'completed'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {language === 'hi' ? "सम्पन्न कार्यक्रम" : "Completed Events"}
            </button>
          </div>
        </div>

        {/* Events Layout List */}
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filtered.map((evt) => (
                  <motion.div
                    key={evt.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row gap-6 items-start justify-between"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-500 font-mono">
                          <Calendar size={14} />
                          <span>{evt.date}</span>
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                        <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-500/5 px-2 py-0.5 rounded font-mono">
                          {activeTab === 'upcoming' ? (
                            <>
                              <Bell size={10} className="animate-swing" />
                              <span>{language === 'hi' ? "जल्द आ रहा है" : "Registration Open"}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle size={10} />
                              <span>{language === 'hi' ? "सफल सम्पन्न" : "Successfully Completed"}</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-neutral-950 dark:text-white leading-snug">
                        {language === 'hi' ? evt.titleHi : evt.titleEn}
                      </h3>

                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                        {language === 'hi' ? evt.descriptionHi : evt.descriptionEn}
                      </p>
                    </div>

                    <div className="shrink-0 w-full md:w-auto flex flex-col gap-2 bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl border border-neutral-100/50 dark:border-neutral-850">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                        <MapPin size={13} className="text-amber-500" />
                        <span>Budh Vihar Dispensary</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                        <Clock size={13} className="text-emerald-500" />
                        <span>9:00 AM - 1:00 PM</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 text-neutral-400 text-sm font-sans">
                {language === 'hi' ? "वर्तमान में कोई विवरण उपलब्ध नहीं है।" : "No announcements available right now."}
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
