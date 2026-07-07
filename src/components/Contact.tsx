import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, Smartphone } from 'lucide-react';
import { sendContactMessage } from '../lib/firebase';
import { Language } from '../types';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert(language === 'hi' ? "कृपया नाम, फ़ोन और संदेश अवश्य भरें।" : "Please fill Name, Phone, and Message.");
      return;
    }
    setLoading(true);
    await sendContactMessage({
      name,
      phone,
      email,
      subject: subject || "General Inquiry",
      message
    });
    setLoading(false);
    setSuccess(true);
    // Reset Form
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 font-mono">
            {language === 'hi' ? "सम्पर्क सूत्र" : "GET IN TOUCH"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "हमसे संपर्क करें" : "Contact Our Foundation"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel: Info & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">
                {language === 'hi' ? "कार्यालय एवं सहायता केंद्र" : "Office & Helpdesk"}
              </h3>

              {/* Address */}
              <div className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl h-fit">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-950 dark:text-white mb-1">
                    {language === 'hi' ? "संस्था का पता" : "Foundation Address"}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-800 dark:text-neutral-300 font-sans font-extrabold leading-relaxed">
                    G-1/13, Budh Vihar Phase-1, Delhi, 110086
                  </p>
                </div>
              </div>

              {/* Contacts list exactly as per PDF */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">
                  {language === 'hi' ? "मुख्य अधिकारी एवं सम्पर्क सूत्र" : "KEY OFFICIAL CONTACTS"}
                </h4>

                {/* President / Founder */}
                <div className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl h-fit">
                    <Smartphone size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-neutral-400 uppercase font-mono">
                        {language === 'hi' ? "संस्थापक / अध्यक्ष" : "FOUNDER / PRESIDENT"}
                      </span>
                    </div>
                    <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white mt-0.5">
                      {language === 'hi' ? "मनोज शर्मा" : "Manoj Sharma"}
                    </h5>
                    <a href="tel:9212277091" className="text-xs font-black text-indigo-600 dark:text-indigo-400 block mt-1 font-mono">
                      +91 9212277091
                    </a>
                  </div>
                </div>

                {/* Treasurer */}
                <div className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl h-fit">
                    <Smartphone size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-neutral-400 uppercase font-mono">
                        {language === 'hi' ? "कोषाध्यक्ष" : "TREASURER"}
                      </span>
                    </div>
                    <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white mt-0.5">
                      {language === 'hi' ? "विशाल शर्मा" : "Vishal Sharma"}
                    </h5>
                    <a href="tel:9871871398" className="text-xs font-black text-indigo-600 dark:text-indigo-400 block mt-1 font-mono">
                      +91 9871871398
                    </a>
                  </div>
                </div>

                {/* Member */}
                <div className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl h-fit">
                    <Smartphone size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-neutral-400 uppercase font-mono">
                        {language === 'hi' ? "सदस्य" : "MEMBER"}
                      </span>
                    </div>
                    <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white mt-0.5">
                      {language === 'hi' ? "अशोक कुमार" : "Ashok Kumar"}
                    </h5>
                    <a href="tel:921211678911" className="text-xs font-black text-indigo-600 dark:text-indigo-400 block mt-1 font-mono">
                      +91 921211678911
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919212277091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle size={14} fill="currentColor" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="tel:9212277091"
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-100 font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <Phone size={14} />
                  <span>{language === 'hi' ? "कॉल करें" : "Call Helpline"}</span>
                </a>
              </div>
            </div>

            {/* Embed Map inside Container */}
            <div className="w-full h-56 rounded-3xl overflow-hidden border border-neutral-150 dark:border-neutral-800 shadow-md">
              <iframe
                title="Dharmarth Jankalyan Foundation Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.812349122349!2d77.08581230000002!3d28.7102349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d06aa07559fd9%3A0x7052968da94cf7b8!2sBudh+Vihar+Phase-1%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
                className="w-full h-full border-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right panel: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-xl">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-6">
                {language === 'hi' ? "सन्देश / पूछताछ भेजें" : "Send Us a Message"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {language === 'hi' ? "आपका नाम *" : "Your Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aniket"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-medium px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {language === 'hi' ? "फ़ोन नंबर *" : "Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="9871871398"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs font-medium px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {language === 'hi' ? "ईमेल पता" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-medium px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {language === 'hi' ? "विषय" : "Subject"}
                    </label>
                    <input
                      type="text"
                      placeholder="Dispensary Timings"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs font-medium px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? "आपका संदेश / सुझाव *" : "Your Message *"}
                  </label>
                  <textarea
                    required
                    placeholder={language === 'hi' ? "यहाँ अपना संदेश विस्तार से लिखें..." : "Enter details of your message, feedback, or camp inquiry..."}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs font-medium p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <Send size={12} />
                  <span>
                    {loading 
                      ? (language === 'hi' ? "भेजा जा रहा है..." : "Sending Message...") 
                      : (language === 'hi' ? "सन्देश भेजें" : "Send Message")}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Success Modal */}
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
                  <CheckCircle size={40} className="animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {language === 'hi' ? "सन्देश प्राप्त हुआ!" : "Message Sent!"}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed mb-6">
                  {language === 'hi' ? (
                    "हमसे संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही आपके फ़ोन या ईमेल के माध्यम से संपर्क करेगी।"
                  ) : (
                    "Thank you for contacting us. Our representative will reach out to you as soon as possible."
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
