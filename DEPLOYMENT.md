# Deployment Guide: Vercel + Railway with GitHub Actions

This guide covers deploying your Skattehjalpen application using Vercel (frontend) and Railway (backend + database) with GitHub Actions for CI/CD.

## Prerequisites

- GitHub repository with your code
- Vercel account (free tier)
- Railway account (starter plan $5/month)
- Node.js 18+ installed locally

## Part 1: Railway Setup (Backend + Database)

### 1.1 Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `skattehjalpen` repository
5. Railway will auto-detect your Node.js backend

### 1.2 Configure Backend Service

1. In Railway dashboard, click on your service
2. Go to "Settings" → "Environment"
3. Add these environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=(will be auto-generated when you add database)
   ```

### 1.3 Add PostgreSQL Database

1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically generate `DATABASE_URL` and inject it into your backend service

### 1.4 Configure Build Settings

1. In your backend service settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Root Directory**: `backend`

## Part 2: Vercel Setup (Frontend)

### 2.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `skattehjalpen` repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.2 Configure Environment Variables

1. In Vercel project settings → "Environment Variables"
2. Add:
   ```
   VITE_API_URL=https://your-railway-app.railway.app
   ```
   (Replace with your actual Railway backend URL)

## Part 3: GitHub Actions CI/CD

### 3.1 Setup Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

**For Vercel:**
- `VERCEL_TOKEN`: Get from Vercel → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel project settings
- `VERCEL_PROJECT_ID`: Get from Vercel project settings

**For Railway:**
- `RAILWAY_TOKEN`: Get from Railway → Settings → Tokens

### 3.2 Create GitHub Actions Workflows

Create `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]
    paths: ['frontend/**', 'package.json', 'package-lock.json']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build frontend
        run: npm run build
        working-directory: ./frontend

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
```

Create `.github/workflows/deploy-backend.yml`:

```yaml
name: Deploy Backend to Railway

on:
  push:
    branches: [main]
    paths: ['backend/**', 'package.json', 'package-lock.json']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build backend
        run: npm run build
        working-directory: ./backend

      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: 'skattehjalpen-backend'
```

### 3.3 Optional: Combined Workflow

Create `.github/workflows/deploy.yml` for full-stack deployment:

```yaml
name: Deploy Full Stack

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
        working-directory: ./frontend
      # Add backend tests when available

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        working-directory: ./backend
      - uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: 'skattehjalpen-backend'

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        working-directory: ./frontend
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
```

## Part 4: Database Migration (Future)

When you're ready to add a database:

### 4.1 Update Backend Dependencies

```bash
cd backend
npm install prisma @prisma/client
# or
npm install drizzle-orm postgres
```

### 4.2 Database Connection

Update your backend's environment configuration to use the Railway-provided `DATABASE_URL`.

### 4.3 Migration in CI/CD

Add migration step to your backend workflow:

```yaml
- name: Run database migrations
  run: npm run migrate
  working-directory: ./backend
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## Part 5: Testing Your Setup

### 5.1 Manual Deploy Test

1. Push code to `main` branch
2. Check GitHub Actions tab for workflow runs
3. Verify deployments in Vercel and Railway dashboards

### 5.2 Environment URLs

- **Production Frontend**: `https://your-app.vercel.app`
- **Production Backend**: `https://your-app.railway.app`
- **Database**: Accessible via Railway dashboard

## Part 6: Monitoring and Logs

### Vercel Monitoring
- Function logs in Vercel dashboard
- Analytics for performance metrics
- Error tracking built-in

### Railway Monitoring
- Service logs in Railway dashboard
- Metrics for CPU, memory, and network
- Database monitoring tools

## Cost Breakdown

- **Vercel**: Free tier (hobby projects)
- **Railway**: $5/month (includes database)
- **Total**: ~$5/month

## Next Steps

1. Set up staging environments
2. Add automated testing
3. Configure monitoring and alerting
4. Set up custom domains
5. Add SSL certificates (automatic with both platforms)

## Troubleshooting

- **Build failures**: Check logs in GitHub Actions
- **Environment variables**: Verify in platform dashboards
- **Database connection**: Check Railway service logs
- **CORS issues**: Update backend CORS settings for production URLs

---

This setup provides a professional, scalable deployment pipeline for your Swedish tax application with minimal ongoing costs.