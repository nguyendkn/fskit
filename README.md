# FSKit - Full-Stack Starter Kit

A modern full-stack starter kit built with Next.js, TypeORM, Hono, and Zod.

## Tech Stack

- **Frontend**: Next.js with App Router
- **API**: Hono for edge-compatible API routes
- **Database**: TypeORM with entity models
- **Authentication**: JWT-based auth system
- **Form Validation**: Zod schemas
- **State Management**: Zustand stores
- **Data Fetching**: TanStack React Query

## Getting Started

First, set up your environment variables:

```bash
# Create a .env.local file with the following
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_connection_string
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

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app router routes
│   ├── features/            # Feature-based organization
│   │   ├── auth/            # Authentication
│   │   ├── users/           # User management
│   │   └── ...
│   ├── lib/                 # Shared libraries
│   │   ├── db/              # Database connection and entities
│   │   └── rpc/             # API client
│   └── ...
```

## Features

- **Type-safe API**: End-to-end type safety with API typing
- **Authentication**: JWT-based authentication system
- **User Management**: CRUD operations for users
- **Form Validation**: Type-safe schema validation

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/)
- [TypeORM Documentation](https://typeorm.io/)
- [Zod Documentation](https://zod.dev/)
- [TanStack React Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
