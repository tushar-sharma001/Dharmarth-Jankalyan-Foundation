import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  TrusteeApplication, 
  MemberApplication, 
  VolunteerApplication, 
  ContactMessage, 
  DonationRecord,
  Doctor,
  GalleryItem,
  EventItem,
  Testimonial
} from '../types';

// Hardcoded config based on firebase-applet-config.json
const firebaseConfig = {
  apiKey: "GEMINI_API_KEY",
  authDomain: "gmp-demo-project-161173718.firebaseapp.com",
  projectId: "gmp-demo-project-161173718",
  storageBucket: "gmp-demo-project-161173718.firebasestorage.app",
  messagingSenderId: "518175344714",
  appId: "1:518175344714:web:3b69158165fb478da33eb3"
};

const app = initializeApp(firebaseConfig);

// Initialize firestore with specific databaseId from config
let db: any;
try {
  db = getFirestore(app, "ai-studio-dharmarthjankaly-5eaff532-844a-4b13-b360-12797acf3e2a");
} catch (e) {
  console.warn("Firestore custom database init failed, falling back to default.", e);
  db = getFirestore(app);
}

export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// LocalStorage helpers to act as a fallback and state syncer
const getLocalData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveLocalData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// INITIAL SEED DATA FOR OFFLINE / FIRST RUN
const defaultDoctors: Doctor[] = [
  {
    id: "doc-1",
    nameEn: "Dr. Ramesh Sharma",
    nameHi: "डॉ. रमेश शर्मा",
    specialtyEn: "Senior General Physician",
    specialtyHi: "वरिष्ठ सामान्य चिकित्सक",
    availabilityEn: "Mon - Sat (9:00 AM - 1:00 PM)",
    availabilityHi: "सोम - शनि (सुबह 9:00 - दोपहर 1:00)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "doc-2",
    nameEn: "Dr. Anjali Verma",
    nameHi: "डॉ. अंजलि वर्मा",
    specialtyEn: "Ayurvedic Specialist",
    specialtyHi: "आयुर्वेदिक विशेषज्ञ",
    availabilityEn: "Tue, Thu, Sat (2:00 PM - 5:00 PM)",
    availabilityHi: "मंगल, गुरु, शनि (दोपहर 2:00 - शाम 5:00)",
    image: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "doc-3",
    nameEn: "Dr. Vikram Malhotra",
    nameHi: "डॉ. विक्रम मल्होत्रा",
    specialtyEn: "Physiotherapist",
    specialtyHi: "फिजियोथेरेपिस्ट",
    availabilityEn: "Mon, Wed, Fri (3:00 PM - 6:00 PM)",
    availabilityHi: "सोम, बुध, शुक्र (दोपहर 3:00 - शाम 6:00)",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop"
  }
];

const defaultGallery: GalleryItem[] = [
  {
    id: "gal-1",
    titleEn: "Annual Foundation Planning Meeting",
    titleHi: "वार्षिक फाउंडेशन योजना बैठक",
    category: "foundation-meetings",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-2",
    titleEn: "Lifetime Trustees Coordination Meet",
    titleHi: "आजीवन न्यासियों (Trustees) की समन्वय बैठक",
    category: "trustee-meetings",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-3",
    titleEn: "Free Cardiology and ECG Health Camp",
    titleHi: "निःशुल्क हृदय रोग एवं ईसीजी स्वास्थ्य शिविर",
    category: "health-camps",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-4",
    titleEn: "Dharmarth Dispensary General OPD Consultation",
    titleHi: "धर्मार्थ औषधालय सामान्य ओपीडी परामर्श",
    category: "dispensary",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-5",
    titleEn: "Free Quality Medicine Distribution Drive",
    titleHi: "निःशुल्क उच्च गुणवत्ता युक्त दवा वितरण अभियान",
    category: "medicine-distribution",
    imageUrl: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-6",
    titleEn: "Hygiene & Preventive Health Community Program",
    titleHi: "स्वच्छता एवं निवारक स्वास्थ्य सामुदायिक कार्यक्रम",
    category: "community-programs",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-7",
    titleEn: "Our Panel of Qualified Doctors & Pharmacists",
    titleHi: "हमारे योग्य चिकित्सकों एवं फार्मासिस्टों का पैनल",
    category: "doctors",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gal-8",
    titleEn: "Collaborative Event with Partner Organizations",
    titleHi: "सहयोगी संस्थाओं के साथ संयुक्त सेवा कार्यक्रम",
    category: "partner-organizations",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop"
  }
];

