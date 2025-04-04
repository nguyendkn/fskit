# System Patterns: FSKit

## Architectural Overview

FSKit follows a feature-based organization with clear separation of concerns:

```
src/
├── app/                 # Next.js App Router routes
│   ├── [lang]/          # Root layout with language support
│   ├── api/             # API routes using Next.js Route Handlers
├── components/          # Shared UI components
│   ├── Forms/           # Form components with React Hook Form
│   └── Seo/             # SEO optimization components
├── features/            # Feature-based organization
│   ├── auth/            # Authentication feature
│   ├── users/           # User management feature
│   └── ...
├── lib/                 # Shared utilities
│   ├── api/             # API client utilities
│   ├── auth/            # Authentication utilities
│   ├── db/              # Database connection and models
│   ├── i18n/            # Internationalization utilities
│   └── ...
└── dictionaries/        # i18n translation files
```

## Core Patterns

### API Layer

- **Pattern**: Edge API with Next.js Route Handlers and TypeScript
- **Decision**: Use Next.js Route Handlers for API routes to benefit from native Next.js functionality
- **Rationale**: Native Next.js Route Handlers provide excellent performance, built-in types, and simpler integration
- **Implementation**: API routes in dedicated files like `src/app/api/users/route.ts` with end-to-end type safety

### Data Flow

- **Pattern**: Type-safe data flow with Zod validation
- **Decision**: Use Zod schemas for validation with shared types between frontend and backend
- **Rationale**: Ensures consistent validation and type safety throughout the application
- **Implementation**: Schemas in feature folders with shared TypeScript interfaces

### State Management

- **Pattern**: Zustand for global state, React Query for server state
- **Decision**: Combine Zustand and React Query for different state management needs
- **Rationale**: Zustand is lightweight for UI state, React Query optimizes server data fetching
- **Implementation**: Stores in feature folders, React Query hooks for data fetching

### Authentication

- **Pattern**: JWT-based authentication with middleware protection
- **Decision**: Use JWT tokens with secure httpOnly cookies
- **Rationale**: Balances security and simplicity for web applications
- **Implementation**: Auth middleware via HOF pattern, login/register forms, and token management

### Internationalization

- **Pattern**: App Router i18n with middleware redirection
- **Decision**: Use middleware-based i18n with App Router
- **Rationale**: Follows Next.js recommended approach for i18n in App Router
- **Implementation**: Middleware detects language, redirects to language-specific routes, and loads dictionaries

### Database Access

- **Pattern**: TypeORM with entity models
- **Decision**: Use TypeORM for database operations
- **Rationale**: TypeORM provides excellent TypeScript integration and works with various databases
- **Implementation**: Entity models in `src/lib/db/entities` with repository pattern

## Key Technical Decisions

1. **Next.js App Router**: Chosen for modern React patterns and built-in optimizations
2. **TypeScript Throughout**: All code is TypeScript for maximum type safety
3. **Feature-Based Structure**: Organizes code by domain feature rather than technical role
4. **Edge Compatibility**: API designed to work with edge runtimes for optimal performance
5. **Developer Experience Focus**: Tools like ESLint, Prettier, and Husky for code quality
6. **Native Next.js APIs**: Using Next.js Route Handlers instead of third-party frameworks for simplicity and maintainability

## API Pattern

The API follows a standard Next.js Route Handler pattern:

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

// Public GET endpoint
export async function GET() {
  // Implementation...
  return NextResponse.json(data);
}

// Protected DELETE endpoint using the withAuth HOF
export const DELETE = withAuth(async (request, user) => {
  // Implementation with authenticated user data...
  return NextResponse.json(result);
});
```
