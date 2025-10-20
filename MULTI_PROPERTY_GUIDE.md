# Guia de Estrutura Multi-Propriedades

## 📋 Visão Geral

O site foi reorganizado para suportar múltiplos lançamentos imobiliários. Agora você pode adicionar facilmente novos empreendimentos mantendo a mesma estrutura e design.

## 🏗️ Estrutura do Projeto

### Rotas Disponíveis

1. **Home Page** - `https://novos.c21alpha.com.br/`
   - Página de seleção com cards para cada propriedade
   - Cards lado a lado (Square Design e Beyond Residence)

2. **Square Design** - `https://novos.c21alpha.com.br/squaredesign`
   - Página principal do empreendimento
   - Subpáginas:
     - `/squaredesign/galeria` - Galeria de fotos
     - `/squaredesign/plantas` - Plantas dos apartamentos
     - `/squaredesign/compre-ganhe` - Campanha promocional

3. **Beyond Residence** - `https://novos.c21alpha.com.br/beyondresidence`
   - Página principal do empreendimento
   - Subpáginas:
     - `/beyondresidence/galeria` - Galeria de fotos
     - `/beyondresidence/plantas` - Plantas dos apartamentos
     - `/beyondresidence/compre-ganhe` - Campanha promocional

## 📁 Estrutura de Arquivos por Propriedade

Cada propriedade possui sua própria estrutura organizada:

```
src/
├── properties/
│   ├── squaredesign/
│   │   ├── config.ts      # Configurações (specs, contato, SEO)
│   │   └── content.ts     # Conteúdo (textos, descrições)
│   └── beyondresidence/
│       ├── config.ts
│       └── content.ts
│
├── pages/
│   ├── index.astro        # Home com seleção de propriedades
│   ├── squaredesign.astro
│   ├── squaredesign/
│   │   ├── galeria.astro
│   │   ├── plantas.astro
│   │   └── compre-ganhe.astro
│   ├── beyondresidence.astro
│   └── beyondresidence/
│       ├── galeria.astro
│       ├── plantas.astro
│       └── compre-ganhe.astro
│
public/
└── images/
    ├── squaredesign/
    │   ├── hero/
    │   ├── galeria/
    │   ├── plantas/
    │   └── compre-ganhe/
    └── beyondresidence/
        ├── hero/          # HeroBack.webp, HomeHighlight.webp
        ├── galeria/       # Fotos do empreendimento
        ├── plantas/       # Plantas dos apartamentos
        └── compre-ganhe/  # Material promocional
```

## 🎨 Como Adicionar Conteúdo ao Beyond Residence

### 1. Adicionar Imagens

As pastas de imagens já foram criadas. Adicione suas imagens nas seguintes pastas:

**Hero (Obrigatório):**
- `public/images/beyondresidence/hero/HeroBack.webp` - Imagem de fundo principal (2340x1560px recomendado)
- `public/images/beyondresidence/hero/HomeHighlight.webp` - Imagem para seção de localização (1200x800px)

**Galeria:**
- Adicione fotos em `public/images/beyondresidence/galeria/`
- Formato: .webp (recomendado para performance)
- Nomes descritivos (ex: `piscina_adulto.webp`, `decorado_living.webp`)

**Plantas:**
- Adicione plantas em `public/images/beyondresidence/plantas/`
- Plantas tipo, decorados, áreas comuns
- Formato: .webp

**Compre e Ganhe (opcional):**
- Banners promocionais em `public/images/beyondresidence/compre-ganhe/`

### 2. Atualizar Textos e Especificações

Edite o arquivo `src/properties/beyondresidence/config.ts`:

```typescript
export const config: PropertyConfig = {
  id: 'beyondresidence',
  name: 'Beyond Residence',
  fullName: 'Beyond Residence Alphaville',
  description: 'Descrição aqui...',
  location: 'Alphaville, Barueri - SP',
  specs: {
    bedrooms: '3 suítes',      // Atualizar
    area: '94 a 121m²',        // Atualizar
    parking: '2 a 3 vagas',    // Atualizar
    units: '120 apartamentos'  // Atualizar
  },
  contact: {
    phone: '+5511999999999',   // Atualizar
    whatsapp: '5511999999999', // Atualizar
    email: 'contato@c21alpha.com.br'
  },
  features: [
    // Liste os diferenciais do empreendimento
    'Raia olímpica de 25m',
    'Coworking completo',
    // ...
  ],
  amenities: [
    // Liste as comodidades
    'Portaria 24h',
    'Salão de festas',
    // ...
  ],
  seo: {
    title: 'Beyond Residence...',        // Atualizar
    description: 'Descrição para SEO...', // Atualizar
    keywords: ['palavras', 'chave']      // Atualizar
  }
};
```

