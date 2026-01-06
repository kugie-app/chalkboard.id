# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production 
- `bun run lint` - Run ESLint code linting
- `bun run db:generate` - Generate database migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:migrate` - Run pending migrations
- `bun run db:studio` - Open Drizzle Studio for database management
- `bun run db:seed` - Seed database with initial data

## Architecture Overview

This is a billiard hall management system built with Next.js 15 and React 19, using TypeScript and Drizzle ORM with PostgreSQL.

### Core Architecture

- **App Router Structure**: Uses Next.js 15 App Router with internationalization (`[locale]` routes)
- **Database**: PostgreSQL with Drizzle ORM, schema files in `src/schema/`
- **Authentication**: NextAuth.js with database sessions and CASL for role-based access control
- **State Management**: React Context for local state, Redux Toolkit for complex state
- **UI**: Tailwind CSS, Shadcn/ui, Radix UI components, Headless UI

### Database Schema Organization

Located in `src/schema/`:
- `tables.ts` - Billiard table and session management
- `fnb.ts` - Food & beverage system, inventory, and orders
- `auth.ts` - User authentication and staff management  
- `payments.ts` - Payment processing and transactions
- `settings.ts` - Application configuration
- `pricing-packages.ts` - Pricing and package management

### Key Business Logic Areas

1. **Table Management** (`src/app/api/tables/`) - Real-time table status, session tracking
2. **F&B System** (`src/app/api/fnb/`) - Menu management, inventory tracking, order processing
3. **Payment Integration** (`src/app/api/payments/`) - Consolidated billing for table + F&B orders
4. **Analytics** (`src/app/api/analytics/`) - Revenue tracking, peak hours analysis, customer insights
5. **Staff Management** (`src/app/api/staff/`) - Role-based permissions, performance tracking

### Component Organization

- `src/components/analytics/` - Dashboard and reporting components
- `src/components/revenue/` - Revenue analysis charts and displays
- `src/components/tables/` - Table management UI, session controls
- `src/components/layout/` - Shared layout components (sidebar, header)
- `src/components/shadcn-ui/` - Custom implementations of Shadcn components

### Context Providers

Located in `src/app/context/` for managing application state across different modules (Blog, Chat, Ecommerce, Email, Invoice, Notes, Ticket, UserData, Kanban).

### Deployment Modes

The application supports multiple deployment targets via environment variable `DEPLOYMENT_MODE`:
- `edge` - Vercel Edge runtime with Neon database
- `node` - Standard Node.js runtime
- `railway` - Railway platform deployment
- `standalone` - Self-contained Windows executable with auto-updater
- `auto` - Automatic detection of deployment environment

### Migration Management

Use the custom migration scripts:
- `bun run migration:create` - Create new migration
- `bun run migration:run` - Execute pending migrations
- `bun run migration:status` - Check migration status

### Internationalization

Uses next-intl with language files in `messages/` directory supporting Indonesian (id) and English (en).