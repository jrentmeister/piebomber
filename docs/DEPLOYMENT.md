# PieBomber Deployment Guide

This guide covers deploying PieBomber to Vercel with a Neon Postgres database.

## Prerequisites

- GitHub account (for code hosting)
- Vercel account (free tier available)
- Neon Postgres database (set up during development)

## Step 1: Prepare Your Repository

1. **Initialize git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PieBomber application"
   ```

2. **Create a GitHub repository**
   - Go to https://github.com/new
   - Create a new repository
   - Don't initialize with README (we already have one)

3. **Push your code**
   ```bash
   git remote add origin https://github.com/yourusername/piebomber.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your `piebomber` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   DATABASE_URL=postgresql://your-neon-connection-string
   NODE_ENV=production
   VITE_API_URL=https://your-app-name.vercel.app/api
   ```

   Optional variables:
   ```
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/...
   SQUARE_ACCESS_TOKEN=...
   SQUARE_LOCATION_ID=...
   VITE_GOOGLE_MAPS_API_KEY=...
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add environment variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add NODE_ENV
   vercel env add VITE_API_URL
   # Add others as needed
   ```

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Step 3: Run Database Migrations

After deployment, you need to run migrations on your production database:

1. **Pull production environment variables**
   ```bash
   vercel env pull .env.production
   ```

2. **Run migrations**
   ```bash
   npm run db:migrate
   ```

3. **Optional: Seed production data**
   ```bash
   npm run db:seed
   ```

## Step 4: Verify Deployment

1. **Check API Health**
   ```bash
   curl https://your-app-name.vercel.app/api/health
   ```

2. **Test endpoints**
   - Menu: `https://your-app-name.vercel.app/api/menu`
   - Events: `https://your-app-name.vercel.app/api/events`

3. **Visit the site**
   - Open `https://your-app-name.vercel.app` in your browser
   - Navigate through all pages
   - Test submitting a catering request

## Step 5: Configure Custom Domain (Optional)

1. **Go to Project Settings**
   - In Vercel dashboard, select your project
   - Go to "Settings" → "Domains"

2. **Add Domain**
   - Click "Add"
   - Enter your domain (e.g., `piebomber.com`)
   - Follow DNS configuration instructions

3. **Update VITE_API_URL**
   - Go to "Settings" → "Environment Variables"
   - Update `VITE_API_URL` to your custom domain
   - Redeploy: `vercel --prod`

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will:
1. Detect the push
2. Run the build
3. Deploy automatically
4. Run any configured hooks

## Environment-Specific Builds

### Preview Deployments

Every pull request gets a preview deployment:
- Automatic URL: `https://piebomber-pr-123.vercel.app`
- Test changes before merging

### Production Deployment

Only deploys from your main branch:
- Production URL: `https://your-app-name.vercel.app`
- Custom domain (if configured)

## Monitoring and Logs

### View Logs

1. **Via Vercel Dashboard**
   - Go to your project
   - Click "Deployments"
   - Select a deployment
   - View "Function Logs"

2. **Via CLI**
   ```bash
   vercel logs your-app-name.vercel.app
   ```

### Analytics

Vercel provides built-in analytics:
- Go to your project → "Analytics"
- View page views, performance metrics, and more

## Troubleshooting

### Build Fails

**Problem**: Build fails with type errors

**Solution**:
```bash
npm run lint
npm run build
```
Fix any errors locally before pushing.

### API Routes Not Working

**Problem**: 404 on `/api/*` routes

**Solution**:
- Check `vercel.json` is in root directory
- Verify routes configuration
- Check function logs for errors

### Database Connection Issues

**Problem**: Can't connect to database

**Solution**:
- Verify `DATABASE_URL` is set in Vercel environment variables
- Check Neon database is active
- Ensure connection string includes `?sslmode=require`

### Environment Variables Not Loading

**Problem**: Variables not available in app

**Solution**:
- Client variables must start with `VITE_`
- Redeploy after adding new variables
- Check variable scope (Production/Preview/Development)

## Rollback a Deployment

If something goes wrong:

1. **Via Dashboard**
   - Go to "Deployments"
   - Find a working deployment
   - Click "..." → "Promote to Production"

2. **Via CLI**
   ```bash
   vercel rollback
   ```

## Performance Optimization

### Enable Edge Caching

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/menu",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

### Optimize Images

If you add images:
1. Use Vercel Image Optimization
2. Add `next/image` or similar
3. Configure in `vercel.json`

## Security Checklist

- [ ] All sensitive keys in environment variables (not in code)
- [ ] `.env` file is in `.gitignore`
- [ ] Database connection uses SSL
- [ ] API endpoints validate input
- [ ] CORS configured properly
- [ ] Rate limiting enabled (if needed)

## Scaling

Vercel automatically scales based on traffic:
- **Free Tier**: 100GB bandwidth, 100 deployments/day
- **Pro Tier**: 1TB bandwidth, unlimited deployments
- **Enterprise**: Custom limits

Monitor usage in Vercel dashboard → "Usage"

## Backup Strategy

### Database Backups

Neon provides:
- Automatic daily backups (retained 7 days)
- Point-in-time recovery
- Manual snapshots

Access via Neon dashboard → "Backups"

### Code Backups

Your code is backed up in:
- GitHub repository
- Vercel deployment history

## Post-Deployment Tasks

1. **Set up monitoring**
   - Configure Vercel notifications
   - Set up uptime monitoring (e.g., UptimeRobot)

2. **Configure Zapier webhooks**
   - Update webhook URLs to production
   - Test automation flows

3. **Update documentation**
   - Document production URLs
   - Update API documentation

4. **Test everything**
   - Submit test catering request
   - Verify all pages load
   - Check mobile responsiveness

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Neon Documentation**: https://neon.tech/docs
- **Deployment Issues**: Check Vercel community forums
- **Database Issues**: Check Neon support

## Next Steps

After successful deployment:
1. Monitor performance and errors
2. Set up analytics (Google Analytics, etc.)
3. Configure monitoring alerts
4. Plan regular database backups
5. Document your deployment process