### 3. Atualizar Conteúdo das Páginas

Edite o arquivo `src/properties/beyondresidence/content.ts`:

```typescript
export const content = {
  hero: {
    headline: 'Beyond Residence',           // Título principal
    subheadline: 'Alphaville',             // Subtítulo
    description: 'Descrição do hero...',   // Descrição
    cta: 'Receber Tabela de Preços'       // Botão
  },
  
  location: {
    title: 'Localização Privilegiada',
    proximities: [
      'Iguatemi Alphaville - 5 min',      // Atualizar
      'Centros Empresariais - 3 min',     // Atualizar
      // ...
    ]
  },
  
  // ... outros campos
};
```

## 🚀 Como Adicionar uma Nova Propriedade

Para adicionar uma terceira propriedade (ex: "Premium Tower"):

### 1. Criar Arquivos de Configuração

```bash
mkdir src/properties/premiumtower
```

Criar `src/properties/premiumtower/config.ts` e `content.ts` (copiar de beyondresidence e adaptar)

### 2. Registrar no Sistema

Editar `src/config/properties.ts`:

```typescript
import { config as premiumTowerConfig } from '../properties/premiumtower/config';

export const PROPERTIES: Record<string, PropertyConfig> = {
  squaredesign: squareDesignConfig,
  beyondresidence: beyondResidenceConfig,
  premiumtower: premiumTowerConfig  // Adicionar aqui
};
```

### 3. Criar Páginas

```bash
mkdir src/pages/premiumtower
```

Criar:
- `src/pages/premiumtower.astro`
- `src/pages/premiumtower/galeria.astro`
- `src/pages/premiumtower/plantas.astro`
- `src/pages/premiumtower/compre-ganhe.astro`

(Copiar de beyondresidence e substituir "beyondresidence" por "premiumtower")

### 4. Criar Estrutura de Imagens

```bash
mkdir public/images/premiumtower
mkdir public/images/premiumtower/hero
mkdir public/images/premiumtower/galeria
mkdir public/images/premiumtower/plantas
mkdir public/images/premiumtower/compre-ganhe
```

### 5. Adicionar Card na Home

Editar `src/pages/index.astro` e adicionar um novo card no grid:

```html
<a 
  href="/premiumtower"
  class="group relative bg-obsessed-grey rounded-2xl overflow-hidden..."
>
  <!-- Card content -->
</a>
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## ✅ Checklist para Novo Empreendimento

- [ ] Criar pasta em `src/properties/[nome]/`
- [ ] Criar `config.ts` com todas as especificações
- [ ] Criar `content.ts` com todos os textos
- [ ] Registrar em `src/config/properties.ts`
- [ ] Criar página principal `src/pages/[nome].astro`
- [ ] Criar subpáginas em `src/pages/[nome]/`
- [ ] Criar estrutura de pastas de imagens
- [ ] Adicionar imagens hero obrigatórias
- [ ] Adicionar card na home page
- [ ] Testar todas as rotas
- [ ] Build e deploy

## 📝 Notas Importantes

1. **Componentes Dinâmicos**: Os componentes `HeroSection` e `PropertySpecs` agora recebem `propertyId` como prop e carregam o conteúdo dinamicamente.

2. **Fallback de Imagens**: Se uma imagem não for encontrada, o site usa imagens de placeholder do Unsplash.

3. **SEO**: Cada propriedade tem suas próprias configurações de SEO no arquivo `config.ts`.

4. **GTM**: Todas as propriedades usam o mesmo GTM ID por padrão, mas pode ser customizado por propriedade.

5. **Consistência**: Mantenha a mesma estrutura de pastas e arquivos para facilitar manutenção.

## 🆘 Troubleshooting

**Erro ao fazer build:**
- Verifique se todas as imagens obrigatórias existem
- Confirme que os arquivos `config.ts` e `content.ts` estão corretos
- Execute `npm run build` para ver erros detalhados

**Página em branco:**
- Verifique se o propertyId está correto nos componentes
- Confirme que a propriedade foi registrada em `properties.ts`

**Imagens não aparecem:**
- Verifique o caminho das imagens
- Confirme que as imagens estão em formato .webp
- Use o fallback onerror para debug

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Astro em https://docs.astro.build
