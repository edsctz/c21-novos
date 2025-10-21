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
  propertySpecs: {
    apartment: {
      typologies: '94m² a 121m²',
      bedrooms: '3 suítes',
      parking: '2 a 3 por apartamento',
      balcony: 'Gourmet',
      floors: '45 andares - 6 por Andar'
    },
    building: {
      address: 'Av. Verteville 300',
      neighborhood: '18 do Forte',
      city: 'Barueri/SP',
      leisureItems: 'Mais de 15+',
      nearbySchools: 'Escola Internacional, Unip/Objetivo'
    },
    leisure: [
      {
        title: 'Piscina',
        subtitle: 'Adulto e Infantil',
        icon: 'M2 16v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2H2zm1.5-9c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5S5.8 8.5 5 8.5 3.5 7.8 3.5 7zM5 12c.8 0 1.5-.7 1.5-1.5S5.8 9 5 9s-1.5.7-1.5 1.5S4.2 12 5 12z'
      },
      {
        title: 'Coworking',
        subtitle: 'Espaço moderno',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
      },
      {
        title: 'Salão de Festas',
        subtitle: 'Para eventos',
        icon: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z'
      },
      {
        title: 'Fitness',
        subtitle: 'Academia',
        icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z'
      },
      {
        title: 'Playground',
        subtitle: 'Para crianças',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      },
      {
        title: 'Delivery Point',
        subtitle: '24h',
        icon: 'M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V9H6.5v6H8v-2.5h1.5v2.5H11V9H9.5v1.5zm5-1.5H10v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z'
      },
      {
        title: 'Quadra Poliesportiva',
        subtitle: 'Esportes',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z'
      },
      {
        title: 'Beach Tennis',
        subtitle: 'Esportes',
        icon: 'M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z'
      }
    ],
    highlights: [
      {
        title: '24h',
        subtitle: 'Portaria'
      },
      {
        title: 'Comodidade',
        subtitle: 'Bicicletário'
      },
      {
        title: 'Car',
        subtitle: 'Wash'
      },
      {
        title: 'Mini',
        subtitle: 'Market'
      }
    ]
  },
  gtmId: 'GTM-NKZQXB9J',
  seo: {
    title: 'Square Design Residence Alphaville - 3 suítes | Century 21 Alpha',
    description: 'Apartamentos de 3 suítes de 94 a 121m² no coração de Alphaville. Lazer completo com raia olímpica de 25m, coworking e varanda gourmet. 2 a 3 vagas de garagem.',
    keywords: ['apartamento alphaville', '3 suites alphaville', 'square design', 'century 21 alpha', 'barueri']
  }
};
