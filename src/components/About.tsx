import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Award, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Compass, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { joinedTrustees } from './Membership';

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const [imgIndex, setImgIndex] = React.useState(0);
  const [vijayImgError, setVijayImgError] = React.useState(false);
  
  // Auto-resolving Image Paths for Trustees
  const [imagePaths, setImagePaths] = React.useState<Record<string, string>>({});
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

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

  const imageSources = [
    '/Shri Manish Chaudhary Ji.jpg',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
  ];

  const handleImgError = () => {
    if (imgIndex < imageSources.length - 1) {
      setImgIndex(prev => prev + 1);
    } else {
      setImgIndex(-1);
    }
  };
  
  const registrationDetails = [
    { labelEn: "Section 8 License No.", labelHi: "सेक्शन 8 लाइसेंस नं.", value: "185502" },
    { labelEn: "NITI Aayog ID", labelHi: "नीति आयोग ID", value: "DL/2026/1090575" },
    { labelEn: "e-Anudaan ID", labelHi: "ई-अनुदान ID", value: "DL20261090575DJF" }
  ];

  const challenges = [
    { textEn: "Increasing medicine prices", textHi: "दवाओं की लगातार बढ़ती कीमतें" },
    { textEn: "Lack of nearby healthcare", textHi: "आसपास प्राथमिक स्वास्थ्य सुविधाओं का अभाव" },
    { textEn: "Senior citizens affected", textHi: "वरिष्ठ नागरिकों की गंभीर स्वास्थ्य उपेक्षा" },
    { textEn: "Daily wage workers affected", textHi: "दैनिक वेतन भोगी मजदूरों का आर्थिक संकट" },
    { textEn: "Low-income families affected", textHi: "कम आय वाले परिवारों पर चिकित्सा खर्च का बोझ" },
    { textEn: "Small illnesses becoming major diseases due to delayed treatment", textHi: "समय पर इलाज न मिलने से छोटी बीमारियों का बड़ा रूप ले लेना" }
  ];

  const whyExists = [
    { textEn: "Expensive medicines", textHi: "अत्यधिक महंगी दवाइयाँ" },
    { textEn: "Doctor consultation costs", textHi: "डॉक्टरों की भारी परामर्श फीस" },
    { textEn: "Lack of proper treatment", textHi: "उचित एवं समय पर उपचार का न मिलना" },
    { textEn: "Healthcare should be respectful and affordable", textHi: "स्वास्थ्य सेवा सम्मानजनक और सस्ती/मुफ्त होनी चाहिए" }
  ];

  const missionObjectives = [
    {
      titleEn: "Dignity (सम्मान)",
      titleHi: "सम्मान",
      subtitleEn: "Respect for every patient",
      subtitleHi: "हर मरीज को सम्मान",
      bg: "bg-amber-500/5 border-amber-500/10 dark:bg-amber-950/10",
      iconColor: "text-amber-500"
    },
    {
      titleEn: "Free Medicines (मुफ्त दवाइयाँ)",
      titleHi: "मुफ्त दवाइयाँ",
      subtitleEn: "For needy patients",
      subtitleHi: "जरूरतमंदों के लिए",
      bg: "bg-emerald-500/5 border-emerald-500/10 dark:bg-emerald-950/10",
      iconColor: "text-emerald-600"
    },
    {
      titleEn: "Right Treatment (सही इलाज)",
      titleHi: "सही इलाज",
      subtitleEn: "By qualified doctors",
      subtitleHi: "योग्य डॉक्टरों द्वारा",
      bg: "bg-indigo-500/5 border-indigo-500/10 dark:bg-indigo-950/10",
      iconColor: "text-indigo-600"
    },
    {
      titleEn: "Social Unity (समाज एकता)",
      titleHi: "समाज एकता",
      subtitleEn: "Community service with community support",
      subtitleHi: "समाज के सहयोग से समाज सेवा",
      bg: "bg-rose-500/5 border-rose-500/10 dark:bg-rose-950/10",
      iconColor: "text-rose-600"
    }
  ];

  const futureGoals = [
    { textEn: "Free Health Camps", textHi: "निःशुल्क स्वास्थ्य जांच शिविर" },
    { textEn: "Blood Donation Camps", textHi: "रक्तदान शिविरों का आयोजन" },
    { textEn: "Women's Health Awareness", textHi: "महिला स्वास्थ्य एवं सुरक्षा जागरूकता" },
    { textEn: "Senior Citizen Medical Assistance", textHi: "वरिष्ठ नागरिक चिकित्सा सहायता" },
    { textEn: "Senior Citizen Health Services", textHi: "बुजुर्गों के लिए विशेष स्वास्थ्य सेवाएं" },
    { textEn: "Free Spectacle Distribution", textHi: "निःशुल्क चश्मा वितरण" }
  ];

  return (
    <section className="py-20 bg-[#FAFAFA] dark:bg-neutral-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP BRAND CARD */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 border border-neutral-100 dark:border-neutral-800 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500/10 to-transparent w-full h-full pointer-events-none" />
          
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 font-mono flex items-center justify-center gap-1.5 mb-3">
              <Award size={14} />
              {language === 'hi' ? 'राजकीय पंजीकृत संस्था' : 'GOVT. REGISTERED FOUNDATION'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white leading-tight">
              {language === 'hi' ? 'धर्मार्थ जनकल्याण फाउंडेशन' : 'Dharmarth Jankalyan Foundation'}
            </h1>
            <p className="text-sm sm:text-lg font-bold text-amber-600 dark:text-amber-400 mt-2 font-sans">
              {language === 'hi' ? 'जनसेवा की ओर एक कदम — स्वास्थ्य, सम्मान और समाज के लिए' : 'A step towards public service — for health, dignity and society'}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-1 italic uppercase tracking-wider">
              {language === 'hi' ? '"मानवता के साथ स्वास्थ्य सेवा"' : '"Healthcare with Humanity"'}
            </p>
            
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 py-2 px-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-full border border-emerald-500/10">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                {language === 'hi' ? 'मूल सिद्धांत:' : 'Core Principle:'}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-700 dark:text-amber-400 font-sans">
                {language === 'hi' ? 'हमारी धर्मार्थ डिस्पेंसरी में इलाज सेवा होगी — व्यापार नहीं।' : 'In our charitable dispensary, treatment will be a service — not a business.'}
              </span>
            </div>
          </div>

          {/* Registration badges list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
            {registrationDetails.map((det, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950/50 rounded-2xl border border-neutral-150 dark:border-neutral-800/50">
                <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                  {language === 'hi' ? det.labelHi : det.labelEn}
                </span>
                <span className="text-sm font-extrabold text-neutral-900 dark:text-white mt-1 font-mono">
                  {det.value}
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* WELCOME SECTION (स्वागत एवं परिचय) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 border border-neutral-100 dark:border-neutral-800 shadow-lg">
          <div className="lg:col-span-7 space-y-6">
            <span className="px-3 py-1 text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full w-fit uppercase tracking-widest font-mono block">
              {language === 'hi' ? 'स्वागत एवं परिचय' : 'WELCOME & INTRODUCTION'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white leading-tight">
              {language === 'hi' ? 'यह केवल एक परियोजना नहीं, बल्कि एक पावन मिशन है' : 'Not just a project, but a sacred mission'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              {language === 'hi' ? (
                "धर्मार्थ जनकल्याण फाउंडेशन की यह पहल केवल चिकित्सा परामर्श या निःशुल्क दवाओं की व्यवस्था नहीं है, बल्कि समाज के सबसे जरूरतमंद और कमजोर वर्गों तक सम्मानजनक स्वास्थ्य सेवा पहुंचाने का एक भगीरथ संकल्प है। हमारा मानना है कि स्वास्थ्य पर हर मनुष्य का समान अधिकार है और इसमें व्यावसायिकता की कोई जगह नहीं होनी चाहिए।"
              ) : (
                "This initiative by Dharmarth Jankalyan Foundation is not merely about medical consultation or free medicine distribution; it is a profound vow to deliver respectful, dignified healthcare to the most underprivileged and vulnerable sections of society."
              )}
            </p>
            <div className="p-5 rounded-2xl bg-amber-500/5 border-l-4 border-amber-500 font-sans">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block uppercase mb-1">
                {language === 'hi' ? 'हमारा दृढ़ विश्वास' : 'Our Firm Conviction'}
              </span>
              <p className="text-sm font-extrabold text-neutral-800 dark:text-neutral-200">
                {language === 'hi' ? '“इलाज सेवा होगी — व्यापार नहीं।”' : '“Healthcare will be a service, not a business.”'}
              </p>
            </div>
          </div>

          {/* Dr Vijay Beriwal Profile Widget */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative p-6 bg-neutral-50 dark:bg-neutral-950/80 rounded-3xl border border-neutral-150 dark:border-neutral-800 w-full max-w-[360px] text-center shadow-inner">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 p-1 mb-5 relative shadow-md">
                {/* Visual Avatar with fallback for professional doctor */}
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
                <div className="absolute bottom-1 right-1 p-1 bg-emerald-600 rounded-full text-white border-2 border-white dark:border-neutral-900">
                  <ShieldCheck size={16} />
                </div>
              </div>
              
              <h3 className="text-base font-extrabold text-neutral-950 dark:text-white">
                {language === 'hi' ? 'डॉ. विजय बेरीवाल' : 'Dr. Vijay Beriwal'}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-500 font-bold mt-1 uppercase tracking-wider">
                {language === 'hi' ? 'वरिष्ठ चिकित्सक' : 'Senior Medical Practitioner'}
              </p>
              
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 space-y-1 text-xs text-neutral-500 dark:text-neutral-400 font-semibold font-mono">
                <div>BAMS, MD (Ay)</div>
                <div>PGDHHM (RML Hospital)</div>
                <div>NDDY</div>
              </div>

              <div className="mt-5 text-[10px] font-bold text-neutral-400 tracking-wider">
                {language === 'hi' ? 'मुख्य परामर्शदाता चिकित्सक' : 'Chief Consultant Physician'}
              </div>
            </div>
          </div>
        </div>


        {/* GUIDING PERSON SECTION (मार्गदर्शक) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3 py-1 text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full w-fit uppercase tracking-widest font-mono">
              {language === 'hi' ? 'हमारा मार्गदर्शन' : 'OUR GUIDING LIGHT'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white mt-3">
              {language === 'hi' ? 'मार्गदर्शक' : 'Guiding Person'}
            </h2>
            <div className="w-12 h-0.5 bg-indigo-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="max-w-xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-indigo-500/5 w-full h-full pointer-events-none" />
            
            {/* Displaying Guiding Person Photo as a beautiful stylized container */}
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 p-1 mb-6 relative shadow-md">
              <div className="w-full h-full bg-neutral-100 dark:bg-neutral-950 rounded-full flex items-center justify-center overflow-hidden">
                {imgIndex === -1 ? (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-black tracking-wider">MC</span>
                    <span className="text-[10px] font-bold opacity-80 mt-0.5">Patron</span>
                  </div>
                ) : (
                  <img
                    src={imageSources[imgIndex]}
                    alt="Shri Manish Chaudhary Ji"
                    referrerPolicy="no-referrer"
                    onError={handleImgError}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="absolute bottom-1 right-1 p-1 bg-indigo-600 rounded-full text-white border-2 border-white dark:border-neutral-900">
                <Sparkles size={14} />
              </span>
            </div>

            <h3 className="text-lg font-black text-neutral-950 dark:text-white">
              {language === 'hi' ? 'श्री मनीष चौधरी जी' : 'Shri Manish Chaudhary Ji'}
            </h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-500 font-bold mt-1 uppercase tracking-widest">
              {language === 'hi' ? 'मार्गदर्शक / संरक्षक' : 'Guiding Person / Patron'}
            </p>
            <p className="text-xs text-neutral-500 mt-4 leading-relaxed font-sans max-w-md mx-auto">
              {language === 'hi' ? (
                "श्री मनीष चौधरी जी के अमूल्य दिशा-निर्देशन और प्रेरणा से यह संस्था निरंतर जनसेवा के पथ पर आगे बढ़ रही है। उनका कुशल मार्गदर्शन समाज कल्याण के प्रति हमारे संकल्प को और दृढ़ बनाता है।"
              ) : (
                "Under the invaluable guidance and vision of Shri Manish Chaudhary Ji, our foundation constantly marches forward on the path of selfless social welfare."
              )}
            </p>
          </div>
        </div>


        {/* CHALLENGES & WHY THIS FOUNDATION EXISTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Health Challenges */}
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                <AlertCircle size={22} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                  {language === 'hi' ? 'स्वास्थ्य चुनौतियां' : 'Current Health Challenges'}
                </h3>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  {language === 'hi' ? 'समाज की वर्तमान समस्याएं' : 'Major social hurdles'}
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {challenges.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans font-medium">
                    {language === 'hi' ? item.textHi : item.textEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why this foundation exists */}
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                <Compass size={22} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                  {language === 'hi' ? 'यह फाउंडेशन क्यों आवश्यक है?' : 'Why This Foundation Exists'}
                </h3>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  {language === 'hi' ? 'हमारा औचित्य' : 'Our fundamental reason'}
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {whyExists.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans font-medium">
                    {language === 'hi' ? item.textHi : item.textEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* MISSION OBJECTIVES */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-full w-fit uppercase tracking-widest font-mono">
              {language === 'hi' ? 'मूल स्तम्भ' : 'MISSION CORE OBJECTIVES'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white mt-3">
              {language === 'hi' ? 'लक्ष्य एवं उद्देश्य' : 'Our Core Objectives'}
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionObjectives.map((obj, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl border ${obj.bg} flex flex-col items-center text-center justify-between min-h-[160px]`}
              >
                <span className={`p-3 bg-white dark:bg-neutral-900 rounded-full shadow-sm mb-4 ${obj.iconColor}`}>
                  <Heart size={20} />
                </span>
                <div>
                  <h4 className="text-base font-extrabold text-neutral-900 dark:text-white mb-1 font-sans">
                    {language === 'hi' ? obj.titleHi : obj.titleEn}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                    {language === 'hi' ? obj.subtitleHi : obj.subtitleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* FUTURE GOALS */}
        <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-lg mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500 font-mono">
              {language === 'hi' ? 'भविष्य की योजनाएं' : 'OUR FUTURE GOALS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white mt-2 leading-tight">
              {language === 'hi' ? 'भविष्य के प्रमुख लक्ष्य' : 'Key Future Milestones'}
            </h2>
            <div className="w-12 h-0.5 bg-emerald-600 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureGoals.map((goal, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FAFAFA] dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800/80 flex items-center gap-3.5">
                <span className="p-2 bg-emerald-600 text-white rounded-xl">
                  <CheckCircle size={16} />
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-neutral-800 dark:text-neutral-200">
                  {language === 'hi' ? goal.textHi : goal.textEn}
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* FOUNDATION COMMITMENT (सेवा ही सबसे बड़ा धर्म है) */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-3xl p-8 md:p-12 text-center shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <span className="text-xs font-bold uppercase tracking-widest text-amber-100 font-mono">
            {language === 'hi' ? 'दृढ़ संकल्प' : 'FOUNDATION VOW'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-4">
            {language === 'hi' ? 'सेवा ही सबसे बड़ा धर्म है' : 'Service is the Supreme Virtue'}
          </h2>
          <p className="text-sm sm:text-lg max-w-2xl mx-auto text-amber-50 font-sans font-medium">
            {language === 'hi' ? (
              "हम सेवा, विश्वास और स्वास्थ्य सेवा का एक आंदोलन खड़ा कर रहे हैं। इस पुनीत कार्य में समाज का हर नागरिक सहभागी है।"
            ) : (
              "We are building a movement of service, trust and healthcare. Every single citizen is a partner in this noble endeavor."
            )}
          </p>
        </div>


        {/* COMMUNITY SUPPORT SECTION */}
        <div className="bg-neutral-950 text-neutral-200 rounded-3xl p-8 md:p-12 border border-neutral-900 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 bg-emerald-500/5 w-96 h-96 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 font-mono">
                {language === 'hi' ? 'समाज की भागीदारी' : 'COMMUNITY ALLIANCE'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {language === 'hi' ? 'समाज के बिना कोई भी बड़ा बदलाव संभव नहीं है' : 'No major change is possible without society'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                {language === 'hi' ? (
                  "यह फाउंडेशन केवल चुनिंदा लोगों का नहीं बल्कि पूरे समाज का है। जब समाज मिलकर आगे आता है, तभी बड़े से बड़े लक्ष्यों को प्राप्त किया जा सकता है। हम देश के प्रत्येक जागरूक नागरिक को इस जनसेवा यज्ञ में आहुति देने और भाग लेने के लिए सादर आमंत्रित करते हैं।"
                ) : (
                  "This foundation belongs to the entire society, not just a few. We cordially invite and encourage every concerned citizen to actively participate and support this mission."
                )}
              </p>
            </div>
            
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl w-full max-w-[280px] text-center">
                <h4 className="text-xs font-extrabold text-white mb-2 uppercase tracking-widest font-mono">
                  {language === 'hi' ? 'सहयोग करें' : 'Lend A Hand'}
                </h4>
                <p className="text-[10px] text-neutral-400 mb-4 font-sans">
                  {language === 'hi' ? 'आप स्वयंसेवक या मासिक सदस्य बनकर समाज सेवा कर सकते हैं।' : 'Join us as a regular volunteer or monthly donor today.'}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold py-2 bg-amber-500 text-white rounded-xl">
                    {language === 'hi' ? 'ट्रस्टीशिप ₹21,000' : 'Trustee at ₹21,000'}
                  </span>
                  <span className="text-xs font-bold py-2 bg-white/10 text-white rounded-xl">
                    {language === 'hi' ? 'सदस्यता ₹300/माह' : 'Membership at ₹300/mo'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HONORABLE TRUSTEES BOARD SECTION */}
        <div id="honorable-trustees" className="mt-20 border-t border-neutral-100 dark:border-neutral-800 pt-16">
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

        {/* PARTNER ORGANIZATIONS SECTION */}
        <div className="mt-20 border-t border-neutral-200 dark:border-neutral-800 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full w-fit uppercase tracking-widest font-mono">
              {language === 'hi' ? 'सहयोगी संस्थाएं' : 'PARTNER ORGANIZATIONS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white mt-3">
              {language === 'hi' ? 'सहयोगी सामाजिक संस्थाएं' : 'Our Proud Partner Organizations'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-sans max-w-xl mx-auto">
              {language === 'hi' ? 'इन अग्रणी सामाजिक एवं धार्मिक संस्थाओं के अतुल्य सहयोग से हमारा सेवा संकल्प निरंतर सशक्त हो रहा है:' : 'Our medical service missions are strengthened by the collaborative efforts of these prestigious social organizations:'}
            </p>
            <div className="w-12 h-0.5 bg-emerald-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { en: "Shaheed Bhagat Singh Ekta Club", hi: "शहीद भगत सिंह एकता क्लब" },
              { en: "Shri Bala Ji Seva Samiti", hi: "श्री बाला जी सेवा समिति" },
              { en: "Budh Vihar Vikas Samiti", hi: "बुध विहार विकास समिति" },
              { en: "Sarthak Prayas", hi: "सार्थक प्रयास" },
              { en: "Shri Hari Bhakti Seva Ganga Samiti", hi: "श्री हरि भक्ति सेवा गंगा समिति" },
              { en: "Shri Shyam Banke Bihari Seva Samiti", hi: "श्री श्याम बांके बिहारी सेवा समिति" },
              { en: "Krut Sankalp Society", hi: "कृत संकल्प सोसाइटी" },
              { en: "Jeevani Parivar Foundation", hi: "जीवनी परिवार फाउंडेशन" },
              { en: "Veer Hindu Dal", hi: "वीर हिंदू दल" },
              { en: "Namo Club Charitable Trust", hi: "नमो क्लब चैरिटेबल ट्रस्ट" },
              { en: "Shri Babagiri Bhakti Mandal", hi: "श्री बाबागिरी भक्ति मंडल" },
              { en: "Sevadar Youth Club", hi: "सेवादार यूथ क्लब" }
            ].map((partner, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full group-hover:scale-125 transition-transform" />
                <div className="font-sans text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  {language === 'hi' ? partner.hi : partner.en}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
