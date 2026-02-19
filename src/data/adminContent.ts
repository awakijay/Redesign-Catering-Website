export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  isNew: boolean;
}

export interface AdminGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface SiteAnnouncement {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  priority: 'normal' | 'high';
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface ChatMessage {
  id: string;
  userEmail: string;
  userName: string;
  sender: 'admin' | 'user';
  message: string;
  createdAt: string;
}

export const defaultProducts: AdminProduct[] = [
  {
    id: 'p-1',
    name: 'Jollof Rice Party Tray',
    description: 'Signature smoky jollof rice with grilled chicken and plantain.',
    category: 'Nigerian Cuisine',
    price: '₦18,000',
    image:
      'https://images.unsplash.com/photo-1664993101841-036f189719b6?auto=format&fit=crop&w=1200&q=80',
    isNew: true,
  },
  {
    id: 'p-2',
    name: 'Executive Seafood Pasta',
    description: 'Creamy seafood pasta built for premium corporate events.',
    category: 'Intercontinental',
    price: '₦24,000',
    image:
      'https://images.unsplash.com/photo-1710830669480-104620081f6a?auto=format&fit=crop&w=1200&q=80',
    isNew: false,
  },
  {
    id: 'p-3',
    name: 'Suya Live Grill Station',
    description: 'Interactive suya station served fresh during events.',
    category: 'African Delicacies',
    price: '₦15,500',
    image:
      'https://images.unsplash.com/photo-1612505098650-5884f32e7f41?auto=format&fit=crop&w=1200&q=80',
    isNew: true,
  },
];

export const defaultGalleryImages: AdminGalleryImage[] = [
  {
    id: 'g-1',
    src: 'https://images.unsplash.com/photo-1769638913840-2ca96d90e8a9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Corporate buffet service setup',
    category: 'Events',
  },
  {
    id: 'g-2',
    src: 'https://images.unsplash.com/photo-1702827482556-481adcd68f3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Colorful African cuisine spread',
    category: 'Cuisine',
  },
  {
    id: 'g-3',
    src: 'https://images.unsplash.com/photo-1767021922347-8a44324060c0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Offshore crew dining hall',
    category: 'Offshore',
  },
];

export const defaultAnnouncements: SiteAnnouncement[] = [
  {
    id: 'a-1',
    title: 'New Ramadan Family Combo',
    content: 'A curated iftar set menu is now available for home and community events.',
    publishedAt: new Date().toISOString(),
    priority: 'high',
  },
  {
    id: 'a-2',
    title: 'Now Serving Port Harcourt',
    content: 'We expanded our logistics and event operations to Port Harcourt and nearby areas.',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    priority: 'normal',
  },
];

export const readLocalStorageArray = <T>(key: string, fallback: T[]): T[] => {
  const savedValue = localStorage.getItem(key);
  if (!savedValue) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(savedValue);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
};
