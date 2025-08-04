# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Skattehjalpen is a Swedish tax assistance application with a monorepo structure using npm workspaces. The application consists of:

- **Frontend**: React + TypeScript with Vite, TailwindCSS, and tRPC client (hosted on Vercel)
- **Backend**: Node.js + Express + tRPC server with file upload capabilities
- **Communication**: Full-stack type-safe tRPC for API communication

## Development Commands

### Root Level Commands

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start the backend production server

### Frontend Specific (in frontend/ directory)

- `npm run dev` - Start Vite development server (port 5173)
- `npm run build` - Build for production using TypeScript + Vite
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend Specific (in backend/ directory)

- `npm run dev` - Start development server with tsx watch (port 3001)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server from dist/

## Architecture

### Backend Structure

- **tRPC Router**: Organized by feature (user, tax) with type-safe procedures
- **Controllers**: Handle business logic for users and tax services
- **Services**: Core business logic (TaxService, FileUploadService, UserService)
- **Middleware**: Authentication and error handling
- **Validators**: Zod schemas for request validation
- **Config**: Environment configuration with validation

### Frontend Structure

- **Components**: React components for tax wizard, receipt upload, payment flow
- **tRPC Integration**: Type-safe API client with React Query
- **Styling**: TailwindCSS with PostCSS and centralized color configuration
- **Color System**: Centralized color configuration in `src/config/colors.ts` with semantic color classes

### Key Features

- File upload handling for tax receipts
- Tax declaration management
- Payment processing workflow
- User authentication system
- Type-safe API communication via tRPC

### Database & Storage

- **MongoDB**: Used as the primary database for persistent data storage
- **Models**: User, TaxDeclaration, Receipt, TaxAdvice, PaymentSession
- **User Authentication**: JWT-based with bcrypt password hashing
- File uploads stored in backend/uploads/
- Environment variables handled through src/config/env.ts

### Deployment

- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Railway

### API Endpoints

- Health check: `/health`
- tRPC procedures: `/trpc`
- File upload: `/api/upload-receipt`
- Frontend dev server: `http://localhost:5173`
- Backend dev server: `http://localhost:3001`

## Type Safety

The project uses TypeScript throughout with strict configuration and tRPC for end-to-end type safety between frontend and backend.

### TypeScript Guidelines:

- **NEVER use `any` type** - Always provide proper type definitions
- Use strict TypeScript configuration
- Leverage tRPC for type-safe API communication
- Define interfaces and types for all data structures

## Color System (Frontend)

The frontend uses a centralized color configuration system located in `src/config/colors.ts`:

### Color Usage Options:

1. **Existing TailwindCSS classes**: `bg-green-600`, `text-gray-200`, `border-gray-600` (maintained for backward compatibility)
2. **Semantic classes**: `bg-primary-600`, `text-secondary`, `border-default` (new semantic approach)
3. **Programmatic access**: Import colors from `src/config/colors.ts` for dynamic styling

### Color Categories:

- **Primary**: Blue colors for trust and professionalism (#1E3A8A, #3B82F6, #F1F5F9)
- **Accent**: Green colors for economic success and security (#16A34A, #A7F3D0)
- **Neutral**: Gray colors for text and backgrounds (#1F2937, #F9FAFB, #E5E7EB)
- **Danger**: Red colors for negative analysis or errors (#DC2626, #FECACA)
- **Semantic**: Success (green), warning (amber), error (red)
- **Background**: Primary (light), secondary, dark, white variants
- **Text**: Primary (dark), secondary, muted, inverse (white), accent (blue)
- **Border**: Default, light, accent, error

### To Change Colors:

Edit `/frontend/src/config/colors.ts` to instantly update the entire color scheme across the application.

## Authentication System

The application uses a complete JWT-based authentication system with the following characteristics:

### User Management
- **Username Format**: All usernames MUST be valid email addresses
- **Validation**: Both client-side and server-side email validation
- **Storage**: Emails are automatically converted to lowercase in the database
- **Authentication**: JWT tokens with 7-day expiration
- **Password Security**: bcrypt hashing with 12 salt rounds

### Database Schema
- **User Model**: `src/models/User.ts` - Email-based usernames with validation
- **Tax Data**: All tax declarations, receipts, and advice are linked to authenticated users
- **Security**: Users can only access their own data through protected tRPC procedures

### Frontend Integration
- **Auth Context**: `src/contexts/AuthContext.tsx` - Global authentication state
- **Modal Login**: Login/register modal in header (not separate page)
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Form Validation**: Email input types with proper placeholders

### API Security
- **Protected Endpoints**: All tax-related operations require authentication
- **User Authorization**: Data access restricted to resource owners
- **JWT Headers**: Automatic token inclusion in API requests
- **Error Handling**: Proper unauthorized access error messages

### Key Implementation Notes:
- Username field accepts email addresses only (validated by Zod and MongoDB)
- Frontend forms show "E-postadress" label with email input type
- Header displays full email address when logged in
- All user data (declarations, receipts, advice) is properly isolated per user
