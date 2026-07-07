import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Activity, 
  Sparkles,
  Phone,
  Stethoscope,
  Heart
} from 'lucide-react';
import { getDoctors } from '../lib/firebase';
import { Doctor, Language } from '../types';

interface DispensaryProps {
  language: Language;
}

export default function Dispensary({ language }: DispensaryProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [vijayImgError, setVijayImgError] = useState(false);

  useEffect(() => {
    async function loadDoctors() {
      const docs = await getDoctors();
      setDoctors(docs);
    }
    loadDoctors();
  }, []);

  // 1. DISPENSARY OPERATIONS (संचालन संरचना)
  const operations = [
    { 
      titleEn: "Nominal ₹10 Registration Slip", 
      titleHi: "मात्र ₹10 पंजीकरण पर्ची", 
      descEn: "A token charge of ₹10 for the registration card, valid for regular follow-ups.",
      descHi: "नियमित परामर्श के लिए केवल ₹10 की नाममात्र पर्ची शुल्क लिया जाता है।"
    },
    { 
      titleEn: "Patient Registration", 
      titleHi: "मरीज पंजीकरण", 
      descEn: "Durable digital and physical record tracking of patient health histories.",
      descHi: "मरीजों के संपूर्ण स्वास्थ्य इतिहास का डिजिटल व भौतिक पंजीकरण।"
    },
    { 
      titleEn: "Medicine Tracking", 
      titleHi: "दवा ट्रैकिंग", 
      descEn: "Ensuring high-quality generic and branded medicine logs directly matching prescriptions.",
      descHi: "प्रत्येक मरीज को दी गई दवाओं का पारदर्शी डेटाबेस और ट्रैकिंग।"
    },
    { 
      titleEn: "Clean Environment", 
      titleHi: "स्वच्छ पर्यावरण", 
      descEn: "Fully air-conditioned, sanitized, and hygiene-compliant clinic environment.",
      descHi: "पूर्णतः वातानुकूलित, कीटाणुरहित और स्वच्छ औषधालय परिसर।"
    }
  ];

  // Specialist consultations listed under Operations
  const specialistConsultations = [
    { nameEn: "Eye Specialist", nameHi: "नेत्र रोग विशेषज्ञ" },
    { nameEn: "Skin Specialist", nameHi: "त्वचा रोग विशेषज्ञ" },
    { nameEn: "General Physician", nameHi: "सामान्य फिजिशियन" },
    { nameEn: "Preventive Consultation", nameHi: "निवारक स्वास्थ्य परामर्श" }
  ];

  // 2. DISPENSARY SERVICES
  const dispensaryTimings = [
    {
      daysEn: "General Doctor (6 Days Weekly)",
      daysHi: "सामान्य चिकित्सक (सप्ताह में 6 दिन)",
      timeEn: "OPD, Regular Checkups, Acupressure, Ayurvedic Consultation",
      timeHi: "ओपीडी (OPD), नियमित जांच, एक्यूप्रेशर, आयुर्वेदिक परामर्श"
    },
    {
      daysEn: "Specialist Doctors (Scheduled Days)",
      daysHi: "विशेषज्ञ डॉक्टर (निर्धारित दिन)",
      timeEn: "Orthopedic, Gynecology, Dermatology, Diabetes, Blood Pressure, Eye Specialist",
      timeHi: "हड्डी रोग, स्त्री रोग, त्वचा रोग, मधुमेह, ब्लड प्रेशर एवं नेत्र रोग विशेषज्ञ"
    }
  ];

  return (
    <section className="py-20 bg-[#FAFAFA] dark:bg-neutral-950 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 font-mono flex items-center justify-center gap-1.5 mb-2">
            <Stethoscope size={14} />
            {language === 'hi' ? "संचालन संरचना एवं सेवाएं" : "DISPENSARY OPERATIONS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
            {language === 'hi' ? "धर्मार्थ औषधालय संचालन" : "Charitable Dispensary Operations"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-sans">
            {language === 'hi' ? "सुव्यवस्थित ढांचा, योग्य चिकित्सक एवं आधुनिक पारदर्शी चिकित्सा व्यवस्था।" : "Well-structured operations, qualified physicians, and transparent primary healthcare."}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* MAIN BODY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* LEFT: Sanchalan Sanrachna (Operations Structure) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-2 border-l-4 border-amber-500 pl-3">
                {language === 'hi' ? "संचालन संरचना" : "Dispensary Operations"}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 mb-6 font-sans">
                {language === 'hi' ? "औषधालय के दैनिक और कुशल संचालन की प्रमुख कड़ियाँ।" : "The core pillars of our daily dispensary workflow."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {operations.map((op, i) => (
                  <div key={i} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm mb-3 font-mono">
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-1.5 font-sans">
                        {language === 'hi' ? op.titleHi : op.titleEn}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                        {language === 'hi' ? op.descHi : op.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialist Consultations checklist under Operations */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-150 dark:border-neutral-800/80 shadow-sm">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 font-mono">
                {language === 'hi' ? "विशेषज्ञ परामर्श सुविधाएँ" : "SPECIALIST CONSULTATIONS"}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specialistConsultations.map((spec, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mb-1.5" />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {language === 'hi' ? spec.nameHi : spec.nameEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Timings, Rules & Location */}
          <div className="lg:col-span-5 space-y-6">
            {/* Time schedule */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500/5 w-24 h-24 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-base font-extrabold text-neutral-950 dark:text-white mb-6 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <Clock className="text-amber-500 shrink-0" size={18} />
                <span>{language === 'hi' ? "चिकित्सा समय सूची" : "Working Schedule"}</span>
              </h3>

              <div className="space-y-6">
                {dispensaryTimings.map((time, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                      {language === 'hi' ? time.daysHi : time.daysEn}
                    </span>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                      {language === 'hi' ? time.timeHi : time.timeEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address location */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-3xl shadow-xl">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1 font-mono">
                {language === 'hi' ? "औषधालय का पता" : "DISPENSARY ADDRESS"}
              </span>
              <h4 className="text-base font-black mb-3">
                {language === 'hi' ? "धर्मार्थ डिस्पेंसरी" : "Charitable Dispensary"}
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed flex gap-2 mb-6 font-sans">
                <MapPin size={18} className="shrink-0 text-amber-400" />
                <span>
                  G-1/13, Budh Vihar Phase-1, Delhi, 110086
                </span>
              </p>

              <div className="flex gap-4">
                <a 
                  href="https://maps.google.com/?q=G-1/13+Budh+Vihar+Phase-1+Delhi+110086"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-emerald-950 font-bold rounded-xl text-xs hover:bg-neutral-100 transition-all flex items-center gap-1.5 font-sans"
                >
                  <MapPin size={12} />
                  <span>{language === 'hi' ? "दिशा-निर्देश" : "Get Directions"}</span>
                </a>
                <a 
                  href="tel:9212277091"
                  className="px-4 py-2 border border-emerald-500/50 text-white font-bold rounded-xl text-xs hover:bg-emerald-900 transition-all flex items-center gap-1.5 font-sans"
                >
                  <Phone size={12} />
                  <span>{language === 'hi' ? "कॉल करें" : "Call Helpline"}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* DOCTORS GRID */}
        <div>
          <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-2 border-l-4 border-emerald-600 pl-3">
            {language === 'hi' ? "हमारे समर्पित योग्य डॉक्टर" : "Our Dedicated Doctors"}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 mb-8 font-sans">
            {language === 'hi' ? "योग्य चिकित्सक जो निःस्वार्थ सेवा भावना से ओपीडी संचालित करते हैं।" : "Qualified doctors serving the community with compassion."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dr. Vijay Beriwal Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-150 dark:border-neutral-800 overflow-hidden flex flex-col h-full"
            >
              <div className="h-44 bg-gradient-to-br from-emerald-700/10 to-teal-900/10 dark:from-emerald-950/20 dark:to-teal-950/20 flex items-center justify-center relative overflow-hidden border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 p-0.5 relative shadow-md">
                  <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center overflow-hidden">
                    {!vijayImgError ? (
                      <img
                        src="/vijay.jpg"
                        alt="Dr. Vijay Beriwal"
                        referrerPolicy="no-referrer"
                        onError={() => setVijayImgError(true)}
                        className="w-full h-full object-cover scale-[1.35] object-top"
                      />
                    ) : (
                      <span className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-sans">VB</span>
                    )}
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 text-[9px] font-bold tracking-widest uppercase bg-amber-500 text-white px-2 py-0.5 rounded shadow-sm">
                  {language === 'hi' ? "आयुर्वेदिक एवं सामान्य चिकित्सा" : "Ayurvedic & General"}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-1 font-sans">
                    {language === 'hi' ? "डॉ. विजय बेरीवाल" : "Dr. Vijay Beriwal"}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase mb-3 font-mono">
                    BAMS, MD (Ay), PGDHHM, NDDY
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                    {language === 'hi' ? "समय: परामर्श दिवस एवं शिविरों में उपलब्ध" : "Availability: Available during scheduled days and health camps."}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-500/5 px-2.5 py-1.5 rounded-xl w-fit mt-4">
                  <ShieldCheck size={12} />
                  <span>{language === 'hi' ? "निःशुल्क परामर्श" : "Free Consultation"}</span>
                </div>
              </div>
            </motion.div>

            {/* General Physician Placeholder (For Admin Updates) */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between h-full min-h-[280px]">
              <div>
                <span className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-400 flex items-center justify-center mb-4">
                  <Stethoscope size={20} />
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  {language === 'hi' ? "सामान्य चिकित्सक (General Physician)" : "General Physician"}
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {language === 'hi' ? "नियमित ओपीडी संचालित करने वाले चिकित्सकों का विवरण शीघ्र ही अपडेट किया जाएगा।" : "Doctor details will be updated here shortly by the administration."}
                </p>
              </div>
              <span className="text-[10px] font-bold text-neutral-300 dark:text-neutral-700 uppercase tracking-wider block font-mono">
                {language === 'hi' ? "प्रशासनिक अपडेट" : "Admin Panel Update"}
              </span>
            </div>

            {/* Specialist Doctor Placeholder (For Admin Updates) */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between h-full min-h-[280px]">
              <div>
                <span className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-400 flex items-center justify-center mb-4">
                  <Heart size={20} />
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  {language === 'hi' ? "विशेषज्ञ डॉक्टर (Specialist Doctor)" : "Specialist Doctor"}
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {language === 'hi' ? "नेत्र, हड्डी, स्त्री, त्वचा एवं अन्य विशेषज्ञ चिकित्सकों का विवरण शीघ्र ही अपडेट किया जाएगा।" : "Specialists details will be updated here shortly by the administration."}
                </p>
              </div>
              <span className="text-[10px] font-bold text-neutral-300 dark:text-neutral-700 uppercase tracking-wider block font-mono">
                {language === 'hi' ? "प्रशासनिक अपडेट" : "Admin Panel Update"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
