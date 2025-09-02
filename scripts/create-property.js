#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createProperty(propertyId, propertyData) {
  const srcDir = path.join(__dirname, '../src');
  const propertyDir = path.join(srcDir, 'properties', propertyId);
  const templateDir = path.join(srcDir, 'templates/new-property');
  
  // Create property directory
  if (!fs.existsSync(propertyDir)) {
    fs.mkdirSync(propertyDir, { recursive: true });
  }
  
  // Read templates
  const configTemplate = fs.readFileSync(path.join(templateDir, 'config.ts.template'), 'utf8');
  const contentTemplate = fs.readFileSync(path.join(templateDir, 'content.ts.template'), 'utf8');
  const pageTemplate = fs.readFileSync(path.join(templateDir, 'page.astro.template'), 'utf8');
  
  // Replace placeholders
  const replacePlaceholders = (template, data) => {
    let result = template;
    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), data[key]);
    });
    return result;
  };
  
  // Generate files
  const configContent = replacePlaceholders(configTemplate, propertyData);
  const contentContent = replacePlaceholders(contentTemplate, propertyData);
  const pageContent = replacePlaceholders(pageTemplate, { PROPERTY_ID: propertyId });
  
  // Write files
  fs.writeFileSync(path.join(propertyDir, 'config.ts'), configContent);
  fs.writeFileSync(path.join(propertyDir, 'content.ts'), contentContent);
  fs.writeFileSync(path.join(srcDir, 'pages', `${propertyId}.astro`), pageContent);
  
  console.log(`✅ Property "${propertyId}" created successfully!`);
  console.log(`📁 Files created:`);
  console.log(`   - src/properties/${propertyId}/config.ts`);
  console.log(`   - src/properties/${propertyId}/content.ts`);
  console.log(`   - src/pages/${propertyId}.astro`);
  console.log(`🌐 URL: novos.c21alpha.com.br/${propertyId}`);
}

// Example usage
if (process.argv.length > 2) {
  const propertyId = process.argv[2];
  
  // Example property data - customize as needed
  const exampleData = {
    PROPERTY_ID: propertyId,
    PROPERTY_NAME: 'Novo Empreendimento',
    PROPERTY_FULL_NAME: 'Novo Empreendimento Alphaville',
    PROPERTY_DESCRIPTION: 'Apartamentos de alto padrão em localização privilegiada',
    PROPERTY_LOCATION: 'Alphaville, Barueri - SP',
    PROPERTY_LOCATION_SHORT: 'Alphaville',
    BEDROOMS: '3 suítes',
    AREA: '90 a 120m²',
    PARKING: '2 vagas',
    UNITS: '100 apartamentos',
    HERO_IMAGE: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    GALLERY_IMAGE_1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    GALLERY_IMAGE_2: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    LOCATION_IMAGE: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    FEATURE_1: 'Piscina',
    FEATURE_2: 'Academia',
    FEATURE_3: 'Salão de festas',
    FEATURE_4: 'Playground',
    FEATURE_5: 'Coworking',
    FEATURE_6: 'Pet place',
    AMENITY_1: 'Portaria 24h',
    AMENITY_2: 'Elevadores',
    AMENITY_3: 'Garagem',
    AMENITY_4: 'Interfone',
    AMENITY_5: 'CFTV',
    AMENITY_6: 'Jardim',
    GTM_ID: 'GTM-NKZQXB9J',
    SEO_TITLE: `Novo Empreendimento Alphaville | Century 21 Alpha`,
    SEO_DESCRIPTION: 'Apartamentos de alto padrão em Alphaville. Condições especiais de pré-lançamento.',
    SEO_KEYWORDS: `'apartamento alphaville', 'novo empreendimento', 'century 21 alpha'`,
    HERO_DESCRIPTION: 'Apartamentos de alto padrão em localização privilegiada',
    BEDROOMS_DESCRIPTION: 'Apartamentos espaçosos com suítes completas',
    AREA_DESCRIPTION: 'Área privativa generosa para toda família',
    PARKING_DESCRIPTION: 'Garagem coberta com segurança 24h',
    UNITS_DESCRIPTION: 'Empreendimento exclusivo e reservado',
    LOCATION_DESCRIPTION: 'Em localização privilegiada próximo aos principais centros',
    PROXIMITY_1: 'Shopping - 5 min',
    PROXIMITY_2: 'Centros Empresariais - 3 min',
    PROXIMITY_3: 'Rodovia - 2 min',
    PROXIMITY_4: 'Escolas - 10 min',
    PROXIMITY_5: 'Hospitais - 15 min'
  };
  
  createProperty(propertyId, exampleData);
} else {
  console.log('Usage: node scripts/create-property.js <property-id>');
  console.log('Example: node scripts/create-property.js residencial-premium');
}

export { createProperty };
