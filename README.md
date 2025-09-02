# Century 21 Alpha - Multi-Property Hot Sites

Sistema de hot sites para múltiplos empreendimentos imobiliários da Century 21 Alpha.

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas
```
src/
├── config/
│   └── properties.ts          # Configurações globais e tipos
├── properties/
│   └── squaredesign/          # Primeira propriedade
│       ├── config.ts          # Configuração específica
│       └── content.ts         # Conteúdo específico
├── components/
│   ├── PropertyPage.astro     # Template principal
│   └── property/              # Componentes específicos
├── templates/
│   └── new-property/          # Templates para novas propriedades
├── pages/
│   └── squaredesign.astro     # Página da propriedade
└── scripts/
    └── create-property.js     # Script para criar novas propriedades
```

## 🚀 URLs de Acesso

- **Atual**: `novos.c21alpha.com.br/squaredesign`
- **Futuras**: `novos.c21alpha.com.br/{property-id}`

## 📋 Como Criar uma Nova Propriedade

### Método 1: Script Automatizado
```bash
node scripts/create-property.js nome-da-propriedade
```

### Método 2: Manual
1. Copie a pasta `src/properties/squaredesign/` para `src/properties/nova-propriedade/`
2. Edite `config.ts` e `content.ts` com os dados da nova propriedade
3. Crie `src/pages/nova-propriedade.astro` importando a nova configuração

## 🎯 Configuração de Propriedade

Cada propriedade possui:

### config.ts
- Dados básicos (nome, localização, especificações)
- Informações de contato
- URLs de imagens
- Features e amenidades
- GTM ID específico
- Configurações de SEO

### content.ts
- Textos do hero
- Descrições das seções
- Proximidades da localização
- CTAs personalizados

## 🔧 Personalização

### Imagens
- Use URLs do Unsplash para imagens de alta qualidade
- Mantenha proporções consistentes
- Otimize para carregamento rápido

### SEO
- Cada propriedade tem meta tags específicas
- Schema markup para imóveis
- URLs amigáveis

### GTM
- Implementação global no Layout
- ID específico por propriedade
- Tracking de conversões

## 📱 Recursos

- ✅ Design responsivo
- ✅ Formulários de lead
- ✅ WhatsApp integration
- ✅ GTM tracking
- ✅ SEO otimizado
- ✅ Performance otimizada

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📊 Tracking e Analytics

- Google Tag Manager implementado globalmente
- Tracking de formulários
- Eventos de conversão
- UTM parameters capturados

## 🎨 Branding

- Cores oficiais Century 21
- Tipografia consistente
- Elementos visuais padronizados
- Identidade visual profissional
