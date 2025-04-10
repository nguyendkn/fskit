# Active Context: FSKit

## Current Focus

The current development focus is on implementing and stabilizing the core infrastructure with the following priorities:

1.  **Authentication Logic**: Implementing missing authentication logic (TASK-010).
2.  **Type-Safe API Integration**: Implementing Next.js Route Handlers with proper TypeScript types (replaced Hono)
3.  **Internationalization (i18n)**: Setting up App Router-based i18n with middleware for language detection
4.  **Developer Tooling**: Configuring ESLint, Prettier, and Husky for code quality and Git workflows

## Recent Changes

- **Added TASK-010**: Process missing auth logic.
- Created login API endpoint (`src/app/api/auth/login/route.ts`).
- Created register API endpoint (`src/app/api/auth/register/route.ts`).
- Updated `authStore` to manage authentication state and token storage.
- Updated `LoginForm.tsx` to connect to the login API.
- Created `SignUpForm.tsx`.
- Updated `src/app/(routes)/(unprotected)/auth/sign-up/page.tsx` to use `SignUpForm`.
- Updated `middleware.ts` to verify JWT tokens and protect routes.
- **Removed Hono dependency and implemented Next.js Route Handlers** for all API endpoints
- Created a new API client utility using native fetch API to replace Hono client
- Enhanced authentication middleware to work with Next.js Request/Response patterns
- Updated all API consumers to use the new API client
- Implemented App Router internationalization with middleware for language detection and dictionary loading
- Fixed ESLint errors in language switcher by replacing `<a>` tags with Next.js `<Link>` components
- Updated the Husky hooks to comply with v9/v10 format (removed deprecated shell script headers)
- Set up type-safe API client with proper error handling
- Configured TypeORM entities with best practices for database models

## Development Status

- **Testing**: TASK-010 (Auth Logic).
- **In Progress**: TASK-001 (Dependabot), TASK-002 (i18n), API route restructuring, TypeORM integration, SEO components
- **Completed**: Project structure, ESLint/Prettier setup, basic authentication models, Next.js Route Handlers
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
- What approach should we take for API documentation now that we're using Next.js Route Handlers?
