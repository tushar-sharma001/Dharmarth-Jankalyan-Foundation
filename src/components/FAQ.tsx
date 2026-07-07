import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  language: Language;
}

export default function FAQ({ language }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      qEn: "What are the OPD timings and address of the dispensary?",
      qHi: "औषधालय का समय और पता क्या है?",
      aEn: "Our main dispensary is located at G-1/13A, Budh Vihar Phase-1, New Delhi. The free General OPD runs Monday to Saturday from 9:00 AM to 1:00 PM.",
      aHi: "हमारा मुख्य औषधालय G-1/13A, बुध विहार फेज-1, नई दिल्ली में स्थित है। निःशुल्क सामान्य ओपीडी सोमवार से शनिवार सुबह 9:00 बजे से दोपहर 1:00 बजे तक चलती है।"
    },
    {
      qEn: "Are the medicines distributed really 100% free of cost?",
      qHi: "क्या वितरित की जाने वाली दवाएं वास्तव में 100% निःशुल्क हैं?",
      aEn: "Yes, completely! Devoid of commercial intent, every prescription medicine suggested by our doctors is given to patients completely free of cost.",
      aHi: "जी हाँ, बिल्कुल! बिना किसी व्यावसायिक उद्देश्य के, हमारे डॉक्टरों द्वारा सुझाई गई हर दवा मरीजों को पूरी तरह से मुफ्त प्रदान की जाती है।"
    },
    {
      qEn: "How can I apply to become a Lifetime Trustee?",
      qHi: "मैं आजीवन ट्रस्टी बनने के लिए कैसे आवेदन कर सकता हूँ?",
      aEn: "You can apply via our Trusteeship section on this website. A one-time donation of ₹21,000 is requested to fuel healthcare setups, providing you with active decisions and leadership rights.",
      aHi: "आप इस वेबसाइट पर हमारे 'ट्रस्टीशिप' अनुभाग के माध्यम से आवेदन कर सकते हैं। चिकित्सा बुनियादी ढांचे को मजबूत करने के लिए ₹21,000 के एकमुश्त दान की आवश्यकता होती है, जिससे आपको निर्णयों और नेतृत्व के अधिकार प्राप्त होते हैं।"
    },
    {
      qEn: "What diagnostics are available in the dispensary?",
      qHi: "औषधालय में कौन-सी जांच उपलब्ध हैं?",
      aEn: "We offer free Blood Pressure monitoring, Blood Sugar checkups, and periodically conduct completely free ECG screening camps led by experts.",
      aHi: "हम निःशुल्क रक्तचाप (बीपी) की निगरानी, ब्लड शुगर की जांच और समय-समय पर विशेषज्ञों के नेतृत्व में पूरी तरह से निःशुल्क ईसीजी स्क्रीनिंग शिविर आयोजित करते हैं।"
    },
    {
      qEn: "Is my online donation tax exempted?",
      qHi: "क्या मेरा ऑनलाइन दान कर-मुक्त है?",
      aEn: "Yes, our foundation is a government registered charitable organization. All donations are covered under standard charity accounting practices. Contact our help desk for receipts.",
      aHi: "जी हाँ, हमारा फाउंडेशन एक सरकारी पंजीकृत धर्मार्थ संस्था है। सभी दान मानक चैरिटी लेखांकन पद्धतियों के अंतर्गत आते हैं। रसीद प्राप्त करने के लिए हमारे संपर्क नंबरों पर बात करें।"
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#FAFAFA] dark:bg-neutral-950 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500 font-mono">
            {language === 'hi' ? "जिज्ञासा समाधान" : "COMMON QUESTIONS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-800 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Question Row */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-sans text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={16} className="text-amber-500 shrink-0" />
                    <span>{language === 'hi' ? faq.qHi : faq.qEn}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-neutral-400 transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-amber-500' : ''}`}
                  />
                </button>

                {/* Answer Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm font-sans text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-50 dark:border-neutral-850/20">
                        {language === 'hi' ? faq.aHi : faq.aEn}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
