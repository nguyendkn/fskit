# Tech Context: FSKit

## Core Technologies

### Frontend

- **Next.js**: v15.2.4 with App Router
- **React**: v19.0.0
- **TypeScript**: v5+
- **TailwindCSS**: v4 for styling
- **React Hook Form**: Form handling with validation
- **Zustand**: Lightweight state management
- **TanStack React Query**: Data fetching and caching

### Backend

- **Next.js API Routes**: Edge runtime
- **Hono**: Edge-compatible API framework
- **TypeORM**: Database ORM
- **Zod**: Schema validation
- **JWT**: Authentication tokens

### Developer Experience

- **ESLint**: Code linting with custom rules
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Run linters on staged files
- **commitlint**: Lint commit messages
- **TypeScript**: Static type checking

### Testing & Quality

- **Jest**: Unit testing
- **Playwright**: E2E testing
- **next-bundle-analyzer**: Bundle size analysis

### Deployment & Infrastructure

- **Vercel**: Preferred deployment platform
- **Docker**: Containerization option
- **GitHub Actions**: CI/CD workflows

## Development Environment

### Prerequisites

- Node.js LTS (v20+)
- npm, yarn, or pnpm
- Git
- VS Code (recommended)

### VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Environment Variables

```
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/fskit
JWT_SECRET=your_jwt_secret_here
SITE_URL=http://localhost:3000
```

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/fskit.git

# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment Options

### Vercel

Recommended deployment platform with optimal Next.js support

### Docker

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-hosted

Standard Next.js build and start process with environment variables
