import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sparkles, 
  Trophy, 
  Check, 
  CreditCard, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  HelpCircle, 
  AlertCircle,
  Users,
  Heart,
  Calendar
} from 'lucide-react';
import { applyForTrustee, applyForMember } from '../lib/firebase';
import { Language } from '../types';

export const joinedTrustees = [
  {
    nameEn: "Shri Aman Mehta",
    nameHi: "श्री अमन मेहता",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "AM",
    bgGradient: "from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400"
  },
  {
    nameEn: "Shri Harish Sachchar",
    nameHi: "श्री हरीश सच्चर",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "HS",
    bgGradient: "from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400"
  },
  {
    nameEn: "Shri Nitin Hotla",
    nameHi: "श्री नितिन होतला",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "NH",
    bgGradient: "from-blue-500/10 to-indigo-500/10 text-blue-700 dark:text-blue-400"
  },
  {
    nameEn: "Shri Rajesh Goyal",
    nameHi: "श्री राजेश गोयल",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "RG",
    bgGradient: "from-indigo-500/10 to-purple-500/10 text-indigo-700 dark:text-indigo-400"
  },
  {
    nameEn: "Shri Vikas Goyal",
    nameHi: "श्री विकास गोयल",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "VG",
    bgGradient: "from-rose-500/10 to-pink-500/10 text-rose-700 dark:text-rose-400"
  },
  {
    nameEn: "Shri Sudhanshu Sharma",
    nameHi: "श्री सुधांशु शर्मा",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "SS",
    bgGradient: "from-sky-500/10 to-blue-500/10 text-sky-700 dark:text-sky-400"
  },
  {
    nameEn: "Shri Ajay Goyal",
    nameHi: "श्री अजय गोयल",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "AG",
    bgGradient: "from-amber-500/10 to-yellow-500/10 text-amber-700 dark:text-amber-400"
  },
  {
    nameEn: "Shri Sandeep Garg",
    nameHi: "श्री संदीप गर्ग",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "SG",
    bgGradient: "from-teal-500/10 to-green-500/10 text-teal-700 dark:text-teal-400"
  },
  {
    nameEn: "Shri Devendra Rathore",
    nameHi: "श्री देवेंद्र राठौर",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "DR",
    bgGradient: "from-violet-500/10 to-fuchsia-500/10 text-violet-700 dark:text-violet-400"
  },
  {
    nameEn: "Shri Praveen Kumar Handeja",
    nameHi: "श्री प्रवीण कुमार हंडेजा",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "PH",
    bgGradient: "from-rose-500/10 to-orange-500/10 text-rose-700 dark:text-rose-400"
  },
  {
    nameEn: "Shri Gaurav Sharma",
    nameHi: "श्री गौरव शर्मा",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "GS",
    bgGradient: "from-cyan-500/10 to-sky-500/10 text-cyan-700 dark:text-cyan-400"
  },
  {
    nameEn: "Shri Vijay Giri",
    nameHi: "श्री विजय गिरी",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "VG",
    bgGradient: "from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400"
  },
  {
    nameEn: "Shri Vijay Kakkad",
    nameHi: "श्री विजय कक्कड़",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "VK",
    bgGradient: "from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-400"
  },
  {
    nameEn: "Shri Lalit Singhal",
    nameHi: "श्री ललित सिंघल",
    roleEn: "Lifetime Trustee",
    roleHi: "आजीवन ट्रस्टी",
    initials: "LS",
    bgGradient: "from-amber-500/10 to-teal-500/10 text-amber-700 dark:text-amber-400"
  }
];

interface MembershipProps {
  language: Language;
}