const defaultEvents: EventItem[] = [
  {
    id: "evt-1",
    titleEn: "Mega Free ECG and BP Check Camp",
    titleHi: "विशाल निःशुल्क ईसीजी और बीपी जांच शिविर",
    date: "2026-07-15",
    descriptionEn: "A complete cardiovascular health screening including free ECG, Blood Pressure, and blood sugar testing at Budh Vihar dispensary.",
    descriptionHi: "बुध विहार औषधालय में निःशुल्क ईसीजी, रक्तचाप और ब्लड शुगर परीक्षण सहित एक पूर्ण हृदय स्वास्थ्य जांच शिविर।",
    status: "upcoming"
  },
  {
    id: "evt-2",
    titleEn: "Ayurvedic Health and Lifestyle Seminar",
    titleHi: "आयुर्वेदिक स्वास्थ्य और जीवन शैली सेमिनार",
    date: "2026-07-28",
    descriptionEn: "Learn ancient wisdom of Ayurveda for modern disease prevention. Free Ayurvedic consultation & organic medicine samples will be distributed.",
    descriptionHi: "आधुनिक बीमारियों से बचाव के लिए आयुर्वेद का प्राचीन ज्ञान सीखें। निःशुल्क आयुर्वेदिक परामर्श और जैविक दवाओं के नमूने वितरित किए जाएंगे।",
    status: "upcoming"
  },
  {
    id: "evt-3",
    titleEn: "Yoga & Mental Wellness Session",
    titleHi: "योग और मानसिक कल्याण सत्र",
    date: "2026-06-21",
    descriptionEn: "Conducted successfully on International Yoga Day. Over 150 local residents participated in meditation & health counselling.",
    descriptionHi: "अंतर्राष्ट्रीय योग दिवस पर सफलतापूर्वक आयोजित किया गया। 150 से अधिक स्थानीय निवासियों ने ध्यान और स्वास्थ्य परामर्श में भाग लिया।",
    status: "completed"
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    nameEn: "Rajesh K. Gupta",
    nameHi: "राजेश के. गुप्ता",
    roleEn: "Local Resident, Budh Vihar",
    roleHi: "स्थानीय निवासी, बुध विहार",
    quoteEn: "The free dispensary is a blessing for seniors like me. Dr. Sharma listens with patience, and we get high-quality medicines completely free.",
    quoteHi: "निःशुल्क औषधालय मेरे जैसे वरिष्ठ नागरिकों के लिए वरदान है। डॉ. शर्मा धैर्यपूर्वक सुनते हैं, और हमें उच्च गुणवत्ता वाली दवाएं पूरी तरह से मुफ्त मिलती हैं।",
    rating: 5
  },
  {
    id: "test-2",
    nameEn: "Meena Devi",
    nameHi: "मीना देवी",
    roleEn: "Homemaker",
    roleHi: "गृहणी",
    quoteEn: "My mother is receiving free physiotherapy sessions here. The staff is dedicated and very polite. This foundation is truly doing business-free service.",
    quoteHi: "मेरी मां को यहां मुफ्त फिजियोथेरेपी मिल रही है। स्टाफ समर्पित और बहुत विनम्र है। यह फाउंडेशन वास्तव में बिना व्यापार के सेवा कर रहा है।",
    rating: 5
  },
  {
    id: "test-3",
    nameEn: "Suresh Chandra",
    nameHi: "सुरेश चंद्र",
    roleEn: "Retired Teacher",
    roleHi: "सेवानिवृत्त शिक्षक",
    quoteEn: "I joined as a monthly member at just ₹300. Knowing that my small contribution helps fund someone's free medicines gives me great mental peace.",
    quoteHi: "मैं मात्र ₹300 में मासिक सदस्य के रूप में शामिल हुआ। यह जानकर कि मेरा छोटा सा योगदान किसी की मुफ्त दवाओं में मदद करता है, मुझे बड़ी मानसिक शांति मिलती है।",
    rating: 5
  }
];

