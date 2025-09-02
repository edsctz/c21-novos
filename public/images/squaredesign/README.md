# Square Design Residence - Image Organization

This directory contains all images for the Square Design Residence property pages.

## Directory Structure

```
public/images/squaredesign/
├── hero/           # Hero section images for main page
├── galeria/        # Photo gallery images
├── plantas/        # Floor plan images
├── compre-ganhe/   # Special offer page images
└── README.md       # This file
```

## Image Naming Conventions

### Hero Images (`hero/`)
- `hero-main.jpg` - Main hero image for the property
- `hero-exterior-1.jpg`, `hero-exterior-2.jpg` - Building exterior shots
- `hero-location.jpg` - Aerial or location view

### Gallery Images (`galeria/`)
- `living-01.jpg`, `living-02.jpg` - Living room photos
- `suite-master-01.jpg`, `suite-master-02.jpg` - Master bedroom photos
- `cozinha-01.jpg`, `cozinha-02.jpg` - Kitchen photos
- `area-lazer-01.jpg`, `area-lazer-02.jpg` - Leisure area photos
- `piscina-01.jpg`, `piscina-02.jpg` - Pool area photos
- `fitness-01.jpg`, `fitness-02.jpg` - Fitness center photos
- `coworking-01.jpg`, `coworking-02.jpg` - Coworking space photos
- `fachada-01.jpg`, `fachada-02.jpg` - Building facade photos
- `entrada-01.jpg`, `entrada-02.jpg` - Entrance/lobby photos
- `localizacao-01.jpg`, `localizacao-02.jpg` - Location/neighborhood photos

### Floor Plans (`plantas/`)
- `planta-tipo-1-94m2.jpg` - Type 1 floor plan (94m²)
- `planta-tipo-2-108m2.jpg` - Type 2 floor plan (108m²)
- `planta-tipo-3-121m2.jpg` - Type 3 floor plan (121m²)
- `planta-cobertura-150m2.jpg` - Penthouse floor plan (150m²)
- `planta-terreo.jpg` - Ground floor plan
- `planta-area-lazer.jpg` - Leisure area plan
- `planta-coworking.jpg` - Coworking space plan
- `planta-fitness.jpg` - Fitness center plan
- `planta-subsolo.jpg` - Basement/garage plan

### Special Offer Images (`compre-ganhe/`)
- `oferta-banner.jpg` - Main promotional banner
- `beneficios-01.jpg`, `beneficios-02.jpg` - Benefits illustration images

## Image Specifications

### Recommended Sizes
- **Hero images**: 1920x1080px (16:9 ratio)
- **Gallery images**: 1200x800px (3:2 ratio)
- **Floor plans**: 1200x900px (4:3 ratio)
- **Promotional images**: 1200x600px (2:1 ratio)

### Format Guidelines
- Use **JPEG** for photographs
- Use **PNG** for floor plans with text/diagrams
- Optimize images for web (aim for <200KB per image)
- Use progressive JPEG encoding for better loading

## Usage in Code

Images should be referenced using relative paths from the public directory:

```astro
<!-- Example usage in Astro components -->
<img 
  src="/images/squaredesign/galeria/living-01.jpg"
  alt="Living integrado com varanda gourmet - Square Design Residence"
  class="w-full h-64 object-cover"
  loading="lazy"
/>
```

## Alt Text Guidelines

Always include descriptive alt text for accessibility:
- Describe what's shown in the image
- Include the property name when relevant
- Be specific about room types and features
- Example: "Suíte master com closet - Square Design Residence"
