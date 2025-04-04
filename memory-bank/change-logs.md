# Change Logs: FSKit

## [Unreleased]

### Added

- App Router-based internationalization with middleware
- Dictionary-based translation system with four languages
- TypeORM entity configuration with best practices
- SEO component with metadata, Open Graph, and JSON-LD support
- React Hook Form integration with Zod validation

### Changed

- Updated Husky to v10-compatible format
- Improved error handling in API client
- Enhanced TypeScript typing for API endpoints
- Replaced deprecated i18n configuration with middleware approach

### Fixed

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

## 2023-07-30

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

## 2023-06-15

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

## Version History

### v0.1.0 (2023-06-01)

- Initial project setup
- Core dependencies installation
- Basic file structure
