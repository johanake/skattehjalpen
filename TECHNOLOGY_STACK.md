# Technology Stack & Setup Guide

This document outlines the complete technology stack used in the Skattehjalpen project and provides setup instructions for bootstrapping a similar application.

## Project Architecture

**Monorepo Structure**: npm workspaces with frontend and backend packages
- Node.js requirement: `>=22.0.0`
- Package manager: npm
- Workspace management: npm workspaces

## Core Technologies

### Frontend Technologies

**Framework & Build Tools**
- **React**: v19.1.0 (latest stable)
- **TypeScript**: v5.8.3 (strict configuration)
- **Vite**: v7.0.4 (build tool and dev server)
- **React Router**: v7.7.0 (client-side routing)

**Styling & UI**
- **TailwindCSS**: v3.4.17 (utility-first CSS framework)
- **PostCSS**: v8.4.49 (CSS processing)
- **Autoprefixer**: v10.4.21 (vendor prefixing)
- Custom color system with centralized configuration

**State Management & API**
- **tRPC**: v11.4.3 (end-to-end type safety)
- **TanStack React Query**: v5.83.0 (server state management)
- **React Context API**: Authentication state management

**Payment Integration**
- **Stripe React**: v3.7.0 (@stripe/react-stripe-js)
- **Stripe.js**: v7.5.0 (@stripe/stripe-js)

**Code Quality & Development**
- **ESLint**: v9.30.1 (with TypeScript, React hooks, React refresh plugins)
- **TypeScript ESLint**: v8.35.1
- Strict TypeScript configuration with modern ES2022 target

### Backend Technologies

**Runtime & Framework**
- **Node.js**: >=22.0.0 (ES modules)
- **Express**: v4.18.3 (web framework)
- **TypeScript**: v5.2.2 (full backend type safety)
- **tsx**: v4.7.1 (TypeScript execution for development)

**API & Communication**
- **tRPC Server**: v11.4.3 (type-safe API layer)
- **CORS**: v2.8.5 (cross-origin resource sharing)
- **Zod**: v3.25.76 (schema validation)

**Database & Storage**
- **MongoDB**: v8.16.4 (via Mongoose ODM)
- **Mongoose**: v8.16.4 (MongoDB object modeling)
- **File uploads**: Multer v2.0.1

**Authentication & Security**
- **JWT**: v9.0.2 (JSON Web Tokens)
- **bcrypt**: v6.0.0 (password hashing)
- Email-based authentication system

**AI & LLM Integration**
- **Google Generative AI**: v0.24.1
- **Google GenAI**: v1.10.0
- **OpenAI Agents**: v0.0.11

**Payment Processing**
- **Stripe**: v18.3.0 (server-side payment processing)

**Development Tools**
- **Docker**: MongoDB containerization
- **Concurrently**: v8.2.2 (run multiple npm scripts)

## Database Setup

**MongoDB via Docker**
```yaml
# docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    container_name: skattehjalpen-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: skattehjalpen
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
```

## Configuration Files

### TypeScript Configuration

**Root tsconfig.json** (composite project):
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

**Frontend tsconfig.app.json**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Backend tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Vite Configuration

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### TailwindCSS Configuration

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color system integration
        primary: colors.primary,
        accent: colors.accent,
        // ... semantic colors
      },
    },
  },
  plugins: [],
};
```

### ESLint Configuration

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

## Project Structure

```
project-root/
├── package.json (workspaces configuration)
├── docker-compose.yml (MongoDB setup)
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── vercel.json (deployment config)
│   └── src/
│       ├── components/ (React components)
│       ├── contexts/ (React contexts)
│       ├── config/ (centralized configuration)
│       ├── types/ (TypeScript types)
│       └── utils/ (tRPC client setup)
└── backend/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── controllers/ (business logic)
        ├── services/ (core services)
        ├── models/ (Mongoose models)
        ├── middleware/ (Express middleware)
        ├── validators/ (Zod schemas)
        ├── config/ (environment & database)
        ├── types/ (TypeScript types)
        └── utils/ (utilities)
