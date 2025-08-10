# Film Browser

A modern movie discovery application built with React, TypeScript, and Feature-Sliced Design (FSD) architecture.

## ✨ Features

- **Movie Discovery**: Browse popular, top-rated, and upcoming movies from TMDB
- **Wishlist Management**: Save and manage your favorite movies with persistent storage
- **Responsive Design**: Optimized for all screen sizes with modern UI patterns
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern Architecture**: Built with FSD principles for maintainable, scalable code

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- TMDB API key (optional - falls back to mock data)

### Installation
```bash
npm install
```

### Environment Setup
Create `.env` file (optional):
```bash
VITE_TMDB_KEY=your_tmdb_api_key_here
```

### Development
```bash
# Client-side development
npm run dev

# SSR development
npm run dev:ssr
```

### Testing
```bash
npm test
```

### Production Build
```bash
# Standard SPA build
npm run build

# SSR production build
npm run build:ssr

# Preview SSR production
npm run preview:ssr
```

## 🏗️ Architecture

This project follows **Feature-Sliced Design (FSD)** methodology:

```
src/
├── app/          # App-level configuration (router, providers)
├── pages/        # Route-level pages
├── widgets/      # Complex UI components
├── features/     # Business logic features
├── entities/     # Business entities
└── shared/       # Reusable utilities & components
```

### Key Technologies
- **React 19** with TypeScript
- **Vite** for build tooling with SSR support
- **React Router 7** with data APIs and server-side rendering
- **Zustand** for client-side state management
- **SCSS** with design tokens
- **Vitest** + React Testing Library
- **Express** for SSR server

## 🎨 Design System

The project uses a **comprehensive design token system** with:

- **Colors**: Semantic color palette with dark theme
- **Typography**: Consistent font scales and weights  
- **Spacing**: 8px grid system
- **Shadows & Effects**: Layered depth system
- **Motion**: Consistent transitions and animations

**Token Usage**: 100% of defined tokens are actively used (58/58) ✅

## 🚀 Server-Side Rendering (SSR) with React Router 7

This application implements **full server-side rendering** using React Router 7's static APIs for production-ready SEO and performance.

### SSR Implementation
- **Entry Points**: Separate client and server bundles
  - `src/entry-client.tsx` - Client hydration with `hydrateRoot`
  - `src/entry-server.tsx` - Server rendering with `createStaticRouter`
- **Universal Routing**: Shared route configuration between client and server
- **Data Loading**: All loaders run server-side for initial page load
- **Progressive Enhancement**: Works without JavaScript, enhanced with JS

### Data Loading Architecture
- **Route Loaders**: All external API data is fetched at the route level
  - `src/app/routes/index.tsx` - Home page movie lists  
  - `src/app/routes/movie.$id.tsx` - Individual movie details
- **SSR-Safe Components**: Browser APIs guarded for server compatibility
- **State Hydration**: Zustand wishlist rehydrates from localStorage on client

### SSR Features
- **Full HTML Content**: Complete movie data rendered server-side
- **SEO Optimized**: Search engines see full content on initial load
- **Fast Initial Paint**: No loading spinners or skeleton states
- **Smooth Hydration**: React Router handles client-side takeover seamlessly
- **Browser API Guards**: Carousel and resize hooks work safely in SSR

### How Data Flows
1. **Server**: Route loaders fetch data during SSR
2. **HTML**: Complete page rendered with all content
3. **Client**: JavaScript hydrates existing markup
4. **Navigation**: Subsequent routes use client-side routing
5. **Wishlist**: Client state restored from localStorage after hydration

### Production SSR
```bash
# Build for SSR
npm run build:ssr

# Run production SSR server
npm run preview:ssr

# Development SSR server
npm run dev:ssr
```

### Benefits
- **SEO Ready**: Full content visible to search engines
- **Performance**: Faster Time to First Contentful Paint
- **Accessibility**: Content available before JavaScript loads
- **Resilience**: Site works with JavaScript disabled
- **Modern Stack**: Leverages React Router 7's built-in SSR capabilities

## 🧪 Testing

Comprehensive test coverage includes:
- **Unit Tests**: Components, utilities, and business logic
- **Integration Tests**: API services and data flow
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Router Tests**: Navigation and route handling

**Current Status**: 199/199 tests passing ✅

## 📁 Project Structure

### Core Features
- **Movie Discovery** (`features/movies-carousel/`)
- **Wishlist Management** (`features/wishlist/`)
- **Movie Entities** (`entities/movie/`)
- **Navigation Components** (`widgets/carousel/`)

### Shared Resources
- **API Layer** (`shared/api/tmdb/`)
- **Design System** (`shared/styles/`)
- **Utilities** (`shared/lib/`)

## 🔧 Development Guidelines

### Code Style
- ESLint + Prettier for consistent formatting
- TypeScript strict mode enabled
- Conventional commit messages

### Architecture Principles
- **Feature-Sliced Design**: Clear layer separation
- **Design Tokens**: No hardcoded values
- **Accessibility First**: WCAG compliant components
- **Test-Driven**: High coverage with meaningful tests

## 📊 Performance

- **Vite**: Fast HMR and optimized builds
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP support with fallbacks
- **Caching**: Optimized API request caching

## 🤝 Contributing

1. Follow FSD architecture principles
2. Use design tokens for all styling
3. Write tests for new features
4. Ensure accessibility compliance
5. Update documentation as needed

---

**Tech Stack**: React 19 • TypeScript • Vite • React Router 7 • SCSS • Zustand • Vitest • Express SSR  
**Architecture**: Feature-Sliced Design (FSD) • Server-Side Rendering • Route-Based Data Loading  
**API**: The Movie Database (TMDB)