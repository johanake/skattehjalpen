# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Skattehjalpen is a Swedish tax assistance application with a monorepo structure using npm workspaces. The application consists of:

- **Frontend**: React + TypeScript with Vite, TailwindCSS, and tRPC client
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
- **Styling**: TailwindCSS with PostCSS

### Key Features
- File upload handling for tax receipts
- Tax declaration management
- Payment processing workflow
- User authentication system
- Type-safe API communication via tRPC

### Database & Storage
- File uploads stored in backend/uploads/
- No persistent database configured (uses in-memory storage)
- Environment variables handled through src/config/env.ts

### API Endpoints
- Health check: `/health`
- tRPC procedures: `/trpc`
- File upload: `/api/upload-receipt`
- Frontend dev server: `http://localhost:5173`
- Backend dev server: `http://localhost:3001`

## Type Safety
The project uses TypeScript throughout with strict configuration and tRPC for end-to-end type safety between frontend and backend.