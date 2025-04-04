# System Patterns: FSKit

## Architectural Overview

FSKit follows a feature-based organization with clear separation of concerns:

```
src/
├── app/                 # Next.js App Router routes
│   ├── [lang]/          # Root layout with language support
│   ├── api/             # API routes using Hono
├── components/          # Shared UI components
│   ├── Forms/           # Form components with React Hook Form
│   └── Seo/             # SEO optimization components
├── features/            # Feature-based organization
│   ├── auth/            # Authentication feature
│   ├── users/           # User management feature
│   └── ...
├── lib/                 # Shared utilities
│   ├── db/              # Database connection and models
│   ├── i18n/            # Internationalization utilities
│   └── rpc/             # API client
└── dictionaries/        # i18n translation files
```

## Core Patterns

### API Layer

- **Pattern**: Edge API with Hono and TypeScript
- **Decision**: Use Hono for API routes to benefit from its performance and TypeScript support
- **Rationale**: Hono provides excellent TypeScript integration, middleware support, and works well with edge runtimes
- **Implementation**: API routes in `src/app/api/[[...route]]/route.ts` with Hono app and end-to-end type safety

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
- **Implementation**: Auth middleware, login/register forms, and token management

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