// Fallback initializer for dynamic data (Trustees, Members, Messages, etc)
const initializeLocalStorage = () => {
  if (!localStorage.getItem('doctors')) saveLocalData('doctors', defaultDoctors);
  if (!localStorage.getItem('gallery')) saveLocalData('gallery', defaultGallery);
  if (!localStorage.getItem('events')) saveLocalData('events', defaultEvents);
  if (!localStorage.getItem('testimonials')) saveLocalData('testimonials', defaultTestimonials);
  if (!localStorage.getItem('trustees')) saveLocalData('trustees', []);
  if (!localStorage.getItem('members')) saveLocalData('members', []);
  if (!localStorage.getItem('volunteers')) saveLocalData('volunteers', []);
  if (!localStorage.getItem('messages')) saveLocalData('messages', []);
  if (!localStorage.getItem('donations')) saveLocalData('donations', []);
};

initializeLocalStorage();

// SERVICE FUNCTIONS WITH FIREBASE READ/WRITE AND LOCAL FALLBACK

// 1. TRUSTEES
export const applyForTrustee = async (data: Omit<TrusteeApplication, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  const newApp: TrusteeApplication = {
    ...data,
    id: `trustee-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    await addDoc(collection(db, 'trustee_applications'), newApp);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'trustee_applications');
  }
  // Always save locally as fallback and for instantaneous response
  const local = getLocalData<TrusteeApplication>('trustees');
  local.unshift(newApp);
  saveLocalData('trustees', local);
};

export const getTrustees = async (): Promise<TrusteeApplication[]> => {
  try {
    const q = query(collection(db, 'trustee_applications'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const result: TrusteeApplication[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as TrusteeApplication);
    });
    if (result.length > 0) {
      saveLocalData('trustees', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'trustee_applications');
  }
  return getLocalData<TrusteeApplication>('trustees');
};

export const updateTrusteeStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
  const local = getLocalData<TrusteeApplication>('trustees');
  const index = local.findIndex(t => t.id === id);
  if (index !== -1) {
    local[index].status = status;
    saveLocalData('trustees', local);
  }
  try {
    const docRef = doc(db, 'trustee_applications', id);
    await updateDoc(docRef, { status });
  } catch (e) {
    handleFirestoreError(e, OperationType.UPDATE, `trustee_applications/${id}`);
  }
};

export const deleteTrustee = async (id: string): Promise<void> => {
  const local = getLocalData<TrusteeApplication>('trustees');
  saveLocalData('trustees', local.filter(t => t.id !== id));
  try {
    await deleteDoc(doc(db, 'trustee_applications', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `trustee_applications/${id}`);
  }
};

// 2. MEMBERS
export const applyForMember = async (data: Omit<MemberApplication, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  const newApp: MemberApplication = {
    ...data,
    id: `member-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    await addDoc(collection(db, 'member_applications'), newApp);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'member_applications');
  }
  const local = getLocalData<MemberApplication>('members');
  local.unshift(newApp);
  saveLocalData('members', local);
};

export const getMembers = async (): Promise<MemberApplication[]> => {
  try {
    const q = query(collection(db, 'member_applications'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const result: MemberApplication[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as MemberApplication);
    });
    if (result.length > 0) {
      saveLocalData('members', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'member_applications');
  }
  return getLocalData<MemberApplication>('members');
};

export const updateMemberStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
  const local = getLocalData<MemberApplication>('members');
  const index = local.findIndex(m => m.id === id);
  if (index !== -1) {
    local[index].status = status;
    saveLocalData('members', local);
  }
  try {
    await updateDoc(doc(db, 'member_applications', id), { status });
  } catch (e) {
    handleFirestoreError(e, OperationType.UPDATE, `member_applications/${id}`);
  }
};

