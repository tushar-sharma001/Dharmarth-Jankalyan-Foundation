import React from 'react';
import { motion } from 'motion/react';
import { 
  HeartPulse, 
  Activity, 
  Stethoscope, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  Award,
  BookOpen,
  Pill,
  Shield,
  Dumbbell
} from 'lucide-react';
import { Language } from '../types';

interface ServicesProps {
  language: Language;
}

export default function Services({ language }: ServicesProps) {
  
  // 1. MAIN HEALTHCARE SERVICES (Replace services with exactly these)
  const mainServices = [
    { nameEn: "General OPD", nameHi: "सामान्य ओपीडी" },
    { nameEn: "Health Checkup", nameHi: "स्वास्थ्य जांच" },
    { nameEn: "Health Consultation", nameHi: "स्वास्थ्य परामर्श" },
    { nameEn: "Acupressure", nameHi: "एक्यूप्रेशर" },
    { nameEn: "Ayurvedic Consultation", nameHi: "आयुर्वेदिक परामर्श" }
  ];

  // 2. DISPENSARY SERVICES
  const dispensaryServices = {
    general: {
      titleEn: "General Doctor (6 Days Weekly)",
      titleHi: "सामान्य चिकित्सक (सप्ताह में 6 दिन)",
      itemsEn: ["OPD", "Regular Checkups", "Acupressure", "Ayurvedic Consultation"],
      itemsHi: ["ओपीडी (OPD)", "नियमित शारीरिक जांच", "एक्यूप्रेशर", "आयुर्वेदिक परामर्श"]
    },
    specialists: {
      titleEn: "Specialist Doctors",
      titleHi: "विशेषज्ञ डॉक्टर",
      itemsEn: ["Orthopedic", "Gynecology", "Dermatology", "Diabetes", "Blood Pressure", "Eye Specialist"],
      itemsHi: ["हड्डी रोग (Orthopedic)", "स्त्री रोग (Gynecology)", "त्वचा रोग (Dermatology)", "मधुमेह नियंत्रण", "रक्तचाप (Blood Pressure)", "नेत्र रोग विशेषज्ञ"]
    }
  };

  // 3. HEALTHCARE OFFERINGS (Display exactly these)
  const healthcareOfferings = [
    { nameEn: "Free Medicines", nameHi: "निःशुल्क दवाएं" },
    { nameEn: "Doctor Consultation", nameHi: "चिकित्सक परामर्श" },
    { nameEn: "Qualified Pharmacist", nameHi: "योग्य फार्मासिस्ट" },
    { nameEn: "Blood Pressure Check", nameHi: "रक्तचाप (BP) जांच" },
    { nameEn: "Sugar Test", nameHi: "ब्लड शुगर टेस्ट" },
    { nameEn: "Free ECG Camp", nameHi: "निःशुल्क ईसीजी शिविर" },
    { nameEn: "Specialist Consultation", nameHi: "विशेषज्ञ परामर्श" },
    { nameEn: "Women Health Awareness", nameHi: "महिला स्वास्थ्य जागरूकता" },
    { nameEn: "General Health Awareness", nameHi: "सामान्य स्वास्थ्य जागरूकता" },
    { nameEn: "Preventive Healthcare", nameHi: "निवारक स्वास्थ्य सेवाएं" }
  ];

  // Official Medicine Partners
  const medicinePartners = [
    { name: "Zee Laboratories (Zeelab)", subtitle: "Quality Generics" },
    { name: "DavaIndia Company", subtitle: "Affordable Healthcare" }
  ];

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500 font-mono flex items-center justify-center gap-1.5 mb-2">
            <HeartPulse size={14} />
            {language === 'hi' ? "स्वास्थ्य सेवाएं एवं पेशकश" : "HEALTHCARE SERVICES"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 dark:text-white leading-tight">
            {language === 'hi' ? "हमारी स्वास्थ्य सेवाएं" : "Our Healthcare Services"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-sans">
            {language === 'hi' ? "व्यापार रहित, पूर्णतः निःशुल्क चिकित्सा एवं परामर्श।" : "100% Free medical checkups, consultation, and authentic medicines."}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto mt-4 rounded-full" />
        </div>


        {/* 1. MAIN HEALTHCARE SERVICES (Cards block) */}
        <div className="mb-20">
          <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-8 border-l-4 border-amber-500 pl-3">
            {language === 'hi' ? "प्रमुख स्वास्थ्य सेवाएं" : "Main Healthcare Services"}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {mainServices.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-150 dark:border-neutral-800 text-center flex flex-col items-center justify-center h-40 shadow-sm transition-all"
              >
                <span className="p-3 bg-white dark:bg-neutral-900 rounded-full text-amber-500 shadow-sm border border-neutral-100 dark:border-neutral-800 mb-4">
                  <Stethoscope size={20} />
                </span>
                <span className="text-sm sm:text-base font-extrabold text-neutral-800 dark:text-neutral-200">
                  {language === 'hi' ? service.nameHi : service.nameEn}
                </span>
              </motion.div>
            ))}
          </div>
        </div>


        {/* 2. DISPENSARY SERVICES SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* General Doctor */}
          <div className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-md">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest font-mono">
              {language === 'hi' ? 'दैनिक ओपीडी चिकित्सा' : 'DAILY OPD SERVICE'}
            </span>
            <h4 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white mt-1 mb-6">
              {language === 'hi' ? dispensaryServices.general.titleHi : dispensaryServices.general.titleEn}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dispensaryServices.general.itemsHi.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    {language === 'hi' ? item : dispensaryServices.general.itemsEn[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialist Doctors */}
          <div className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-md">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest font-mono">
              {language === 'hi' ? 'विशेषज्ञ चिकित्सा' : 'SPECIALIZED CLINICS'}
            </span>
            <h4 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white mt-1 mb-6">
              {language === 'hi' ? dispensaryServices.specialists.titleHi : dispensaryServices.specialists.titleEn}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dispensaryServices.specialists.itemsHi.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    {language === 'hi' ? item : dispensaryServices.specialists.itemsEn[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* 3. HEALTHCARE OFFERINGS (Exactly matching requested list) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full w-fit uppercase tracking-widest font-mono">
              {language === 'hi' ? 'हमारी सेवाएं और सुविधायें' : 'HEALTHCARE OFFERINGS'}
            </span>
            <h3 className="text-2xl font-extrabold text-neutral-950 dark:text-white mt-3">
              {language === 'hi' ? 'अस्पताल द्वारा प्रदत्त मुख्य पेशकश' : 'Standard Healthcare Offerings'}
            </h3>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {healthcareOfferings.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800/80 rounded-2xl hover:bg-neutral-100/50 dark:hover:bg-neutral-900/30 transition-all"
              >
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-neutral-800 dark:text-neutral-200">
                  {language === 'hi' ? item.nameHi : item.nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* 4. FREE MEDICINE SECTION & LOGOS */}
        <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl p-8 md:p-12 border border-neutral-150 dark:border-neutral-800 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="p-2 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit inline-block">
                <Pill size={20} />
              </span>
              <h4 className="text-xl font-black text-neutral-900 dark:text-white">
                {language === 'hi' ? 'निःशुल्क दवा वितरण व्यवस्था' : 'Free Medicine Distribution Service'}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                {language === 'hi' ? (
                  "हमारी डिस्पेंसरी में आने वाले हर जरूरतमंद और गरीब मरीज को डॉक्टर द्वारा लिखी गई सभी दवाइयाँ पूरी तरह से निःशुल्क प्रदान की जाती हैं। हम दवाओं की गुणवत्ता से कोई समझौता नहीं करते हैं। हमारी सभी दवाएँ प्रमाणित कंपनियों द्वारा ही निर्मित होती हैं।"
                ) : (
                  "In our charitable dispensary, we guarantee that all recommended, high-quality prescription medicines are given to our needy and underprivileged patients completely free of cost."
                )}
              </p>
            </div>

            {/* Official Medicine Partners Logos rendering */}
            <div className="lg:col-span-6">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block text-center lg:text-left mb-6 font-mono">
                {language === 'hi' ? 'आधिकारिक औषधि प्रदाता सहयोगी' : 'OFFICIAL MEDICINE PARTNERS'}
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Zee Laboratories (Zeelab) SVG Brand Representation */}
                <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-800/80 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs font-sans">
                      Z
                    </div>
                    <span className="text-sm font-black text-indigo-900 dark:text-white font-sans">ZEELAB</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">Zee Laboratories</span>
                </div>

                {/* DavaIndia Company SVG Brand Representation */}
                <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-800/80 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs font-sans">
                      D
                    </div>
                    <span className="text-sm font-black text-emerald-900 dark:text-white font-sans">DavaIndia</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">Generic Pharmacy Partner</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
