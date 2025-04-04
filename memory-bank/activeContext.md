# Active Context: FSKit

## Current Focus

The current development focus is on implementing and stabilizing the core infrastructure with the following priorities:

1. **Type-Safe API Integration**: Implementing Hono for edge API routes with proper TypeScript types
2. **Internationalization (i18n)**: Setting up App Router-based i18n with middleware for language detection
3. **Authentication Framework**: Implementing JWT-based authentication with secure token handling
4. **Developer Tooling**: Configuring ESLint, Prettier, and Husky for code quality and Git workflows

## Recent Changes

- Implemented App Router internationalization with middleware for language detection and dictionary loading
- Fixed ESLint errors in language switcher by replacing `<a>` tags with Next.js `<Link>` components
- Updated the Husky hooks to comply with v9/v10 format (removed deprecated shell script headers)
- Set up type-safe API client with proper error handling
- Configured TypeORM entities with best practices for database models

## Development Status

- **In Progress**: Internationalization, TypeORM integration, SEO components
- **Completed**: Project structure, ESLint/Prettier setup, basic authentication models
- **Blocked**: None currently
- **Next Up**: Form validation with Zod, API error handling enhancements

## Environment Setup

- Next.js 15.2.4 with App Router
- TypeScript 5
- Node.js LTS
- VS Code with ESLint/Prettier extensions recommended

## Open Questions

- Should we include a UI component library or stick with minimal primitives?
- How detailed should the TypeORM integration be for the starter kit?
- What additional language dictionaries should be included beyond EN, FR, ES, DE?