export const deleteMember = async (id: string): Promise<void> => {
  const local = getLocalData<MemberApplication>('members');
  saveLocalData('members', local.filter(m => m.id !== id));
  try {
    await deleteDoc(doc(db, 'member_applications', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `member_applications/${id}`);
  }
};

// 3. VOLUNTEERS
export const registerVolunteer = async (data: Omit<VolunteerApplication, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  const newApp: VolunteerApplication = {
    ...data,
    id: `volunteer-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    await addDoc(collection(db, 'volunteers'), newApp);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'volunteers');
  }
  const local = getLocalData<VolunteerApplication>('volunteers');
  local.unshift(newApp);
  saveLocalData('volunteers', local);
};

export const getVolunteers = async (): Promise<VolunteerApplication[]> => {
  try {
    const snap = await getDocs(collection(db, 'volunteers'));
    const result: VolunteerApplication[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as VolunteerApplication);
    });
    if (result.length > 0) {
      saveLocalData('volunteers', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'volunteers');
  }
  return getLocalData<VolunteerApplication>('volunteers');
};

export const updateVolunteerStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
  const local = getLocalData<VolunteerApplication>('volunteers');
  const index = local.findIndex(v => v.id === id);
  if (index !== -1) {
    local[index].status = status;
    saveLocalData('volunteers', local);
  }
  try {
    await updateDoc(doc(db, 'volunteers', id), { status });
  } catch (e) {
    handleFirestoreError(e, OperationType.UPDATE, `volunteers/${id}`);
  }
};

export const deleteVolunteer = async (id: string): Promise<void> => {
  const local = getLocalData<VolunteerApplication>('volunteers');
  saveLocalData('volunteers', local.filter(v => v.id !== id));
  try {
    await deleteDoc(doc(db, 'volunteers', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `volunteers/${id}`);
  }
};

// 4. CONTACT MESSAGES
export const sendContactMessage = async (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  const newMsg: ContactMessage = {
    ...data,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'unread'
  };

  try {
    await addDoc(collection(db, 'contact_messages'), newMsg);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'contact_messages');
  }
  const local = getLocalData<ContactMessage>('messages');
  local.unshift(newMsg);
  saveLocalData('messages', local);
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const snap = await getDocs(collection(db, 'contact_messages'));
    const result: ContactMessage[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as ContactMessage);
    });
    if (result.length > 0) {
      saveLocalData('messages', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'contact_messages');
  }
  return getLocalData<ContactMessage>('messages');
};

export const markMessageAsRead = async (id: string): Promise<void> => {
  const local = getLocalData<ContactMessage>('messages');
  const index = local.findIndex(m => m.id === id);
  if (index !== -1) {
    local[index].status = 'read';
    saveLocalData('messages', local);
  }
  try {
    await updateDoc(doc(db, 'contact_messages', id), { status: 'read' });
  } catch (e) {
    handleFirestoreError(e, OperationType.UPDATE, `contact_messages/${id}`);
  }
};

export const deleteMessage = async (id: string): Promise<void> => {
  const local = getLocalData<ContactMessage>('messages');
  saveLocalData('messages', local.filter(m => m.id !== id));
  try {
    await deleteDoc(doc(db, 'contact_messages', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `contact_messages/${id}`);
  }
};

// 5. DONATIONS
export const recordDonation = async (data: Omit<DonationRecord, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  const newDonation: DonationRecord = {
    ...data,
    id: `don-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'completed'
  };

  try {
    await addDoc(collection(db, 'donations'), newDonation);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'donations');
  }
  const local = getLocalData<DonationRecord>('donations');
  local.unshift(newDonation);
  saveLocalData('donations', local);
};

export const getDonations = async (): Promise<DonationRecord[]> => {
  try {
    const snap = await getDocs(collection(db, 'donations'));
    const result: DonationRecord[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as DonationRecord);
    });
    if (result.length > 0) {
      saveLocalData('donations', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'donations');
  }
  return getLocalData<DonationRecord>('donations');
};

