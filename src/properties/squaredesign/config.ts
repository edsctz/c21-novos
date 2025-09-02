import type { PropertyConfig } from '../../config/properties';

export const config: PropertyConfig = {
  id: 'squaredesign',
  name: 'Square Design Residence',
  fullName: 'Square Design Residence Alphaville',
  description: 'Apartamentos de 3 suítes de 94 a 121m² no coração de Alphaville. Lazer completo com raia olímpica de 25m, coworking e varanda gourmet.',
  location: 'Alphaville, Barueri - SP',
  developer: 'Century 21 Alpha',
  specs: {
    bedrooms: '3 suítes',
    area: '94 a 121m²',
    parking: '2 a 3 vagas',
    units: '120 apartamentos'
  },
  contact: {
    phone: '+5511999999999',
    whatsapp: '5511999999999',
    email: 'contato@c21alpha.com.br'
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  features: [
    'Raia olímpica de 25m',
    'Coworking completo',
    'Varanda gourmet',
    'Fitness center',
    'Playground',
    'Pet place'
  ],
  amenities: [
    'Portaria 24h',
    'Salão de festas',
    'Churrasqueira',
    'Bicicletário',
    'Lavanderia',
    'Depósito'
  ],
  gtmId: 'GTM-NKZQXB9J',
  seo: {
    title: 'Square Design Residence Alphaville - 3 suítes | Century 21 Alpha',
    description: 'Apartamentos de 3 suítes de 94 a 121m² no coração de Alphaville. Lazer completo com raia olímpica de 25m, coworking e varanda gourmet. 2 a 3 vagas de garagem.',
    keywords: ['apartamento alphaville', '3 suites alphaville', 'square design', 'century 21 alpha', 'barueri']
  }
};
