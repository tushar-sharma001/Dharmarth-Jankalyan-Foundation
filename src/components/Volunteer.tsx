import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, User, Phone, Mail, Award, MapPin, Check } from 'lucide-react';
import { registerVolunteer } from '../lib/firebase';
import { Language } from '../types';

interface VolunteerProps {
  language: Language;
}

export default function Volunteer({ language }: VolunteerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const perks = [
    { titleEn: "Certificate of Service", titleHi: "सेवा प्रमाण पत्र", descEn: "Get official recognition certificates from the foundation.", descHi: "फाउंडेशन से आधिकारिक सेवा मान्यता प्रमाण पत्र प्राप्त करें।" },
    { titleEn: "Skill Development", titleHi: "कौशल विकास", descEn: "Learn medical campaign organization, coordination, and community work.", descHi: "चिकित्सा अभियान संगठन, समन्वय और सामुदायिक कार्य सीखें।" },
    { titleEn: "Social Networking", titleHi: "सामाजिक नेटवर्किंग", descEn: "Connect with expert doctors, lifetime trustees, and social leaders.", descHi: "विशेषज्ञ डॉक्टरों, आजीवन ट्रस्टियों और सामाजिक नेताओं से जुड़ें।" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert(language === 'hi' ? "कृपया नाम, फ़ोन नंबर और पता अवश्य दर्ज करें।" : "Please fill Name, Phone, and Address.");
      return;
    }
    setLoading(true);
    await registerVolunteer({
      name,
      phone,
      email,
      skills,
      address
    });
    setLoading(false);
    setSuccess(true);
    // Reset Form
    setName('');
    setPhone('');
    setEmail('');
    setSkills('');
    setAddress('');
  };

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500 font-mono">
            {language === 'hi' ? "नर सेवा नारायण सेवा" : "VOLUNTEER WITH US"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "स्वयंसेवक बनकर समाज सुधारें" : "Be a Force for Good"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Info and perks */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              {language === 'hi' ? "स्वयंसेवक क्यों बनें?" : "Why Volunteer with Dharmarth?"}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
              {language === 'hi' ? (
                "आपका समय और समर्पण किसी जरूरतमंद की स्वास्थ्य रक्षा और जीवन सुधार में अमूल्य साबित हो सकता है। हमारी निःशुल्क ओपीडी और चिकित्सा शिविरों में आपका स्वागत है।"
              ) : (
                "Your time and dedication can save lives and help the underprivileged access medical services. Volunteer in our OPDs, ECG camps, and medicine distributions."
              )}
            </p>

            <div className="space-y-4 pt-4">
              {perks.map((p, i) => (
                <div key={i} className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl h-fit">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                      {language === 'hi' ? p.titleHi : p.titleEn}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                      {language === 'hi' ? p.descHi : p.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-xl">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-6">
                {language === 'hi' ? "स्वयंसेवक पंजीकरण फॉर्म" : "Volunteer Registration Form"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {language === 'hi' ? "पूरा नाम *" : "Full Name *"}
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                      <input
                        type="text"
                        required
                        placeholder="Rohan Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-emerald-600 transition-colors text-neutral-800 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {language === 'hi' ? "मोबाइल नंबर *" : "Mobile Number *"}
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="9871871398"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-emerald-600 transition-colors text-neutral-800 dark:text-neutral-100"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? "ईमेल पता" : "Email Address"}
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                    <input
                      type="email"
                      placeholder="rohan@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-emerald-600 transition-colors text-neutral-800 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? "पता (स्थान) *" : "Address (Location) *"}
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="Budh Vihar Phase-1, New Delhi"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-emerald-600 transition-colors text-neutral-800 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? "विशेष कौशल / अनुभव (उदा. नर्सिंग, कैंप समन्वय)" : "Special Skills / Expertise (e.g., Medicine, Event Coord.)"}
                  </label>
                  <textarea
                    placeholder={language === 'hi' ? "नर्सिंग, योग, समाज सेवा, सोशल मीडिया आदि..." : "Nursing, camp management, social media coordination, etc..."}
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full text-xs font-medium p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-emerald-600 transition-colors text-neutral-800 dark:text-neutral-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
                >
                  {loading 
                    ? (language === 'hi' ? "पंजीकरण किया जा रहा है..." : "Registering...") 
                    : (language === 'hi' ? "स्वयंसेवक पंजीकरण जमा करें" : "Submit Volunteer Registration")}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Success Dialog */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white dark:bg-neutral-950 p-8 rounded-3xl max-w-sm w-full text-center border border-neutral-100 dark:border-neutral-800 shadow-2xl"
              >
                <div className="p-4 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full w-fit mx-auto mb-4">
                  <Trophy size={40} className="animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {language === 'hi' ? "पंजीकरण सफल!" : "Registration Successful!"}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed mb-6">
                  {language === 'hi' ? (
                    "स्वयंसेवक के रूप में शामिल होने के लिए आभार। धर्मार्थ की टीम अतिशीघ्र आपसे संपर्क करेगी।"
                  ) : (
                    "Thank you for volunteering. Our team will contact you shortly to onboard you for upcoming camps."
                  )}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  {language === 'hi' ? "ठीक है" : "Done"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
