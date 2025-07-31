# Tata Capital Chatbot Application

## Overview

This is a full-stack chatbot application built with a React frontend and Express.js backend. The application provides a chat interface styled with Tata Capital branding, featuring real-time messaging capabilities with simulated bot responses. The system uses a monorepo structure with shared TypeScript types and schemas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom Tata Capital color scheme
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: In-memory storage with interface for future database integration
- **API Design**: RESTful endpoints for chat functionality

### Monorepo Structure
```
/
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared types, schemas, and utilities
└── migrations/      # Database migration files
```

## Key Components

### Database Schema (shared/schema.ts)
- **Users Table**: User authentication and management
- **Chat Sessions Table**: Chat session organization
- **Messages Table**: Individual chat messages with role-based typing
- **Validation**: Zod schemas for runtime type checking

### Frontend Components
- **ChatHeader**: Branded header with online status indicator
- **ChatMessages**: Message display with user/bot differentiation
- **ChatInput**: Text input with quick actions and auto-resize
- **TypingIndicator**: Visual feedback for bot response states

### Backend Services
- **Storage Interface**: Abstracted data layer supporting both in-memory and database storage
- **Route Handlers**: RESTful API endpoints for chat operations
- **Bot Response System**: Simulated AI responses with realistic delays

## Data Flow

1. **Message Sending**: User inputs message → Frontend validates and sends to API → Backend stores user message → Bot response generated with delay
2. **Message Retrieval**: Frontend polls for new messages → Backend returns message history → Real-time UI updates
3. **Session Management**: Default session created on startup → Future support for user-specific sessions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **wouter**: Lightweight React routing
- **date-fns**: Date formatting and manipulation

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: tsx execution with file watching
- **Database**: Neon serverless PostgreSQL instance
- **Environment**: Replit-optimized with cartographer and runtime error handling

### Production Build
- **Frontend**: Vite production build to dist/public
- **Backend**: esbuild bundle to dist/index.js
- **Database**: Drizzle migrations applied via drizzle-kit
- **Deployment**: Single Node.js process serving both API and static files

### Key Architectural Decisions

1. **Monorepo Structure**: Chosen for code sharing between frontend and backend, enabling type safety across the full stack
2. **In-Memory Storage**: Initial implementation for rapid prototyping with clear interface for database migration
3. **Polling vs WebSockets**: HTTP polling selected for simplicity while maintaining real-time feel
4. **Component Library**: Radix UI chosen for accessibility and shadcn/ui for consistent design system
5. **Type Safety**: Full TypeScript implementation with shared schemas for runtime validation
6. **Serverless Database**: Neon PostgreSQL selected for scalability and zero-config deployment