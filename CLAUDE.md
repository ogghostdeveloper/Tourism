# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14+ application for Bhutan Tourism, featuring a public website and an admin CMS panel. The application uses:

- Next.js App Router with Server Components
- MongoDB for data storage
- Tailwind CSS v4 for styling
- TypeScript for type safety
- Radix UI and custom components for UI primitives
- Zod for schema validation
- NextAuth for authentication

## Repository Structure

```
frontend/                 # Main Next.js application
├── src/
│   ├── app/             # App router structure
│   │   ├── (website)/   # Public website pages
│   │   ├── admin/       # Admin CMS panel
│   │   └── api/         # API routes
│   ├── components/      # Shared UI components
│   ├── lib/             # Business logic and data access
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
└── scripts/             # Utility scripts
```

## Common Development Commands

### Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Development Utilities

```bash
# Run ESLint
npm run lint

# Migrate image paths
npm run migrate-images
```

## Architecture Overview

### Data Layer

- MongoDB is used as the primary database with a connection pool pattern
- Data access is organized by entity (tours, destinations, experiences, etc.)
- Each entity has a dedicated file in `src/lib/data/` with CRUD operations
- Zod schemas are defined in corresponding `schema.ts` files for validation

### Authentication

- Admin authentication uses NextAuth with a simple cookie-based session
- Credentials are hardcoded in `src/lib/auth.ts` (should be replaced with proper auth in production)
- Admin routes are protected by middleware checking for admin session

### Component Architecture

- UI components follow a strict separation between presentation and data-fetching
- Server Components handle data fetching and pass props to Client Components
- Reusable UI primitives are in `src/components/ui/`
- Entity-specific components are organized by feature area

### Admin Panel

The admin panel is a comprehensive CMS with:

- Dashboard with statistics
- CRUD interfaces for all content types (tours, destinations, experiences, etc.)
- DataTable components with sorting, filtering, and pagination
- Image upload functionality
- Tour request management

### Public Website

The public website includes:

- Homepage with featured content
- Detailed pages for tours, destinations, experiences, and hotels
- Interactive map components
- Enquiry forms with email notifications
- Responsive design for all device sizes

## Testing

Tests should be run using:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/file.test.ts
```

## Deployment

The application can be deployed using:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

Environment variables must be configured:

- MONGODB_URI: MongoDB connection string
- AUTH_SECRET: Secret for session encryption
- SMTP configuration for email notifications

## Common Patterns

1. **Data Fetching**: Use server-side data fetching in Server Components
2. **Validation**: Use Zod schemas for all data validation
3. **Styling**: Use Tailwind CSS classes with consistent naming
4. **Component Structure**: Separate presentational and container components
5. **Error Handling**: Use proper error boundaries and validation feedback