import directoryDataJson from './directoryData.json';

/**
 * Directory data for businesses and places
 */

export interface DirectoryItem {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  image: string;
  rating: number;
  hours: string;
  features?: string[];
  priceRange?: string;
  yearEstablished?: number;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    pinterest?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}

const uniqueCategories = new Set<string>();
directoryDataJson.forEach(item => {
  uniqueCategories.add(item.category);
});

export const categories = ["All", ...Array.from(uniqueCategories)];

export const directoryData: DirectoryItem[] = directoryDataJson as DirectoryItem[];
