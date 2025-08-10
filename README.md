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
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Zustand** for state management
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

## 🧪 Testing

Comprehensive test coverage includes:
- **Unit Tests**: Components, utilities, and business logic
- **Integration Tests**: API services and data flow
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Router Tests**: Navigation and route handling

**Current Status**: 122/122 tests passing ✅

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

**Tech Stack**: React • TypeScript • Vite • SCSS • Zustand • TanStack Query • Vitest  
**Architecture**: Feature-Sliced Design (FSD)  
**API**: The Movie Database (TMDB)