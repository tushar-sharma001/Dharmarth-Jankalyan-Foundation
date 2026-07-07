import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  Stethoscope, 
  Heart, 
  MessageSquare, 
  Calendar, 
  ShieldCheck,
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Download, 
  LogOut, 
  Eye, 
  TrendingUp, 
  ChevronRight,
  Database
} from 'lucide-react';
import { 
  getTrustees, getMembers, getVolunteers, getContactMessages, getDonations, getDoctors, getEvents, getGallery, getTestimonials,
  updateTrusteeStatus, updateMemberStatus, updateVolunteerStatus, markMessageAsRead,
  deleteTrustee, deleteMember, deleteVolunteer, deleteMessage,
  saveDoctor, deleteDoctor, saveEvent, deleteEvent, saveGalleryItem, deleteGalleryItem, saveTestimonial, deleteTestimonial
} from '../lib/firebase';
import { 
  TrusteeApplication, MemberApplication, VolunteerApplication, ContactMessage, DonationRecord, 
  Doctor, EventItem, GalleryItem, Testimonial, Language 
} from '../types';

interface AdminDashboardProps {
  language: Language;
}

type AdminTab = 'dashboard' | 'trustees' | 'members' | 'volunteers' | 'donations' | 'messages' | 'doctors' | 'events' | 'gallery' | 'testimonials';

