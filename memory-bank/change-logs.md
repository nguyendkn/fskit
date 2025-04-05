# Change Logs: FSKit

## [Unreleased]

### Added

- Role-Based Access Control (RBAC) system with permissions
- Permission-based route protection middleware
- JWT tokens with embedded roles and permissions
- Role and permission entity relationships
- Admin API endpoints with permission checks
- User role management endpoints
- Role and Permission entities with relationships to User
- Database migration system for initial schema and data
- Base data seeding with admin user, roles, and permissions
- TypeORM migration scripts in package.json
- App Router-based internationalization with middleware
- Dictionary-based translation system with four languages
- TypeORM entity configuration with best practices
- SEO component with metadata, Open Graph, and JSON-LD support
- React Hook Form integration with Zod validation

### Changed

- Consolidated middleware files into a single file handling both i18n and authentication
- Updated authentication service to include roles and permissions
- Enhanced JWT token with role and permission information
- Updated database connection method to support migrations
- Updated Husky to v10-compatible format
- Improved error handling in API client
- Enhanced TypeScript typing for API endpoints
- Replaced deprecated i18n configuration with middleware approach

### Fixed

- Combined duplicate middleware files to resolve conflicts
- Updated middleware configuration to use new Next.js format with export const matcher
- Migration TypeScript execution issues with Node.js ESM loader
- Custom tsconfig-node.json file for running migration scripts
- Alternative JS migration runner for environments with TS execution problems
- ESLint errors in language switcher component
- TypeScript type issues in the API client
- Husky Git hooks deprecated format warnings
- Bundle analyzer configuration for TypeScript

## [0.1.0] - 2025-04-04

### Added

- Initial project setup with Next.js 15.2.4
- Feature-based project structure
- Hono integration for API routes
- TypeORM setup for database models
- JWT-based authentication system
- Zustand store for state management
- React Query for data fetching
- ESLint and Prettier configuration
- Husky, lint-staged, and commitlint setup
- Basic User entity model
- Login form with validation

### Changed

- Upgraded to React 19
- Improved TypeScript configuration
- Enhanced module path aliases

### Fixed

- Initial TypeScript type errors
- Module resolution issues

## 2025-07-30

### Added

- Internationalization for four languages (EN, FR, ES, DE)
- TypeORM configuration with User entity
- API client based on native fetch API
- Next.js Route Handlers for all API endpoints
- Higher-order function pattern for protecting API routes

### Changed

- Removed Hono dependency in favor of native Next.js Route Handlers
- Updated authentication flow to use Next.js middleware
- Improved typing for API requests and responses
- Updated Husky hooks to v10 format
- Refactored API client to use namespaced methods
- Enhanced protected route middleware

### Fixed

- ESLint errors in language switcher by replacing `<a>` with `<Link>`
- Type issues in authentication store
- Missing type definitions for API responses
- Inconsistent error handling in API routes

## 2025-06-15

### Added

- Initial project structure using Next.js 13 App Router
- ESLint and Prettier configuration
- Basic authentication with JWT
- User entity and schema
- Husky for Git hooks

### Changed

- Updated Next.js configuration for better type safety
- Enhanced TypeScript configuration with stricter rules

### Fixed

- ESLint configuration issues
- Path alias resolution problems

## 2025-04-05: Database Integration and Auth Service

### Summary

Replaced mock data arrays with actual database operations using TypeORM and PostgreSQL. Created reusable services for authentication and user management.

### Changes

1. Created auth service with functions for login, register, and token verification
2. Created user service with CRUD operations
3. Updated API routes to use the new services
4. Added database connection initialization to all API routes

### Files Modified

- `src/app/api/users/route.ts`
- `src/app/api/auth/[...action]/route.ts`
- `src/app/api/[[...route]]/route.ts`

### Files Created

- `src/features/auth/services/authService.ts`
- `src/features/users/services/userService.ts`

### Technical Details

- Using TypeORM for database operations
- Using PostgreSQL as the database
- Authentication service follows a consistent pattern with success/error response structure
- Database connection is initialized in each API route if not already initialized

## Version History

### v0.1.0 (2025-06-01)

- Initial project setup
- Core dependencies installation
- Basic file structure
