# Tasks: FSKit

## Active Tasks

- [ ] **TASK-010**: Process missing auth logic

  - Priority: HIGH
  - Status: TESTING
  - Description: Implement the missing authentication logic, including handling JWT tokens, protecting routes, and managing user sessions.
  - Acceptance Criteria:
    - Secure relevant API endpoints.
    - Implement sign-in, sign-up, and sign-out functionality.
    - Handle JWT token generation, storage, and validation.
    - Implement route protection for authenticated users.
    - Update UI components related to authentication (login form, user status).
  - Notes: This involves frontend and backend changes. Need to review existing auth code (`src/lib/auth.ts`, `src/features/auth/*`, `middleware.ts`).
  - Plan:
    1. Analyze Existing Auth Code
    2. Identify Missing Logic
    3. Backend Implementation (API Routes: sign-in, sign-up, sign-out, protected routes)
    4. Middleware Enhancement (`middleware.ts`)
    5. Frontend Implementation (Components: LoginForm, SignUpForm; State: authStore; Token Storage; Protected Routes; UI Updates)
    6. Testing
    7. Linting
    8. Documentation (Memory Bank & Commit)
  - Implementation Progress:
    - Created login API endpoint (`src/app/api/auth/login/route.ts`).
    - Created register API endpoint (`src/app/api/auth/register/route.ts`).
    - Updated `authStore` to manage authentication state and token storage.
    - Updated `LoginForm.tsx` to connect to the login API.
    - Created `SignUpForm.tsx`.
    - Updated `src/app/(routes)/(unprotected)/auth/sign-up/page.tsx` to use `SignUpForm`.
    - Updated `middleware.ts` to verify JWT tokens and protect routes.
  - Remaining:
    - Thorough testing of sign-in, sign-up, and route protection.
    - Linting.
    - Implement sign-out functionality.
    - Integrate RBAC checks into the middleware.
    - Improve error handling.

- [ ] **TASK-001**: Fix Dependabot issues with dependency conflicts

  - Priority: HIGH
  - Status: IN_PROGRESS
  - Description: Resolve Dependabot error performing updates by checking dependency conflicts
  - Acceptance Criteria:
    - Identify specific dependency issues
    - Update package.json with compatible versions
    - Configure Dependabot to ignore problematic packages if necessary
  - Notes: Error reported in GitHub repository

- [ ] **TASK-002**: Complete internationalization implementation

  - Priority: HIGH
  - Status: IN_PROGRESS
  - Description: Finalize the middleware-based i18n implementation
  - Acceptance Criteria:
    - Fix any remaining TypeScript errors
    - Ensure language detection works correctly
    - Complete dictionary loading for all supported languages
    - Document i18n implementation for users
  - Notes: Basic implementation complete, needs optimization

- [ ] **TASK-003**: Enhance authentication with refresh tokens
  - Priority: MEDIUM
  - Status: PLANNED
  - Description: Add refresh token mechanism to JWT authentication
  - Acceptance Criteria:
    - Implement refresh token generation and validation
    - Add token rotation for security
    - Create client-side logic to handle token refresh
    - Document the authentication flow
  - Notes: Current implementation uses only access tokens

## Completed Tasks

- [x] **TASK-009**: Replace Hono with Next.js Route Handlers

  - Priority: HIGH
  - Status: COMPLETED
  - Description: Remove Hono dependency and replace with native Next.js Route Handlers
  - Acceptance Criteria:
    - Create dedicated API route files for all endpoints
    - Create custom API client based on fetch API
    - Update auth middleware for Next.js compatibility
    - Remove Hono dependencies from package.json
    - Update all code that uses Hono client
  - Notes: Completed to simplify stack and improve maintainability

- [x] **TASK-004**: Update Husky to v10 format

  - Priority: HIGH
  - Status: COMPLETED
  - Description: Fix deprecated Husky format warnings
  - Acceptance Criteria:
    - Remove deprecated shell script headers
    - Update to v10-compatible format
    - Ensure git hooks continue to work
  - Notes: Completed on April 4, 2023

- [x] **TASK-005**: Implement basic TypeORM entity models
  - Priority: HIGH
  - Status: COMPLETED
  - Description: Create TypeORM entity models for core data structures
  - Acceptance Criteria:
    - User entity with proper columns
    - TypeScript decorators for ORM
    - Basic validation and relationships
  - Notes: User entity implemented with additional timestamp fields

## Backlog

- [ ] **TASK-006**: Add Jest testing framework

  - Priority: MEDIUM
  - Status: BACKLOG
  - Description: Set up Jest for unit testing
  - Acceptance Criteria:
    - Configure Jest with TypeScript
    - Create example tests
    - Add test scripts to package.json
    - Set up coverage reporting
  - Notes: Consider React Testing Library integration

- [ ] **TASK-007**: Create GitHub Actions workflow

  - Priority: LOW
  - Status: BACKLOG
  - Description: Set up CI/CD with GitHub Actions
  - Acceptance Criteria:
    - Lint and test on PR
    - Build verification
    - Deployment pipeline
    - Status badges in README
  - Notes: Start with basic workflow and expand

- [ ] **TASK-008**: Add documentation for key features
  - Priority: MEDIUM
  - Status: BACKLOG
  - Description: Create comprehensive documentation for FSKit
  - Acceptance Criteria:
    - User guide for getting started
    - API documentation
    - Feature-specific guides
    - Common patterns and examples
  - Notes: Consider using Storybook for component documentation
