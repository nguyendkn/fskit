# FSKit - Full-Stack Starter Kit

A modern full-stack starter kit built with Next.js, TypeORM, and Zod.

## Tech Stack

- **Frontend**: Next.js with App Router
- **API**: Next.js Route Handlers for type-safe API routes
- **Database**: TypeORM with entity models
- **Authentication**: JWT-based auth system
- **Form Validation**: Zod schemas with React Hook Form
- **State Management**: Zustand stores
- **Data Fetching**: TanStack React Query
- **Internationalization**: next-i18next for multi-language support
- **Code Quality**: ESLint, Prettier, Husky, lint-staged, commitlint
- **SEO**: Meta tags, JSON-LD, Open Graph, sitemap.xml, robots.txt
- **Bundle Analysis**: Built-in bundle size monitoring

## Getting Started

First, set up your environment variables:

```bash
# Create a .env.local file with the following
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_connection_string
SITE_URL=https://yourdomain.com
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Set up the database:

```bash
npm run db:setup
# or
yarn db:setup
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run analyze` - Analyze bundle size

## Project Structure

```
├── public/
│   ├── locales/           # i18n translation files
│   └── ...
├── src/
│   ├── app/               # Next.js app router routes and API route handlers
│   │   ├── api/           # API route handlers
│   │   ├── (routes)/      # Client routes
│   │   └── ...
│   ├── components/        # Reusable components
│   │   ├── Forms/         # Form components with React Hook Form
│   │   ├── Seo/           # SEO components
│   │   └── ...
│   ├── features/          # Feature-based organization
│   │   ├── auth/          # Authentication
│   │   ├── users/         # User management
│   │   └── ...
│   ├── lib/               # Shared libraries
│   │   ├── api/           # API client utilities
│   │   ├── auth/          # Auth utilities
│   │   ├── db/            # Database connection and entities
│   │   └── ...
│   └── ...
```

## Features

- **Type-safe API**: End-to-end type safety with API typing
- **Authentication**: JWT-based authentication system
- **User Management**: CRUD operations for users
- **Form Validation**: Type-safe schema validation with React Hook Form
- **Internationalization**: Support for multiple languages
- **Code Quality Tools**: ESLint and Prettier configuration
- **Git Hooks**: Husky setup with lint-staged and commitlint
- **SEO Optimization**: Meta tags, structured data, and sitemap generation
- **Bundle Analysis**: Monitor your bundle size during development

## Git Commit Convention

This project follows conventional commits specification. Here are some examples:

- `feat: add new feature`
- `fix: resolve bug issue`
- `docs: update documentation`
- `style: formatting, missing semi colons, etc.`
- `refactor: refactor existing code`
- `test: add or update tests`
- `chore: update dependencies, etc.`

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [TypeORM Documentation](https://typeorm.io/)
- [Zod Documentation](https://zod.dev/)
- [TanStack React Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [next-i18next](https://github.com/i18next/next-i18next)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
