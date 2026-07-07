import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Landmark, QrCode, ClipboardCheck, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { recordDonation } from '../lib/firebase';
import { Language } from '../types';

interface DonateProps {
  language: Language;
}

export default function Donate({ language }: DonateProps) {
  const [amount, setAmount] = useState<number | string>(1100);
  const [customActive, setCustomActive] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const presetAmounts = [300, 1100, 5100, 11000, 21000];

  const handleCopyBank = () => {
    const text = "A/c Name: Dharmarth Jankalyan Foundation, A/c No: 412300055123, Bank: State Bank of India, IFSC: SBIN0005432";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorPhone || !amount) {
      alert(language === 'hi' ? "कृपया नाम, फ़ोन नंबर और दान राशि दर्ज करें।" : "Please fill donor name, phone and donation amount.");
      return;
    }
    setLoading(true);
    await recordDonation({
      donorName,
      amount: Number(amount),
      phone: donorPhone,
      email: donorEmail,
      paymentMethod: "UPI / QR Simulation"
    });
    setLoading(false);
    setSuccess(true);
    // Reset Form
    setDonorName('');
    setDonorPhone('');
    setDonorEmail('');
  };

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 font-mono">
            {language === 'hi' ? "दान धर्म" : "SUPPORT OUR WORK"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            {language === 'hi' ? "आपका दान देता है नया जीवन" : "Your Contribution Saves Lives"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-sans">
            {language === 'hi' 
              ? "प्रत्येक दान प्रत्यक्ष रूप से रोगियों की निःशुल्क दवाएं, ईसीजी शिविर और फिजियोथेरेपी उपचार निधि करने में जाता है।" 
              : "100% of your contributions go directly to purchasing free high-quality medicines & funding free diagnostic health camps."}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left panel: Donation presets and form */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-xl">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-6">
              {language === 'hi' ? "सुरक्षित ऑनलाइन दान सिमुलेशन" : "Secure Online Donation"}
            </h3>

            <form onSubmit={handleDonationSubmit} className="space-y-6">
              
              {/* Preset Amounts */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                  {language === 'hi' ? "दान राशि चुनें (INR)" : "Choose Donation Amount (INR)"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustomActive(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                        amount === preset && !customActive
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                      }`}
                    >
                      ₹{preset.toLocaleString()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCustomActive(true)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      customActive
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                    }`}
                  >
                    {language === 'hi' ? "अन्य राशि" : "Custom"}
                  </button>
                </div>
              </div>

              {/* Custom Amount Input */}
              {customActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1"
                >
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    {language === 'hi' ? "अपनी पसंद की राशि दर्ज करें" : "Enter Custom Amount"}
                  </label>
                  <input
                    type="number"
                    min="10"
                    placeholder="Enter amount in ₹"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-xs font-bold font-mono px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                  />
                </motion.div>
              )}

              {/* Donor info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? "दाता का नाम *" : "Donor's Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tushar Sharma"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
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
                    placeholder="9212277091"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full text-xs font-medium px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  {language === 'hi' ? "ईमेल पता" : "Email Address"}
                </label>
                <input
                  type="email"
                  placeholder="donor@outlook.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full text-xs font-medium px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Heart size={14} fill="currentColor" />
                <span>
                  {loading 
                    ? (language === 'hi' ? "दान प्रक्रिया जारी है..." : "Processing Donation...") 
                    : (language === 'hi' ? `₹${Number(amount).toLocaleString()} दान करें` : `Donate ₹${Number(amount).toLocaleString()}`)}
                </span>
              </button>
            </form>
          </div>

          {/* Right panel: Direct Bank & QR Transfer details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* UPI QR Mock Box */}
            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-150 dark:border-neutral-800 shadow-xl flex flex-col items-center text-center">
              <QrCode size={40} className="text-amber-500 mb-4" />
              <h4 className="text-xs font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-2">
                {language === 'hi' ? "स्कैन करके सीधे दान करें" : "Scan to Donate Directly"}
              </h4>
              <p className="text-[10px] text-neutral-400 mb-4 font-sans leading-relaxed">
                {language === 'hi' ? "भीम यूपीआई, फोनपे, पेटीएम या गूगलपे का उपयोग करें" : "Accepts BHIM UPI, PhonePe, Paytm, and Google Pay"}
              </p>

              {/* QR Vector Representation */}
              <div className="w-40 h-40 bg-white p-3 border border-neutral-100 dark:border-neutral-850 rounded-2xl flex items-center justify-center relative shadow-inner">
                {/* Simulated QR Code using nested grids */}
                <div className="grid grid-cols-4 gap-1.5 w-full h-full opacity-80">
                  <div className="bg-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="border-2 border-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="border-2 border-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="border-2 border-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded animate-[pulse_2s_infinite]" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="border-2 border-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="border-2 border-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="bg-neutral-900 rounded" />
                  <div className="border-2 border-neutral-900 rounded" />
                </div>
                {/* Center Logo Icon */}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center border-2 border-white font-extrabold text-[10px] shadow-md font-mono">
                  ॐ
                </div>
              </div>

              <span className="text-xs font-extrabold text-neutral-800 dark:text-emerald-500 font-mono mt-4">
                UPI ID: dharmarth@sbi
              </span>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 p-6 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-inner">
              <h4 className="text-xs font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Landmark size={14} className="text-amber-500" />
                <span>{language === 'hi' ? "सीधे बैंक खाता स्थानांतरण" : "Direct Bank Transfer"}</span>
              </h4>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-400 font-semibold">{language === 'hi' ? "खाता नाम" : "Account Name"}</span>
                  <span className="text-neutral-800 dark:text-neutral-100 font-bold text-right">Dharmarth Jankalyan Foundation</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-400 font-semibold">{language === 'hi' ? "खाता नंबर" : "Account Number"}</span>
                  <span className="text-neutral-800 dark:text-neutral-100 font-bold font-mono">412300055123</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-400 font-semibold">{language === 'hi' ? "बैंक का नाम" : "Bank Name"}</span>
                  <span className="text-neutral-800 dark:text-neutral-100 font-bold text-right">State Bank of India</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-neutral-400 font-semibold">{language === 'hi' ? "IFSC कोड" : "IFSC Code"}</span>
                  <span className="text-neutral-800 dark:text-neutral-100 font-bold font-mono">SBIN0005432</span>
                </div>
              </div>

              <button
                onClick={handleCopyBank}
                className="w-full mt-5 py-2 rounded-xl text-xs font-bold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-200 transition-all flex items-center justify-center gap-1.5"
              >
                <ClipboardCheck size={14} />
                <span>{copied ? (language === 'hi' ? "कॉपी हो गया!" : "Copied!") : (language === 'hi' ? "विवरण कॉपी करें" : "Copy Bank Details")}</span>
              </button>
            </div>

          </div>

        </div>

        {/* DONATION UTILIZATION & TRANSPARENCY SECTION */}
        <div className="mt-20 border-t border-neutral-100 dark:border-neutral-800 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Donation Utilization (दान का सदुपयोग) */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-3 uppercase tracking-wider font-mono">
              {language === 'hi' ? "दान का सदुपयोग" : "DONATION UTILIZATION"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
              {language === 'hi' ? "आपके द्वारा दिया गया एक-एक पैसा सीधे इन कार्यों में पारदर्शी तरीके से उपयोग किया जाता है:" : "Every rupee you contribute is deployed directly to support the following areas:"}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { en: "Treatment of Poor Patients", hi: "गरीब मरीजों का इलाज" },
                { en: "Free Medicines", hi: "निःशुल्क दवाएं" },
                { en: "Doctor Services", hi: "डॉक्टरों की सेवाएं" },
                { en: "Medical Equipment", hi: "चिकित्सा उपकरण" },
                { en: "Health Camps", hi: "निःशुल्क स्वास्थ्य शिविर" }
              ].map((util, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <CheckCircle size={14} className="text-amber-500 shrink-0" />
                  <span className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    {language === 'hi' ? util.hi : util.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency Section (पारदर्शिता) */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white border-l-4 border-emerald-600 pl-3 uppercase tracking-wider font-mono">
              {language === 'hi' ? "पारदर्शिता और ऑडिट" : "TRANSPARENCY & CONTROL"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
              {language === 'hi' ? "संस्था का कार्य पूरी तरह पारदर्शी है। हम निम्नलिखित व्यवस्थाएं सुनिश्चित करते हैं:" : "The foundation maintains 100% financial and operational transparency through:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { en: "Public Expense Reports", hi: "सार्वजनिक व्यय रिपोर्ट" },
                { en: "Transparent Medicine Bills", hi: "पारदर्शी दवा बिल" },
                { en: "CCTV Monitoring", hi: "सीसीटीवी (CCTV) निगरानी" },
                { en: "Patient Record Management", hi: "रोगी रिकॉर्ड प्रबंधन" },
                { en: "WhatsApp Public Updates", hi: "व्हाट्सएप सार्वजनिक अपडेट" },
                { en: "Financial Management", hi: "कुशल वित्तीय प्रबंधन" },
                { en: "Donation Tracking", hi: "दान ट्रैकिंग प्रणाली" },
                { en: "Medicine Inventory", hi: "दवा इन्वेंटरी लॉग्स" },
                { en: "QR Based Donation System", hi: "QR आधारित दान प्रणाली" },
                { en: "Monthly Public Reports", hi: "मासिक सार्वजनिक रिपोर्ट" },
                { en: "Transparent Expense Management", hi: "पारदर्शी व्यय प्रबंधन" }
              ].map((trans, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                  <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                    {language === 'hi' ? trans.hi : trans.en}
                  </span>
                </div>
              ))}
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
                <div className="p-4 bg-amber-100 dark:bg-amber-950/40 text-amber-500 rounded-full w-fit mx-auto mb-4">
                  <Heart size={40} fill="currentColor" className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {language === 'hi' ? "सच्चा दान, महान कार्य!" : "Thank You For Your Support!"}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed mb-6">
                  {language === 'hi' ? (
                    `धर्मार्थ जनकल्याण फाउंडेशन में ₹${Number(amount).toLocaleString()} का दान दर्ज हो गया है। ईश्वर आपके इस परोपकार को समृद्धि दे।`
                  ) : (
                    `Your generous contribution of ₹${Number(amount).toLocaleString()} has been recorded in our donor logs. Our sincere gratitude for your kindness.`
                  )}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all"
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