```

## Bootstrap Instructions

### 1. Initialize Project Structure

```bash
# Create project directory
mkdir your-project-name
cd your-project-name

# Initialize root package.json with workspaces
npm init -y
# Edit package.json to add workspaces configuration

# Create workspace directories
mkdir frontend backend
```

### 2. Root Package.json Setup

```json
{
  "name": "your-project-name",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "engines": {
    "node": ">=22.0.0"
  },
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:frontend": "npm run dev --workspace=frontend",
    "dev:backend": "npm run dev --workspace=backend",
    "build": "npm run build --workspace=backend && npm run build --workspace=frontend",
    "start": "npm run start --workspace=backend"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "@trpc/server": "^11.4.3"
  }
}
```

### 3. Frontend Setup

```bash
cd frontend

# Initialize frontend package
npm init -y

# Install frontend dependencies
npm install react@^19.1.0 react-dom@^19.1.0 react-router-dom@^7.7.0
npm install @trpc/client@^11.4.3 @trpc/react-query@^11.4.3
npm install @tanstack/react-query@^5.83.0
npm install @stripe/react-stripe-js@^3.7.0 @stripe/stripe-js@^7.5.0

# Install dev dependencies
npm install -D @vitejs/plugin-react@^4.6.0 vite@^7.0.4
npm install -D typescript@~5.8.3 @types/react@^19.1.8 @types/react-dom@^19.1.6
npm install -D tailwindcss@^3.4.17 postcss@^8.4.49 autoprefixer@^10.4.21
npm install -D eslint@^9.30.1 typescript-eslint@^8.35.1
npm install -D eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.20
```

### 4. Backend Setup

```bash
cd ../backend

# Initialize backend package
npm init -y

# Install backend dependencies
npm install express@^4.18.3 cors@^2.8.5
npm install @trpc/server@^11.4.3 zod@^3.25.76
npm install mongoose@^8.16.4 bcrypt@^6.0.0 jsonwebtoken@^9.0.2
npm install multer@^2.0.1 stripe@^18.3.0
npm install @google/generative-ai@^0.24.1

# Install dev dependencies
npm install -D typescript@^5.2.2 tsx@^4.7.1
npm install -D @types/node@^24.0.0 @types/express@^4.17.21
npm install -D @types/cors@^2.8.17 @types/bcrypt@^6.0.0
npm install -D @types/jsonwebtoken@^9.0.10 @types/multer@^2.0.0
```

### 5. Initialize Configuration Files

Copy the configuration files from the examples above:
- Frontend: `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `eslint.config.js`, `postcss.config.js`
- Backend: `tsconfig.json`
- Root: `docker-compose.yml`

### 6. Database Setup

```bash
# Start MongoDB with Docker
docker-compose up -d mongodb
```

### 7. Development Scripts

Add these scripts to respective package.json files:

**Frontend package.json scripts**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

**Backend package.json scripts**:
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### 8. Key Features to Implement

1. **tRPC Setup**: Configure type-safe API communication
2. **Authentication**: JWT-based auth with bcrypt password hashing
3. **Database Models**: Mongoose schemas for your data models
4. **File Uploads**: Multer configuration for file handling
5. **Payment Integration**: Stripe setup for payment processing
6. **Centralized Configuration**: Environment variables and color systems
7. **Error Handling**: Proper error middleware and validation

## Development Workflow

```bash
# Start full development environment
npm run dev

# Frontend only (port 5173)
npm run dev:frontend

# Backend only (port 3001)
npm run dev:backend

# Build for production
npm run build

# Start production server
npm start
```

## Deployment Considerations

- **Frontend**: Configured for Vercel deployment (vercel.json included)
- **Backend**: Express server ready for containerization
- **Database**: MongoDB via Docker or cloud service
- **Environment**: Node.js >=22.0.0 requirement across all environments
- **Type Safety**: Full TypeScript coverage with strict configuration

This technology stack provides a modern, type-safe, and scalable foundation for building full-stack web applications with authentication, payments, file uploads, and AI integration capabilities.