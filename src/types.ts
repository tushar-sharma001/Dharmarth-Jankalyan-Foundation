export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export interface Doctor {
  id: string;
  nameEn: string;
  nameHi: string;
  specialtyEn: string;
  specialtyHi: string;
  availabilityEn: string;
  availabilityHi: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: string;
  imageUrl: string;
}

export interface EventItem {
  id: string;
  titleEn: string;
  titleHi: string;
  date: string;
  descriptionEn: string;
  descriptionHi: string;
  status: 'upcoming' | 'completed';
}

export interface TrusteeApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  occupation: string;
  address: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MemberApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  monthlyCommitment: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VolunteerApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills: string;
  address: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  phone: string;
  email: string;
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  status: 'completed' | 'pending';
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameHi: string;
  roleEn: string;
  roleHi: string;
  quoteEn: string;
  quoteHi: string;
  rating: number;
  image?: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  icon: string;
}