export default function AdminDashboard({ language }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Firestore States
  const [trustees, setTrustees] = useState<TrusteeApplication[]>([]);
  const [members, setMembers] = useState<MemberApplication[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Form Creation States
  const [docNameEn, setDocNameEn] = useState('');
  const [docNameHi, setDocNameHi] = useState('');
  const [docSpecEn, setDocSpecEn] = useState('');
  const [docSpecHi, setDocSpecHi] = useState('');
  const [docAvEn, setDocAvEn] = useState('');
  const [docAvHi, setDocAvHi] = useState('');
  const [docImg, setDocImg] = useState('');

  const [evtTitleEn, setEvtTitleEn] = useState('');
  const [evtTitleHi, setEvtTitleHi] = useState('');
  const [evtDate, setEvtDate] = useState('');
  const [evtDescEn, setEvtDescEn] = useState('');
  const [evtDescHi, setEvtDescHi] = useState('');
  const [evtStatus, setEvtStatus] = useState<'upcoming' | 'completed'>('upcoming');

  const [galTitleEn, setGalTitleEn] = useState('');
  const [galTitleHi, setGalTitleHi] = useState('');
  const [galCat, setGalCat] = useState<'clinic' | 'doctors' | 'events' | 'camps' | 'service'>('clinic');
  const [galImg, setGalImg] = useState('');

  const [testNameEn, setTestNameEn] = useState('');
  const [testNameHi, setTestNameHi] = useState('');
  const [testRoleEn, setTestRoleEn] = useState('');
  const [testRoleHi, setTestRoleHi] = useState('');
  const [testQuoteEn, setTestQuoteEn] = useState('');
  const [testQuoteHi, setTestQuoteHi] = useState('');

  // Fetch all CMS data
  const loadAllData = async () => {
    try {
      const [t, m, v, d, msg, docs, evts, gal, test] = await Promise.all([
        getTrustees(), getMembers(), getVolunteers(), getDonations(), getContactMessages(),
        getDoctors(), getEvents(), getGallery(), getTestimonials()
      ]);
      setTrustees(t);
      setMembers(m);
      setVolunteers(v);
      setDonations(d);
      setMessages(msg);
      setDoctors(docs);
      setEvents(evts);
      setGallery(gal);
      setTestimonials(test);
    } catch (e) {
      console.error("Could not fetch CMS data", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcodes
    if (passwordInput === 'admin123' || passwordInput === '9212277091') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg(language === 'hi' ? "गलत पासवर्ड, कृपया दोबारा प्रयास करें।" : "Incorrect passcode, please try again.");
    }
  };

  // CSV Exporter
  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(item => {
      return Object.values(item).map(val => `"${String(val).replace(/"/g, '""')}"`).join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ACTIONS FOR APPROVAL / READ
  const handleTrusteeStatus = async (id: string, status: 'approved' | 'rejected') => {
    await updateTrusteeStatus(id, status);
    loadAllData();
  };

  const handleMemberStatus = async (id: string, status: 'approved' | 'rejected') => {
    await updateMemberStatus(id, status);
    loadAllData();
  };

  const handleVolunteerStatus = async (id: string, status: 'approved' | 'rejected') => {
    await updateVolunteerStatus(id, status);
    loadAllData();
  };

  const handleReadMessage = async (id: string) => {
    await markMessageAsRead(id);
    loadAllData();
  };

  const handleDeleteTrustee = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteTrustee(id);
      loadAllData();
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteMember(id);
      loadAllData();
    }
  };

  const handleDeleteVolunteer = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteVolunteer(id);
      loadAllData();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteMessage(id);
      loadAllData();
    }
  };

  // CREATORS
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNameEn || !docSpecEn || !docImg) return;
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      nameEn: docNameEn,
      nameHi: docNameHi || docNameEn,
      specialtyEn: docSpecEn,
      specialtyHi: docSpecHi || docSpecEn,
      availabilityEn: docAvEn || "Daily (9:00 AM - 1:00 PM)",
      availabilityHi: docAvHi || "दैनिक (सुबह 9:00 - दोपहर 1:00)",
      image: docImg
    };
    await saveDoctor(newDoc);
    loadAllData();
    // Reset Form
    setDocNameEn(''); setDocNameHi(''); setDocSpecEn(''); setDocSpecHi(''); setDocAvEn(''); setDocAvHi(''); setDocImg('');
  };

  const handleDeleteDoc = async (id: string) => {
    if (confirm("Delete this Doctor?")) {
      await deleteDoctor(id);
      loadAllData();
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitleEn || !evtDate || !evtDescEn) return;
    const newEvt: EventItem = {
      id: `evt-${Date.now()}`,
      titleEn: evtTitleEn,
      titleHi: evtTitleHi || evtTitleEn,
      date: evtDate,
      descriptionEn: evtDescEn,
      descriptionHi: evtDescHi || evtDescEn,
      status: evtStatus
    };
    await saveEvent(newEvt);
    loadAllData();
    setEvtTitleEn(''); setEvtTitleHi(''); setEvtDate(''); setEvtDescEn(''); setEvtDescHi(''); setEvtStatus('upcoming');
  };

  const handleDeleteEvt = async (id: string) => {
    if (confirm("Delete this Event?")) {
      await deleteEvent(id);
      loadAllData();
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitleEn || !galImg) return;
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      titleEn: galTitleEn,
      titleHi: galTitleHi || galTitleEn,
      category: galCat,
      imageUrl: galImg
    };
    await saveGalleryItem(newItem);
    loadAllData();
    setGalTitleEn(''); setGalTitleHi(''); setGalImg('');
  };

  const handleDeleteGalItem = async (id: string) => {
    if (confirm("Delete this Gallery Item?")) {
      await deleteGalleryItem(id);
      loadAllData();
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testNameEn || !testQuoteEn) return;
    const newTest: Testimonial = {
      id: `test-${Date.now()}`,
      nameEn: testNameEn,
      nameHi: testNameHi || testNameEn,
      roleEn: testRoleEn || "Beneficiary",
      roleHi: testRoleHi || "लाभार्थी",
      quoteEn: testQuoteEn,
      quoteHi: testQuoteHi || testQuoteEn,
      rating: 5
    };
    await saveTestimonial(newTest);
    loadAllData();
    setTestNameEn(''); setTestNameHi(''); setTestRoleEn(''); setTestRoleHi(''); setTestQuoteEn(''); setTestQuoteHi('');
  };

  const handleDeleteTest = async (id: string) => {
    if (confirm("Delete this Testimonial?")) {
      await deleteTestimonial(id);
      loadAllData();
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4 bg-neutral-50 dark:bg-neutral-950 transition-colors py-12">
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800 text-center">
          <div className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl w-fit mx-auto mb-6">
            <Lock size={32} />
          </div>

          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            {language === 'hi' ? "धर्मार्थ एडमिन कंसोल" : "Admin Command Center"}
          </h2>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 font-sans">
            {language === 'hi' 
              ? "यह क्षेत्र केवल संस्था के ट्रस्टी और प्रबंधकों के लिए अधिकृत है।" 
              : "Authorized access only. Enter the secure foundation pin to proceed."}
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                {language === 'hi' ? "सुरक्षा पिन दर्ज करें" : "Security Passcode"}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-sm font-semibold px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-amber-500 text-neutral-800 dark:text-neutral-100 font-mono tracking-widest text-center"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-bold font-sans text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              {language === 'hi' ? "लॉगिन करें" : "Verify & Access Dashboard"}
            </button>
          </form>

          <div className="mt-6 text-[10px] font-semibold text-neutral-400">
            Hint: Contact Helpline number listed on website
          </div>
        </div>
      </section>
    );
  }

  // COMPLETE CMS INTERFACE
  return (
    <section className="bg-neutral-50 dark:bg-neutral-950 min-h-screen transition-colors text-neutral-850 dark:text-neutral-200 font-sans pb-20">
      
      {/* Admin Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Database className="text-amber-500" size={24} />
          <div>
            <h1 className="text-base font-extrabold text-neutral-950 dark:text-white leading-tight">
              {language === 'hi' ? "धर्मार्थ डेटा केंद्र" : "Dharmarth Data Console"}
            </h1>
            <p className="text-[10px] text-neutral-400 font-mono">Live Firestore Synced Mode</p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 transition-colors text-rose-600"
        >
          <LogOut size={13} />
          <span>{language === 'hi' ? "लॉगआउट" : "Exit Console"}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav Buttons */}
        <div className="lg:col-span-3 bg-white dark:bg-neutral-900 p-4 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-1">
          {[
            { id: 'dashboard', label: 'Analytics Board', icon: LayoutDashboard },
            { id: 'trustees', label: 'Trustees applications', icon: ShieldCheck, badge: trustees.filter(t => t.status === 'pending').length },
            { id: 'members', label: 'Members registrations', icon: Users, badge: members.filter(m => m.status === 'pending').length },
            { id: 'volunteers', label: 'Volunteers team', icon: Users },
            { id: 'donations', label: 'Donations ledger', icon: Heart },
            { id: 'messages', label: 'Contact Inquiries', icon: MessageSquare, badge: messages.filter(m => m.status === 'unread').length },
            { id: 'doctors', label: 'Manage Doctors', icon: Stethoscope },
            { id: 'events', label: 'Manage Events/Camps', icon: Calendar },
            { id: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
            { id: 'testimonials', label: 'Manage Testimonials', icon: MessageSquare }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-850'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </span>
                {tab.badge && tab.badge > 0 ? (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white text-amber-600' : 'bg-rose-500 text-white'}`}>
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Content Main Panel */}
        <div className="lg:col-span-9 bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD ANALYTICS */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  {language === 'hi' ? "कंसोल सांख्यिकी विश्लेषण" : "Live Analytics & Logs"}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Trustees", count: trustees.length, color: "text-amber-500 bg-amber-500/5 border-amber-500/15" },
                    { label: "Total Members", count: members.length, color: "text-emerald-600 bg-emerald-600/5 border-emerald-600/15" },
                    { label: "Volunteers Count", count: volunteers.length, color: "text-cyan-600 bg-cyan-600/5 border-cyan-600/15" },
                    { label: "Total Donations Rec.", count: donations.length, color: "text-rose-600 bg-rose-600/5 border-rose-600/15" }
                  ].map((stat, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${stat.color}`}>
                      <span className="text-2xl font-black font-mono block mb-1">{stat.count}</span>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 block">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Simulated Chart visual representing daily patients */}
                <div className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-150 dark:border-neutral-850">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-amber-500 animate-[bounce_2s_infinite]" />
                    <span>Beneficiary Recovery Growth (OPD)</span>
                  </h3>
                  
                  {/* Styled SVG Chart */}
                  <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 font-mono text-[10px]">
                    {[320, 410, 520, 680, 810, 950, 1120].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-neutral-400 font-bold">{val}</span>
                        <div 
                          className="w-full bg-gradient-to-t from-emerald-600 to-amber-500 rounded-t-lg transition-all"
                          style={{ height: `${(val / 1200) * 100}px` }}
                        />
                        <span className="text-neutral-500 font-semibold">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MANAGE TRUSTEES */}
            {activeTab === 'trustees' && (
              <motion.div key="trustees" className="space-y-6">
                <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h2 className="text-base font-extrabold text-neutral-950 dark:text-white">Trustee Applications ({trustees.length})</h2>
                  <button 
                    onClick={() => exportToCSV(trustees, "Trustees_list")}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-xs font-bold rounded-lg"
                  >
                    <Download size={12} />
                    <span>CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-500">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        <th className="py-2">Name</th>
                        <th className="py-2">Contact</th>
                        <th className="py-2">Occupation</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trustees.map((t) => (
                        <tr key={t.id} className="border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/40">
                          <td className="py-3.5 font-bold text-neutral-800 dark:text-neutral-100">{t.name}</td>
                          <td className="py-3.5 font-mono">{t.phone} <br /> {t.email}</td>
                          <td className="py-3.5">{t.occupation}</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : t.status === 'rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right flex justify-end gap-1.5">
                            {t.status === 'pending' && (
                              <>
                                <button onClick={() => handleTrusteeStatus(t.id, 'approved')} className="p-1 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white rounded text-emerald-600 transition-colors"><CheckCircle size={14} /></button>
                                <button onClick={() => handleTrusteeStatus(t.id, 'rejected')} className="p-1 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded text-rose-600 transition-colors"><XCircle size={14} /></button>
                              </>
                            )}
                            <button onClick={() => handleDeleteTrustee(t.id)} className="p-1 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-400 hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 3. MANAGE MEMBERS */}
            {activeTab === 'members' && (
              <motion.div key="members" className="space-y-6">
                <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h2 className="text-base font-extrabold text-neutral-950 dark:text-white">Member Registrations ({members.length})</h2>
                  <button 
                    onClick={() => exportToCSV(members, "Members_list")}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-xs font-bold rounded-lg"
                  >
                    <Download size={12} />
                    <span>CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-500">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        <th className="py-2">Name</th>
                        <th className="py-2">Contact</th>
                        <th className="py-2">Commitment</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((m) => (
                        <tr key={m.id} className="border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/40">
                          <td className="py-3.5 font-bold text-neutral-800 dark:text-neutral-100">{m.name}</td>
                          <td className="py-3.5 font-mono">{m.phone} <br /> {m.email}</td>
                          <td className="py-3.5 font-bold font-mono text-emerald-700">₹{m.monthlyCommitment}/Mo</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : m.status === 'rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right flex justify-end gap-1.5">
                            {m.status === 'pending' && (
                              <>
                                <button onClick={() => handleMemberStatus(m.id, 'approved')} className="p-1 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white rounded text-emerald-600 transition-colors"><CheckCircle size={14} /></button>
                                <button onClick={() => handleMemberStatus(m.id, 'rejected')} className="p-1 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded text-rose-600 transition-colors"><XCircle size={14} /></button>
                              </>
                            )}
                            <button onClick={() => handleDeleteMember(m.id)} className="p-1 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-400 hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 4. VOLUNTEERS */}
            {activeTab === 'volunteers' && (
              <motion.div key="volunteers" className="space-y-6">
                <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h2 className="text-base font-extrabold text-neutral-950 dark:text-white">Volunteers Directory ({volunteers.length})</h2>
                  <button 
                    onClick={() => exportToCSV(volunteers, "Volunteers_list")}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-xs font-bold rounded-lg"
                  >
                    <Download size={12} />
                    <span>CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-500">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        <th className="py-2">Name</th>
                        <th className="py-2">Phone/Email</th>
                        <th className="py-2">Skills</th>
                        <th className="py-2">Location</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((v) => (
                        <tr key={v.id} className="border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/40">
                          <td className="py-3.5 font-bold text-neutral-800 dark:text-neutral-100">{v.name}</td>
                          <td className="py-3.5 font-mono">{v.phone} <br /> {v.email}</td>
                          <td className="py-3.5">{v.skills || "Social Work"}</td>
                          <td className="py-3.5">{v.address}</td>
                          <td className="py-3.5 text-right">
                            <button onClick={() => handleDeleteVolunteer(v.id)} className="p-1 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-400 hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 5. DONATIONS */}
            {activeTab === 'donations' && (
              <motion.div key="donations" className="space-y-6">
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Donations Ledger</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-500">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        <th className="py-2">Donor</th>
                        <th className="py-2">Contact</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Payment Method</th>
                        <th className="py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr key={d.id} className="border-b border-neutral-100 dark:border-neutral-800/50">
                          <td className="py-3.5 font-bold text-neutral-800 dark:text-neutral-100">{d.donorName}</td>
                          <td className="py-3.5 font-mono">{d.phone}</td>
                          <td className="py-3.5 font-bold font-mono text-emerald-700">₹{d.amount.toLocaleString()}</td>
                          <td className="py-3.5">{d.paymentMethod}</td>
                          <td className="py-3.5 font-mono">{d.createdAt.split('T')[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 6. CONTACT INQUIRIES */}
            {activeTab === 'messages' && (
              <motion.div key="messages" className="space-y-6">
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Contact Messages</h2>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-5 rounded-2xl border ${msg.status === 'unread' ? 'bg-amber-500/5 border-amber-500/25' : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-150 dark:border-neutral-850'}`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <span className="text-xs font-bold text-neutral-900 dark:text-white block">{msg.name}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">{msg.phone} • {msg.email}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {msg.status === 'unread' && (
                            <button onClick={() => handleReadMessage(msg.id)} className="p-1 bg-amber-500/10 text-amber-600 rounded hover:bg-amber-500 hover:text-white transition-colors"><Eye size={12} /></button>
                          )}
                          <button onClick={() => handleDeleteMessage(msg.id)} className="p-1 bg-neutral-100 text-neutral-400 hover:text-rose-600 rounded transition-colors"><Trash2 size={12} /></button>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold tracking-wider text-amber-600 uppercase block mb-1">{msg.subject}</span>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 7. MANAGE DOCTORS CMS */}
            {activeTab === 'doctors' && (
              <motion.div key="doctors" className="space-y-6">
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Add / Manage Doctors</h2>
                
                <form onSubmit={handleAddDoctor} className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-850 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Add New Doctor Card</div>
                  
                  <input type="text" placeholder="Dr. Name (English)" value={docNameEn} onChange={(e) => setDocNameEn(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  <input type="text" placeholder="डॉ. नाम (हिन्दी)" value={docNameHi} onChange={(e) => setDocNameHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  
                  <input type="text" placeholder="Specialty (English)" value={docSpecEn} onChange={(e) => setDocSpecEn(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  <input type="text" placeholder="विशेषज्ञता (हिन्दी)" value={docSpecHi} onChange={(e) => setDocSpecHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  
                  <input type="text" placeholder="Availability (English)" value={docAvEn} onChange={(e) => setDocAvEn(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  <input type="text" placeholder="उपलब्ध समय (हिन्दी)" value={docAvHi} onChange={(e) => setDocAvHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  
                  <div className="sm:col-span-2">
                    <input type="text" placeholder="Doctor Photo Image URL" value={docImg} onChange={(e) => setDocImg(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  </div>

                  <button type="submit" className="sm:col-span-2 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5">
                    <Plus size={14} />
                    <span>Onboard Doctor</span>
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctors.map((d) => (
                    <div key={d.id} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={d.image} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <span className="text-xs font-bold block text-neutral-900 dark:text-white">{d.nameEn}</span>
                          <span className="text-[10px] text-neutral-400 block">{d.specialtyEn}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteDoc(d.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded text-rose-600 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 8. MANAGE EVENTS CMS */}
            {activeTab === 'events' && (
              <motion.div key="events" className="space-y-6">
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Add / Manage Camp Events</h2>

                <form onSubmit={handleAddEvent} className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-850 space-y-4">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 font-mono">Create Upcoming or Completed Camp card</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Camp Title (English)" value={evtTitleEn} onChange={(e) => setEvtTitleEn(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                    <input type="text" placeholder="शिविर शीर्षक (हिन्दी)" value={evtTitleHi} onChange={(e) => setEvtTitleHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="date" value={evtDate} onChange={(e) => setEvtDate(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none text-neutral-600" />
                    <select value={evtStatus} onChange={(e) => setEvtStatus(e.target.value as any)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none text-neutral-600">
                      <option value="upcoming">Upcoming Camp (रजिस्ट्रेशन खुला)</option>
                      <option value="completed">Completed Camp (सफल संपन्न)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <textarea placeholder="Camp Description (English)" value={evtDescEn} onChange={(e) => setEvtDescEn(e.target.value)} rows={2} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                    <textarea placeholder="शिविर विवरण (हिन्दी)" value={evtDescHi} onChange={(e) => setEvtDescHi(e.target.value)} rows={2} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  </div>

                  <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5">
                    <Plus size={14} />
                    <span>Deploy Camp Event Card</span>
                  </button>
                </form>

                <div className="space-y-3">
                  {events.map((e) => (
                    <div key={e.id} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 flex justify-between items-center gap-4">
                      <div>
                        <span className="text-xs font-bold text-neutral-900 dark:text-white block">{e.titleEn}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{e.date} • Status: {e.status}</span>
                      </div>
                      <button onClick={() => handleDeleteEvt(e.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded text-rose-600 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 9. MANAGE GALLERY CMS */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" className="space-y-6">
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Add / Manage Gallery Photos</h2>

                <form onSubmit={handleAddGallery} className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-850 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 font-mono">Upload Photo Link to Masonry Directory</div>

                  <input type="text" placeholder="Photo Caption (English)" value={galTitleEn} onChange={(e) => setGalTitleEn(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  <input type="text" placeholder="तस्वीर शीर्षक (हिन्दी)" value={galTitleHi} onChange={(e) => setGalTitleHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  
                  <select value={galCat} onChange={(e) => setGalCat(e.target.value as any)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none text-neutral-600">
                    <option value="clinic">Our Clinic (औषधालय)</option>
                    <option value="doctors">Doctors (चिकित्सक)</option>
                    <option value="events">Events (कार्यक्रम)</option>
                    <option value="camps">Health Camps (शिविर)</option>
                    <option value="service">Welfare Service (सेवा कार्य)</option>
                  </select>

                  <input type="text" placeholder="Photo Image URL" value={galImg} onChange={(e) => setGalImg(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />

                  <button type="submit" className="sm:col-span-2 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5">
                    <Plus size={14} />
                    <span>Upload Image Link</span>
                  </button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div key={g.id} className="relative group rounded-xl overflow-hidden h-32 border border-neutral-150">
                      <img src={g.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => handleDeleteGalItem(g.id)} className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 10. TESTIMONIALS CMS */}
            {activeTab === 'testimonials' && (
              <motion.div key="testimonials" className="space-y-6">
                <h2 className="text-base font-extrabold text-neutral-950 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Add / Manage Reviews</h2>

                <form onSubmit={handleAddTestimonial} className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-850 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Patient/Member Name" value={testNameEn} onChange={(e) => setTestNameEn(e.target.value)} required className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                    <input type="text" placeholder="नाम (हिन्दी)" value={testNameHi} onChange={(e) => setTestNameHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Role (e.g. Local Resident)" value={testRoleEn} onChange={(e) => setTestRoleEn(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                    <input type="text" placeholder="भूमिका / पद (हिन्दी)" value={testRoleHi} onChange={(e) => setTestRoleHi(e.target.value)} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <textarea placeholder="Quote (English)" value={testQuoteEn} onChange={(e) => setTestQuoteEn(e.target.value)} required rows={2} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                    <textarea placeholder="समीक्षा संदेश (हिन्दी)" value={testQuoteHi} onChange={(e) => setTestQuoteHi(e.target.value)} rows={2} className="w-full text-xs p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none" />
                  </div>

                  <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5">
                    <Plus size={14} />
                    <span>Upload Testimonial</span>
                  </button>
                </form>

                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 flex justify-between items-center gap-4">
                      <div>
                        <span className="text-xs font-bold block text-neutral-900 dark:text-white">{t.nameEn} ({t.roleEn})</span>
                        <p className="text-[10px] text-neutral-400 font-sans leading-relaxed italic">"{t.quoteEn.substring(0, 80)}..."</p>
                      </div>
                      <button onClick={() => handleDeleteTest(t.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded text-rose-600 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