export default function Membership({ language }: MembershipProps) {
  const [activeForm, setActiveForm] = useState<'none' | 'trustee' | 'member' | 'supporter'>('none');
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-resolving Image Paths
  const [imagePaths, setImagePaths] = useState<Record<string, string>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const getImagePath = (trusteeName: string) => {
    if (imagePaths[trusteeName] !== undefined) {
      return imagePaths[trusteeName];
    }
    return `/${trusteeName}.jpg`;
  };

  const handleImageError = (trusteeName: string) => {
    const underscoreName = trusteeName.replace(/\s+/g, '_');
    const pathSequence = [
      `/${trusteeName}.jpg`,
      `/${trusteeName}.png`,
      `/${trusteeName}.jpeg`,
      `/trustees/${trusteeName}.jpg`,
      `/trustees/${trusteeName}.png`,
      `/trustees/${trusteeName}.jpeg`,
      `/${underscoreName}.jpg`,
      `/${underscoreName}.png`,
      `/${underscoreName}.jpeg`,
      `/trustees/${underscoreName}.jpg`,
      `/trustees/${underscoreName}.png`,
      `/trustees/${underscoreName}.jpeg`,
    ];

    const currentPath = getImagePath(trusteeName);
    const currentIndex = pathSequence.indexOf(currentPath);

    if (currentIndex !== -1 && currentIndex < pathSequence.length - 1) {
      const nextPath = pathSequence[currentIndex + 1];
      setImagePaths(prev => ({ ...prev, [trusteeName]: nextPath }));
    } else {
      setFailedImages(prev => ({ ...prev, [trusteeName]: true }));
    }
  };

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [duration, setDuration] = useState('3'); // for Supporter (3 months, 6 months, 12 months)

  // Trustee Benefits (exactly from PDF)
  const trusteeBenefits = [
    { en: "Be part of social service", hi: "सामाजिक सेवा का प्रत्यक्ष हिस्सा बनें" },
    { en: "Direct contribution to healthcare", hi: "स्वास्थ्य सेवा में प्रत्यक्ष और अमूल्य योगदान" },
    { en: "Participation in foundation decisions", hi: "फाउंडेशन के महत्वपूर्ण निर्णयों में सक्रिय भागीदारी" },
    { en: "Leave a legacy for future generations", hi: "आने वाली पीढ़ियों के लिए एक महान विरासत छोड़ें" }
  ];

  // Trustee supports what? (exactly from PDF)
  const trusteeSupports = [
    { en: "Infrastructure & Basic Development", hi: "बुनियादी ढांचा एवं विकास" },
    { en: "Furniture & AC Setup", hi: "फर्नीचर एवं वातानुकूलन व्यवस्था" },
    { en: "Water Cooler installation", hi: "ठंडे पानी के वाटर कूलर की स्थापना" },
    { en: "Medicine Storage facilities", hi: "सुरक्षित दवा भंडारण कक्ष" }
  ];

  // Monthly Membership supports what? (exactly from PDF)
  const memberSupports = [
    { en: "Medicines & Medical Supplies", hi: "नियमित दवाइयाँ एवं चिकित्सा आपूर्ति" },
    { en: "Electricity & Clinic Maintenance", hi: "विद्युत व्यय एवं क्लिनिक रखरखाव" },
    { en: "Staff Support & Remuneration", hi: "कर्मचारी सहयोग एवं मानदेय" },
    { en: "Health Camps & General Operations", hi: "नियमित स्वास्थ्य शिविर एवं सामान्य संचालन" }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(language === 'hi' ? "कृपया नाम और फ़ोन भरें।" : "Please fill Name and Phone.");
      return;
    }
    setLoading(true);

    if (activeForm === 'trustee') {
      await applyForTrustee({
        name,
        phone,
        email,
        occupation: "Trustee Applicant",
        address,
        reason: "Applied for Lifetime Trusteeship"
      });
    } else {
      await applyForMember({
        name,
        phone,
        email,
        monthlyCommitment: activeForm === 'member' ? 300 : Number(duration) * 300
      });
    }

    setLoading(false);
    setFormSuccess(true);
    // Reset
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
  };

  const closeDialog = () => {
    setFormSuccess(false);
    setActiveForm('none');
  };

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono flex items-center justify-center gap-1.5 mb-2">
            <Users size={14} />
            {language === 'hi' ? "सहयोग एवं सहभागिता योजनाएं" : "MEMBERSHIP & SUPPORT PLANS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
            {language === 'hi' ? "फाउंडेशन के साथ जुड़ें" : "Support Our Welfare Mission"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>


        {/* THE THREE CORE PLANS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          
          {/* 1. TRUSTEE MEMBERSHIP (Saffron/Amber) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative bg-gradient-to-br from-neutral-50 to-amber-50/20 dark:from-neutral-950 dark:to-neutral-900 p-8 rounded-3xl shadow-xl border-2 border-amber-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-extrabold tracking-widest text-amber-600 dark:text-amber-500 uppercase font-mono bg-amber-500/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? "आजीवन ट्रस्टी" : "LIFETIME TRUSTEE"}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? "प्रारंभिक लक्ष्य: 21 ट्रस्टी" : "Initial Target: 21 Trustees"}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-neutral-900 dark:text-white font-mono">₹21,000</span>
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 ml-1.5">
                  / {language === 'hi' ? "एकमुश्त योगदान" : "One-Time Contribution"}
                </span>
              </div>

              {/* Trustee Benefits */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
                  {language === 'hi' ? "मुख्य ट्रस्टी लाभ" : "TRUSTEE BENEFITS"}
                </h4>
                {trusteeBenefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium font-sans">
                      {language === 'hi' ? b.hi : b.en}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trustee Supports What? */}
              <div className="space-y-4 mb-8 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-6">
                <h4 className="text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
                  {language === 'hi' ? "योगदान का उपयोग" : "CONTRIBUTION SUPPORTS"}
                </h4>
                {trusteeSupports.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                    <span className="text-neutral-600 dark:text-neutral-400 font-sans">
                      {language === 'hi' ? s.hi : s.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] text-neutral-400 italic font-medium leading-relaxed font-sans text-center">
                {language === 'hi' ? "* ट्रस्टियों के नाम और फोटो वेबसाइट पर सार्वजनिक रूप से प्रदर्शित किए जाएंगे और वे निर्णयों में भाग लेंगे।" : "* Trustees' names and photos are displayed publicly. Trustees participate in major decisions."}
              </p>
              <button
                onClick={() => {
                  setActiveForm('trustee');
                  setFormSuccess(false);
                }}
                className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/10 transition-all hover:-translate-y-0.5"
              >
                {language === 'hi' ? "ट्रस्टीशिप के लिए आवेदन" : "Apply for Trusteeship"}
              </button>
            </div>
          </motion.div>

          {/* 2. MONTHLY MEMBERSHIP (Emerald) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative bg-gradient-to-br from-neutral-50 to-emerald-50/10 dark:from-neutral-950 dark:to-neutral-900 p-8 rounded-3xl shadow-xl border-2 border-emerald-600/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-extrabold tracking-widest text-emerald-700 dark:text-emerald-500 uppercase font-mono bg-emerald-600/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? "मासिक सदस्यता" : "MONTHLY MEMBERSHIP"}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? "नियमित सहयोग" : "Regular Support"}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-neutral-900 dark:text-white font-mono">₹300</span>
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 ml-1.5">
                  / {language === 'hi' ? "प्रति माह" : "Per Month"}
                </span>
              </div>

              {/* Member Benefits */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
                  {language === 'hi' ? "सदस्यता के लाभ" : "MEMBER BENEFIT"}
                </h4>
                <div className="flex items-start gap-2.5 text-xs">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium font-sans">
                    {language === 'hi' ? "सामुदायिक स्वास्थ्य सेवा में सक्रिय भागीदारी का अवसर" : "Active participation in community healthcare and decision support."}
                  </span>
                </div>
              </div>

              {/* Member Supports What? */}
              <div className="space-y-4 mb-8 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-6">
                <h4 className="text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
                  {language === 'hi' ? "योगदान का उपयोग" : "FUNDS USED FOR"}
                </h4>
                {memberSupports.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                    <span className="text-neutral-600 dark:text-neutral-400 font-sans">
                      {language === 'hi' ? s.hi : s.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveForm('member');
                setFormSuccess(false);
              }}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-700/10 transition-all hover:-translate-y-0.5"
            >
              {language === 'hi' ? "मासिक सदस्य बनें" : "Become Monthly Member"}
            </button>
          </motion.div>

          {/* 3. SUPPORTER PLAN (Blue/Indigo) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative bg-gradient-to-br from-neutral-50 to-indigo-50/10 dark:from-neutral-950 dark:to-neutral-900 p-8 rounded-3xl shadow-xl border-2 border-indigo-600/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-extrabold tracking-widest text-indigo-700 dark:text-indigo-400 uppercase font-mono bg-indigo-600/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? "समर्थक योजना" : "SUPPORTER PLAN"}
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-600/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? "अग्रिम योगदान" : "Advance Support"}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-neutral-900 dark:text-white font-mono">₹300</span>
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 ml-1.5">
                  / {language === 'hi' ? "प्रति माह" : "Per Month"}
                </span>
              </div>

              {/* Supporter Options list */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
                  {language === 'hi' ? "सहयोग विकल्प" : "SUPPORT OPTIONS"}
                </h4>
                
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{language === 'hi' ? "3 महीने" : "3 Months"}</span>
                    <span className="text-sm font-black text-indigo-600">₹900</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{language === 'hi' ? "6 महीने" : "6 Months"}</span>
                    <span className="text-sm font-black text-indigo-600">₹1,800</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{language === 'hi' ? "1 वर्ष" : "1 Year"}</span>
                    <span className="text-sm font-black text-indigo-600">₹3,600</span>
                  </div>
                </div>
              </div>

              {/* Quote from PDF */}
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 text-center mb-8">
                <p className="text-xs font-extrabold text-indigo-800 dark:text-indigo-400 italic font-sans">
                  {language === 'hi' ? "“एक छोटा मासिक योगदान बड़ा प्रभाव पैदा करता है।”" : "“A small monthly contribution creates a big impact.”"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveForm('supporter');
                setFormSuccess(false);
              }}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-700/10 transition-all hover:-translate-y-0.5"
            >
              {language === 'hi' ? "समर्थक बनें" : "Become Supporter"}
            </button>
          </motion.div>

        </div>


        {/* APPLICATION FORM INTERFACE */}
        <AnimatePresence>
          {activeForm !== 'none' && !formSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-xl mx-auto mt-12"
            >
              <div className="bg-neutral-50 dark:bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 relative shadow-inner">
                <button
                  onClick={() => setActiveForm('none')}
                  className="absolute top-4 right-4 text-xs font-bold text-neutral-400 hover:text-neutral-600"
                >
                  {language === 'hi' ? "बंद करें" : "Cancel"}
                </button>

                <h3 className="text-base font-black text-neutral-900 dark:text-white mb-6">
                  {activeForm === 'trustee' && (language === 'hi' ? "आजीवन ट्रस्टीशिप पंजीकरण" : "Apply for Lifetime Trusteeship")}
                  {activeForm === 'member' && (language === 'hi' ? "मासिक सदस्यता पंजीकरण" : "Become Monthly Member")}
                  {activeForm === 'supporter' && (language === 'hi' ? "समर्थक योजना पंजीकरण" : "Supporter Plan Registration")}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      {language === 'hi' ? "पूरा नाम *" : "Full Name *"}
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                      <input
                        type="text"
                        required
                        placeholder="Vijay Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      {language === 'hi' ? "मोबाइल नंबर *" : "Phone Number *"}
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="9212277091"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      {language === 'hi' ? "ईमेल पता" : "Email Address"}
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  {activeForm === 'trustee' && (
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                        {language === 'hi' ? "पता *" : "Address *"}
                      </label>
                      <div className="relative">
                        <MapPin size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                        <input
                          type="text"
                          required
                          placeholder="Budh Vihar Phase-1, Delhi"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {activeForm === 'supporter' && (
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                        {language === 'hi' ? "योगदान अवधि" : "Duration of Support"}
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none"
                        >
                          <option value="3">3 {language === 'hi' ? "महीने (₹900)" : "Months (₹900)"}</option>
                          <option value="6">6 {language === 'hi' ? "महीने (₹1,800)" : "Months (₹1,800)"}</option>
                          <option value="12">1 {language === 'hi' ? "वर्ष (₹3,600)" : "Year (₹3,600)"}</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:bg-neutral-400"
                  >
                    {loading ? (language === 'hi' ? "सबमिट हो रहा है..." : "Submitting...") : (language === 'hi' ? "पंजीकरण जमा करें" : "Submit Registration")}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* TRUSTEES LIST & DIRECTORS SECTION (Trustees names displayed publicly) */}
        <div id="joined-trustees" className="mt-20 border-t border-neutral-100 dark:border-neutral-800 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              {language === 'hi' ? "हमारे सम्मानित न्यासी" : "HONORABLE TRUSTEES LIST"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-2 leading-tight">
              {language === 'hi' ? "आजीवन न्यासी (Trustees) मंडल" : "Lifetime Trustees Board"}
            </h3>
            <p className="text-xs text-neutral-500 mt-2 font-sans max-w-lg mx-auto">
              {language === 'hi' ? "सराहनीय सेवा भाव और समर्पण के साथ हमारी संस्था से जुड़े समस्त गौरवशाली न्यासी:" : "The noble-hearted individuals who have joined hands as Lifetime Trustees to support our healthcare mission:"}
            </p>
            <div className="w-12 h-0.5 bg-neutral-300 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6">
            {joinedTrustees.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white dark:bg-neutral-900/50 rounded-3xl border border-neutral-150 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container with precise alignment fitting perfectly from top */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                  {!failedImages[t.nameEn] ? (
                    <img
                      src={getImagePath(t.nameEn)}
                      alt={language === 'hi' ? t.nameHi : t.nameEn}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(t.nameEn)}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* High-craft Initials Fallback if image doesn't exist */
                    <div className={`w-full h-full bg-gradient-to-br ${t.bgGradient} flex flex-col items-center justify-center p-6 text-center select-none`}>
                      <span className="text-5xl font-black tracking-widest font-sans uppercase opacity-90 mb-2">
                        {t.initials}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 font-mono">
                        {language === 'hi' ? "गौरवशाली न्यासी" : "Honorable Trustee"}
                      </span>
                    </div>
                  )}
                  {/* Subtle Elegant Saffron Accent Ribbon */}
                  <div className="absolute top-4 right-4 bg-amber-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider shadow-md backdrop-blur-sm bg-opacity-95 font-sans">
                    {language === 'hi' ? "न्यासी" : "Trustee"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-grow text-center">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white leading-tight group-hover:text-amber-600 transition-colors">
                      {language === 'hi' ? t.nameHi : t.nameEn}
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 font-mono">
                      {language === 'hi' ? t.roleHi : t.roleEn}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 font-medium font-sans">
                    Dharmarth Jankalyan Foundation
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Form Success Dialog popup */}
        <AnimatePresence>
          {formSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <div className="bg-white dark:bg-neutral-950 p-8 rounded-3xl max-w-sm w-full text-center border border-neutral-100 dark:border-neutral-800 shadow-2xl">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-full w-fit mx-auto mb-4">
                  <Trophy size={36} />
                </div>
                <h3 className="text-base font-black text-neutral-900 dark:text-white mb-2">
                  {language === 'hi' ? "आवेदन सबमिट हुआ!" : "Application Submitted!"}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed mb-6">
                  {language === 'hi' ? (
                    "धर्मार्थ जनकल्याण फाउंडेशन से जुड़ने के अनुरोध के लिए आपका धन्यवाद। हमारे मुख्य संचालक शीघ्र ही आपसे संपर्क करेंगे।"
                  ) : (
                    "Thank you for registering. Our representatives will get in touch with you shortly to finalize the process."
                  )}
                </p>
                <button
                  onClick={closeDialog}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  {language === 'hi' ? "ठीक है" : "Close"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
