// Property configuration system
export interface PropertyConfig {
  id: string;
  name: string;
  fullName: string;
  description: string;
  location: string;
  developer?: string;
  specs: {
    bedrooms: string;
    area: string;
    parking: string;
    units?: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email?: string;
  };
  images: {
    hero: string;
    gallery: string[];
    location?: string;
  };
  features: string[];
  amenities: string[];
  propertySpecs?: {
    apartment: {
      typologies: string;
      bedrooms: string;
      parking: string;
      balcony?: string;
      floors?: string;
    };
    building: {
      address: string;
      neighborhood: string;
      city: string;
      leisureItems: string;
      nearbySchools?: string;
    };
    leisure: Array<{
      title: string;
      subtitle: string;
      icon: string;
    }>;
    highlights: Array<{
      title: string;
      subtitle: string;
    }>;
  };
  gtmId?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Import property configs
import { config as squareDesignConfig } from '../properties/squaredesign/config';
import { config as beyondResidenceConfig } from '../properties/beyondresidence/config';

// Property registry - add new properties here
export const PROPERTIES: Record<string, PropertyConfig> = {
  squaredesign: squareDesignConfig,
  beyondresidence: beyondResidenceConfig
};

// Helper function to get property config
export function getPropertyConfig(propertyId: string): PropertyConfig | null {
  return PROPERTIES[propertyId] || null;
}
