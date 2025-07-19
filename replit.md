# UtilityPro - Utility Invoice Generator

## Overview

UtilityPro is a modern SaaS web application designed for landlords and property managers to generate professional utility invoices for tenants. The application now features user authentication, cloud-based data storage, and invoice history tracking. It calculates electrical and water utility charges based on usage data and generates printable invoices with automatic cloud saving. Built with React, shadcn/ui components, and PostgreSQL database backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks with custom calculator hooks
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: Neon Database (serverless PostgreSQL)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: PostgreSQL-backed session storage
- **Development**: Hot module replacement via Vite middleware

### Build and Development
- **Development**: Vite dev server with HMR and error overlay
- **Production**: Static build with server-side bundling using esbuild
- **Type Safety**: Strict TypeScript configuration across client and server

## Key Components

### Frontend Components
1. **Authentication**: 
   - Landing page with marketing content
   - Protected routes with Replit Auth integration
   - User profile management
2. **Invoice Calculators**: 
   - Electrical utility calculator with submeter support
   - Water utility calculator with square footage-based allocation
3. **Form Management**: 
   - Floating label inputs with real-time validation
   - Party information management (landlord/tenant details)
   - Database-backed settings persistence
4. **Invoice Generation**: 
   - Professional invoice layouts with print optimization
   - Dynamic calculations and formatting
   - Save to cloud functionality with invoice history
5. **UI Components**: 
   - Comprehensive shadcn/ui component library
   - Tab navigation for utility type switching
   - Responsive design with mobile support
   - Invoice history page with filtering

### Backend Components
1. **Express Server**: RESTful API with middleware for logging and error handling
2. **Storage Interface**: Database storage implementation with PostgreSQL
3. **Database Schema**: 
   - User management with Replit Auth integration
   - Invoice storage with full calculation history
   - Landlord and tenant settings persistence
4. **Route Management**: Protected routes with authentication middleware
5. **Session Storage**: PostgreSQL-backed session management

## Data Flow

### Client-Side Flow
1. User selects utility type (electrical or water)
2. Form data is managed by custom calculator hooks
3. Real-time calculations update as user inputs data
4. Invoice preview updates dynamically
5. Print functionality generates formatted output

### State Management
- Form state managed by custom hooks (`useElectricalCalculator`, `useWaterCalculator`)
- Server state managed by TanStack Query
- UI state handled by React hooks and context

### Calculation Logic
- **Electrical**: Calculates effective rate from total bill and usage, allocates costs between main house and ADU
- **Water**: Determines overage charges based on quarterly allowance and square footage allocation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Database ORM and query builder
- **wouter**: Lightweight client-side routing
- **express**: Web server framework

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Variant-based styling utility

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling

## Deployment Strategy

### Development Environment
- Vite dev server with hot module replacement
- Express middleware integration for API routes
- TypeScript compilation on-the-fly with tsx

### Production Build
1. Frontend: Vite builds React app to `dist/public`
2. Backend: esbuild bundles Express server to `dist/index.js`
3. Database: Drizzle migrations managed via `drizzle-kit`

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Neon Database for serverless PostgreSQL hosting
- Replit-optimized development experience

### Key Features
- User authentication with Replit Auth (OpenID Connect)
- Cloud-based invoice storage with PostgreSQL database
- Invoice history tracking with search and filtering
- Save invoices with one-click functionality
- Print-optimized invoice layouts with single-page constraint
- Real-time calculation updates
- Mobile-responsive design
- Professional invoice formatting
- Dual utility type support (electrical and water)
- Party information management with database persistence
- Error handling and validation
- Sticky header with persistent print functionality
- Clean print output without browser headers/footers
- Marketing landing page for new users
- Protected routes requiring authentication

The application is structured as a full-stack TypeScript application with clear separation between client and server code, shared types, and a modern development experience optimized for Replit deployment.