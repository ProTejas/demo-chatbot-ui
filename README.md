# Tata Capital Chatbot Application

## Overview

This is a pure frontend chatbot UI built with React and TypeScript. The application provides a static chat interface styled with Tata Capital branding, featuring local state management and client-side bot responses. All functionality is handled in the browser without any backend dependencies.

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

### Static UI Architecture
- **Deployment**: Pure static files served by Vite development server
- **State Management**: Local React state with useState hooks
- **Data Storage**: Browser memory only (no persistence)
- **Bot Logic**: Client-side response generation with predefined Tata Capital content

### Project Structure
```
/
├── src/             # React frontend source code
├── client/          # Original client directory (maintained for compatibility)
├── server/          # Minimal Vite server for development
└── index.html       # Main HTML entry point
```

## Key Components

### Message Interface (Local Types)
- **Message Type**: Simple interface with id, content, role, and timestamp
- **Local State**: Messages stored in React component state
- **No Persistence**: Messages reset on page refresh
- **Role-based Rendering**: User vs assistant message styling

### Frontend Components
- **ChatHeader**: Branded header with online status indicator
- **ChatMessages**: Message display with user/bot differentiation
- **ChatInput**: Text input with quick actions and auto-resize
- **TypingIndicator**: Visual feedback for bot response states

### Frontend Services
- **Message Generation**: Client-side bot response logic with Tata Capital content
- **State Management**: Local React hooks for message handling
- **Response System**: Simulated delays and typing indicators for realistic chat feel

## Data Flow

1. **Message Sending**: User inputs message → Added to local state → Bot response generated client-side with realistic delay
2. **Message Display**: Local state updates trigger React re-renders → UI updates immediately
3. **Session Management**: Single chat session in browser memory → Resets on page refresh

## External Dependencies

### Core Dependencies
- **react**: Core React library for UI components
- **wouter**: Lightweight React routing
- **date-fns**: Date formatting and manipulation
- **typescript**: Static type checking

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Fast build tool and dev server for static files
- **typescript**: Static type checking
- **@vitejs/plugin-react**: React support for Vite

## Deployment Strategy

### Development Environment
- **Static Server**: Vite dev server with HMR for instant updates
- **Hot Reload**: Automatic browser refresh on code changes
- **Environment**: Optimized for Replit with cartographer and runtime error handling

### Production Build
- **Static Build**: Vite production build generates optimized static files
- **Deployment**: Can be served from any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- **No Server Required**: Pure HTML, CSS, and JavaScript files

### Key Architectural Decisions

1. **Static UI Only**: Converted from full-stack to pure frontend for simplicity and ease of deployment
2. **Client-Side Logic**: All bot responses and chat logic handled in browser for zero server requirements
3. **Local State Management**: React hooks replace external state management for minimal complexity
4. **Component Library**: Radix UI chosen for accessibility and shadcn/ui for consistent design system
5. **Type Safety**: TypeScript implementation with local interfaces for development confidence
6. **Vite Development**: Fast development server with hot module replacement for efficient development