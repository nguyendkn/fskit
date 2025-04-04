# Project Brief: FSKit

## Overview

FSKit is a full-stack TypeScript starter kit and development framework built on Next.js 13+ (App Router), with integrated API endpoints using Next.js Route Handlers. It provides a production-ready foundation with modern tooling, type safety, and best practices for rapid application development.

## Core Requirements

1. **Full-Stack TypeScript**: End-to-end type safety from database to UI
2. **Modern React Patterns**: Server and client components, React hooks
3. **API Integration**: Type-safe API with Next.js Route Handlers
4. **Authentication**: Secure JWT implementation with protected routes
5. **Database Access**: TypeORM integration with entity models
6. **Internationalization**: Support for multiple languages
7. **Developer Experience**: ESLint, Prettier, Husky, TypeScript strict mode
8. **Performance**: Server components, Edge runtime where appropriate
9. **SEO-Friendly**: Metadata API, structured data, sitemap.xml
10. **Testing Foundation**: Jest and React Testing Library setup

## Technology Stack

### Frontend

- Next.js 13+ with App Router
- React 18+ with Server Components
- TailwindCSS for styling
- Zustand for state management
- React Query for data fetching
- Zod for schema validation

### Backend

- Next.js API Route Handlers for endpoints
- JWT for authentication
- TypeORM for database access
- PostgreSQL as primary database

### Developer Experience

- TypeScript in strict mode
- ESLint with custom rule set
- Prettier for code formatting
- Husky for Git hooks
- Conventional commits

## Key Feature Requirements

### Authentication System

- User registration and login
- JWT token handling (with refresh tokens)
- Protected routes on frontend and backend
- Role-based authorization

### API Infrastructure

- Type-safe request/response handling
- Standardized error responses
- Validation middleware
- API documentation

### Internationalization

- Multi-language support
- Dictionary-based translations
- Language detection and switching
- RTL support

### Form Handling

- Field validation with Zod
- Form state management
- Error display patterns
- Reusable form components

### SEO Optimization

- Metadata components
- JSON-LD structured data
- Open Graph tags
- Sitemap generation

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API Route Handlers
│   │   ├── auth/           # Authentication endpoints
│   │   ├── users/          # User management endpoints
│   │   └── ...             # Other API domains
│   ├── (routes)/           # Frontend routes (grouped)
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── ...             # Other route groups
│   └── [locale]/           # Internationalized routes
├── components/             # Shared UI components
├── features/               # Feature-based organization
│   ├── auth/               # Authentication feature
│   │   ├── components/     # Feature-specific components
│   │   ├── hooks/          # Feature-specific hooks
│   │   ├── stores/         # State management
│   │   └── schemas/        # Validation schemas
│   └── ...                 # Other features
├── lib/                    # Shared utilities
│   ├── api/                # API client and utilities
│   ├── auth/               # Authentication utilities
│   ├── db/                 # Database utilities
│   └── i18n/               # Internationalization utilities
└── types/                  # Shared TypeScript types
```

## Milestones

1. **Foundation**: Project structure, configuration, tooling
2. **Authentication**: User model, auth flow, protected routes
3. **API Infrastructure**: Route handlers, middleware, error handling
4. **Database Integration**: Entity models, migrations, seeds
5. **Frontend Patterns**: Layouts, components, state management
6. **Form System**: Validation, field components, submission
7. **Internationalization**: Dictionaries, language switching
8. **Testing Setup**: Unit, integration and E2E tests
9. **Documentation**: README, code comments, API docs
10. **Deployment**: CI/CD pipeline, environment config

## Success Criteria

- Complete, working starter kit with all core features
- Comprehensive documentation for usage and extension
- Zero TypeScript errors or lint warnings
- Test coverage for critical paths
- Performance metrics meeting modern standards
- Accessibility compliance
