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
npm run dev
```

### Testing
```bash
npm test
```

### Production Build
```bash
npm run build
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
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router 7** with data APIs for SSR-ready navigation
- **Zustand** for client-side state management
- **SCSS** with design tokens
- **Vitest** + React Testing Library

## 🎨 Design System

The project uses a **comprehensive design token system** with:

- **Colors**: Semantic color palette with dark theme
- **Typography**: Consistent font scales and weights  
- **Spacing**: 8px grid system
- **Shadows & Effects**: Layered depth system
- **Motion**: Consistent transitions and animations

**Token Usage**: 100% of defined tokens are actively used (58/58) ✅

## 🚀 Modern Data Loading with React Router 7

This application uses **React Router 7 data APIs** for improved data loading patterns:

### Data Loading Architecture
- **Route Loaders**: All external API data is fetched at the route level
  - `src/app/routes/index.tsx` - Home page movie lists  
  - `src/app/routes/movie.$id.tsx` - Individual movie details
- **Component Props**: Pages and widgets receive data via props, not hooks
- **No Client Fetching**: Zero `useQuery` or `useEffect` for API calls in components

### How Data Flows
1. **Route Loaders** (`loader` functions) fetch data during navigation
2. **Pages** use `useLoaderData()` to access fetched data  
3. **Widgets** receive data as props from pages
4. **Client State** (wishlist) remains in Zustand for interactivity

### Loader Locations
```typescript
// Route loaders handle external API calls
src/app/routes/index.tsx        // Home: popular, top-rated, upcoming movies
src/app/routes/movie.$id.tsx    // Movie details: single movie + category
src/app/routes/wishlist.tsx     // Wishlist: no loader (uses Zustand)

// Router configuration  
src/app/router/router.tsx       // Centralized route + loader mapping
```

### Benefits
- **Better UX**: Data loads during navigation, not after
- **No Loading States**: Content available when route renders
- **Cleaner Architecture**: Centralized data fetching in loaders  
- **Improved Performance**: Parallel data fetching during navigation
- **Future-Proof**: Compatible with SSR if needed later

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

**Tech Stack**: React • TypeScript • Vite • React Router 7 • SCSS • Zustand • Vitest  
**Architecture**: Feature-Sliced Design (FSD) • Modern Data Loading with Route Loaders  
**API**: The Movie Database (TMDB)