// 6. DOCTORS (CMS)
export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    const snap = await getDocs(collection(db, 'doctors'));
    const result: Doctor[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as Doctor);
    });
    if (result.length > 0) {
      saveLocalData('doctors', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'doctors');
  }
  return getLocalData<Doctor>('doctors');
};

export const saveDoctor = async (doctor: Doctor): Promise<void> => {
  const local = getLocalData<Doctor>('doctors');
  const index = local.findIndex(d => d.id === doctor.id);
  if (index !== -1) {
    local[index] = doctor;
  } else {
    local.push(doctor);
  }
  saveLocalData('doctors', local);

  try {
    await addDoc(collection(db, 'doctors'), doctor);
  } catch (e) {
    handleFirestoreError(e, OperationType.CREATE, 'doctors');
  }
};

export const deleteDoctor = async (id: string): Promise<void> => {
  const local = getLocalData<Doctor>('doctors');
  saveLocalData('doctors', local.filter(d => d.id !== id));
  try {
    await deleteDoc(doc(db, 'doctors', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `doctors/${id}`);
  }
};

// 7. EVENTS (CMS)
export const getEvents = async (): Promise<EventItem[]> => {
  try {
    const snap = await getDocs(collection(db, 'events'));
    const result: EventItem[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as EventItem);
    });
    if (result.length > 0) {
      saveLocalData('events', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'events');
  }
  return getLocalData<EventItem>('events');
};

export const saveEvent = async (event: EventItem): Promise<void> => {
  const local = getLocalData<EventItem>('events');
  const index = local.findIndex(e => e.id === event.id);
  if (index !== -1) {
    local[index] = event;
  } else {
    local.push(event);
  }
  saveLocalData('events', local);

  try {
    await addDoc(collection(db, 'events'), event);
  } catch (e) {
    handleFirestoreError(e, OperationType.CREATE, 'events');
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  const local = getLocalData<EventItem>('events');
  saveLocalData('events', local.filter(e => e.id !== id));
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `events/${id}`);
  }
};

// 8. GALLERY (CMS)
export const getGallery = async (): Promise<GalleryItem[]> => {
  try {
    const snap = await getDocs(collection(db, 'gallery_items'));
    const result: GalleryItem[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as GalleryItem);
    });
    if (result.length > 0) {
      saveLocalData('gallery', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'gallery_items');
  }
  return getLocalData<GalleryItem>('gallery');
};

export const saveGalleryItem = async (item: GalleryItem): Promise<void> => {
  const local = getLocalData<GalleryItem>('gallery');
  local.push(item);
  saveLocalData('gallery', local);

  try {
    await addDoc(collection(db, 'gallery_items'), item);
  } catch (e) {
    handleFirestoreError(e, OperationType.CREATE, 'gallery_items');
  }
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  const local = getLocalData<GalleryItem>('gallery');
  saveLocalData('gallery', local.filter(g => g.id !== id));
  try {
    await deleteDoc(doc(db, 'gallery_items', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `gallery_items/${id}`);
  }
};

// 9. TESTIMONIALS (CMS)
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const snap = await getDocs(collection(db, 'testimonials'));
    const result: Testimonial[] = [];
    snap.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id } as Testimonial);
    });
    if (result.length > 0) {
      saveLocalData('testimonials', result);
      return result;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'testimonials');
  }
  return getLocalData<Testimonial>('testimonials');
};

export const saveTestimonial = async (item: Testimonial): Promise<void> => {
  const local = getLocalData<Testimonial>('testimonials');
  local.push(item);
  saveLocalData('testimonials', local);

  try {
    await addDoc(collection(db, 'testimonials'), item);
  } catch (e) {
    handleFirestoreError(e, OperationType.CREATE, 'testimonials');
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const local = getLocalData<Testimonial>('testimonials');
  saveLocalData('testimonials', local.filter(t => t.id !== id));
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `testimonials/${id}`);
  }
};
