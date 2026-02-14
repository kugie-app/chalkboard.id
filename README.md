# 🎱 Chalkboard.id v1.0.3

A comprehensive billiard hall management system built with Next.js 15, React 19, and TypeScript. Manage table sessions, F&B orders, payments, staff, and analytics with ease.

## 🚀 Quick Deploy

### Railway (Recommended for Cloud)

One-click deploy to Railway with automatic PostgreSQL database:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chalkboardid?referralCode=D8ivdW&utm_medium=integration&utm_source=template&utm_campaign=generic)

### Docker (Recommended for Self-Hosting)

Run with Docker using our official images:

```bash
# Quick start
docker run -p 3000:3000 kugieapp/chalkboard:latest

# Or use Docker Compose
docker compose up
```

[🐳 View on Docker Hub](https://hub.docker.com/r/kugieapp/chalkboard)

### Desktop App (Recommended for Local)

Native desktop application powered by [Tauri v2](https://v2.tauri.app/) with an embedded database — no PostgreSQL setup required:

| Platform | Installer |
|----------|-----------|
| **macOS (Apple Silicon)** | `.dmg` |
| **macOS (Intel)** | `.dmg` |
| **Windows** | `.msi` or `.exe` (NSIS) |
| **Linux** | `.deb`, `.AppImage`, `.rpm` |

1. Download the installer for your platform from the latest release
2. Install and launch — the embedded PGlite database is set up automatically
3. No external database or server configuration needed

[📥 Download Desktop App](https://github.com/kugie-app/chalkboard.id/releases)

## 🎯 Overview

This modern web application offers a complete solution for billiard hall operators to manage their business efficiently. From table bookings and session tracking to F&B orders and comprehensive analytics, Chalkboard.id handles all aspects of billiard hall operations.

## 🏗️ Deployment Options

| Deployment Mode | Use Case | Database | Auto-Update | Best For |
|----------------|----------|----------|-------------|----------|
| **Desktop App** | Local installation | Embedded PGlite | ✅ | Single-machine use, no setup |
| **Docker** | Container deployment | Any PostgreSQL | ❌ | VPS, dedicated servers, self-hosted |
| **Railway** | Cloud hosting | Railway PostgreSQL | ❌ | Open source, cloud deployment |
| **Vercel Edge** | Serverless | Neon PostgreSQL | ❌ | High-performance, global |

## ✨ Key Features

### 🎱 Table Management
- **Real-time table status tracking** (available, occupied, maintenance, reserved)
- **Session management** with customer information and duration tracking
- **Hourly rate configuration** per table
- **Customer satisfaction ratings** and feedback collection

### 🍔 Food & Beverage (F&B) System
- **Complete F&B menu management** with categories and items
- **Inventory tracking** with stock levels and low-stock alerts
- **Multiple ordering contexts**:
  - Table-linked orders during sessions
  - Standalone counter orders
  - Draft orders for waiting customers
- **Cost and pricing management** for profit analysis

### 💰 Integrated Payment System
- **Consolidated billing** combining table sessions and F&B orders
- **Multiple payment methods** support (cash, card, digital payments)
- **Legacy Midtrans integration** for online payments
- **Comprehensive transaction tracking**

### 👥 Staff Management
- **Role-based access control** using CASL
- **Staff performance tracking** and order attribution
- **Multi-language support** (Indonesian/English) with next-intl

### 📊 Analytics & Reporting
- **Real-time dashboard** with key performance indicators
- **Revenue analytics** with table vs F&B breakdown
- **Peak hours analysis** for optimal staffing
- **Customer behavior insights** and session patterns
- **Inventory analytics** with stock movement tracking

### 🔐 Authentication & Security
- **NextAuth.js integration** with secure session management
- **Database-driven user management** with Drizzle ORM
- **Role-based permissions** for different staff levels

## 🛠 Technology Stack

### Frontend
- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS** for responsive design
- **Shadcn/ui** and **Radix UI** for modern components
- **Framer Motion** for smooth animations

### Backend & Database
- **Drizzle ORM** with PostgreSQL
- **PGlite** for embedded database in desktop mode
- **Neon Database** for cloud-hosted PostgreSQL
- **NextAuth.js** for authentication

### Desktop
- **Tauri v2** for native cross-platform desktop builds (macOS, Windows, Linux)
- **Rust** backend for native OS integration

### UI/UX Libraries
- **Headless UI** for accessible components
- **React Hook Form** with Zod validation
- **Recharts** and **ApexCharts** for data visualization
- **React Table (TanStack)** for advanced table functionality

### Development Tools
- **Bun** for package management and runtime
- **ESLint** and **Prettier** for code quality
- **Drizzle Kit** for database migrations

## 📁 Project Structure

```
src-tauri/                    # Tauri desktop app (Rust)
src/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalization routes
│   │   ├── (DashboardLayout)/ # Protected dashboard pages
│   │   └── auth/            # Authentication pages
│   ├── api/                 # API routes
│   │   ├── analytics/       # Analytics endpoints
│   │   ├── fnb/            # F&B management APIs
│   │   ├── payments/       # Payment processing
│   │   ├── staff/          # Staff management
│   │   └── tables/         # Table management
│   └── context/            # React contexts for state management
├── components/             # Reusable UI components
│   ├── analytics/          # Analytics dashboards
│   ├── layout/            # Layout components (sidebar, header)
│   ├── revenue/           # Revenue reporting components
│   ├── shadcn-ui/         # Shadcn component implementations
│   └── tables/            # Table management UI
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication configuration
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
├── schema/               # Database schemas
│   ├── tables.ts         # Table and session models
│   ├── fnb.ts           # F&B and staff models
│   ├── payments.ts      # Payment models
│   └── auth.ts          # User authentication models
└── utils/               # Additional utilities
    ├── i18n.ts          # Internationalization setup
    └── theme/           # Theme configuration
```

## 🗄 Database Schema

### Core Entities

**Tables & Sessions**
- `tables`: Billiard table configuration and status
- `table_sessions`: Customer session tracking with duration and costs

**Food & Beverage**
- `fnb_categories`: Menu categories
- `fnb_items`: Menu items with pricing and inventory
- `fnb_orders`: Customer orders with multiple contexts
- `fnb_order_items`: Individual order line items
- `order_analytics`: Pre-calculated analytics data

**Payments & Staff**
- `payments`: Consolidated payment records supporting multiple revenue streams
- `staff`: Staff members with role-based access

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL database (local or cloud)
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chalkboard
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate and push schema
   bun run db:generate
   bun run db:push
   
   # Seed initial data (optional)
   bun run db:seed
   ```

5. **Start the development server**
   ```bash
   bun run dev
   # or npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Commands
- `bun run db:generate` - Generate database migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:migrate` - Run pending migrations
- `bun run db:studio` - Open Drizzle Studio for database management
- `bun run db:seed` - Seed database with initial data

## 📊 API Endpoints

### Table Management
- `GET /api/tables` - List all active tables
- `POST /api/tables` - Create new table
- `GET /api/tables/[id]` - Get table details
- `POST /api/tables/[id]/start-session` - Start customer session
- `POST /api/tables/[id]/end-session` - End customer session

### F&B Management
- `GET /api/fnb/categories` - List F&B categories
- `GET /api/fnb/items` - List menu items
- `POST /api/fnb/orders` - Create new F&B order
- `GET /api/fnb/orders` - List orders (with status filtering)

### Payment Processing
- `GET /api/payments` - List payments with related data
- `POST /api/payments` - Create consolidated payment
- `GET /api/payments/[id]/qr` - Generate payment QR code

### Analytics
- `GET /api/analytics/daily-stats` - Daily performance metrics
- `GET /api/analytics/revenue` - Revenue analytics
- `GET /api/analytics/peak-hours` - Peak hour analysis
- `GET /api/analytics/table-utilization` - Table usage statistics

## 🌐 Internationalization

The application supports multiple languages using next-intl:
- **Indonesian (ID)** - Primary language
- **English (EN)** - Secondary language

Language files are located in the `messages/` directory.

## 🔒 Authentication & Authorization

- **NextAuth.js** handles user authentication
- **CASL** provides role-based access control
- **Database sessions** for persistent authentication
- **Staff role management** with different permission levels

## 🎨 UI Components

The application uses a modern component architecture:
- **Shadcn/ui** for consistent design system
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for responsive styling
- **Custom components** for business-specific functionality

## 📈 Analytics Features

- **Real-time dashboards** with key metrics
- **Revenue tracking** by source (tables vs F&B)
- **Customer behavior analysis**
- **Staff performance metrics**
- **Inventory management** with stock alerts
- **Peak hour identification** for staffing optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Quick Start with Docker

```bash
# Development with hot reload
docker compose -f docker-compose.local.yml up

# Production deployment
docker compose up
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Chalkboard.id** - Streamlining billiard hall operations with modern technology. Built by [kugie.app](https://kugie.app) and the open source community