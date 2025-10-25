# PieBomber Setup Guide

This guide walks you through setting up the PieBomber application from scratch.

## Step 1: Database Setup (Neon Postgres)

1. **Create a Neon account**
   - Go to https://neon.tech
   - Sign up for a free account

2. **Create a new project**
   - Click "New Project"
   - Name it "piebomber"
   - Select your preferred region

3. **Get your connection string**
   - In your project dashboard, click "Connection Details"
   - Copy the connection string (starts with `postgresql://`)
   - It should look like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

4. **Add to your .env file**
   ```bash
   DATABASE_URL=postgresql://your-connection-string-here
   ```

## Step 2: Environment Variables

1. **Copy the template**
   ```bash
   cp .env.template .env
   ```

2. **Required variables** (minimum to run locally):
   ```env
   DATABASE_URL=postgresql://... # From Step 1
   PORT=3000
   NODE_ENV=development
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Optional variables** (add as needed):
   ```env
   # Zapier webhook for catering automation
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...

   # Square for payment processing
   SQUARE_ACCESS_TOKEN=...
   SQUARE_LOCATION_ID=...

   # Google Maps for enhanced location features
   VITE_GOOGLE_MAPS_API_KEY=...
   ```

## Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages for both frontend and backend.

## Step 4: Database Migrations

1. **Generate migrations** (creates migration files from schema)
   ```bash
   npm run db:generate
   ```

2. **Run migrations** (applies schema to database)
   ```bash
   npm run db:migrate
   ```

3. **Verify migration** (optional - opens database GUI)
   ```bash
   npm run db:studio
   ```

## Step 5: Seed Sample Data

This step is optional but recommended for development:

```bash
npx tsx server/db/seed.ts
```

This adds:
- 6 sample menu items (pizza, savory, and dessert pies)
- 2 upcoming events with location data

## Step 6: Start Development Server

```bash
npm run dev
```

This starts both:
- **Frontend** at http://localhost:5173
- **Backend API** at http://localhost:3000

You should now be able to:
- Browse the menu at http://localhost:5173/menu
- View events at http://localhost:5173/events
- Submit catering requests at http://localhost:5173/catering

## Step 7: Verify Everything Works

1. **Check API health**
   ```bash
   curl http://localhost:3000/api/health
   ```
   Should return: `{"success": true, "message": "PieBomber API is running", ...}`

2. **Check menu endpoint**
   ```bash
   curl http://localhost:3000/api/menu
   ```
   Should return JSON with menu items

3. **Open the frontend**
   - Go to http://localhost:5173
   - You should see the PieBomber homepage

## Optional: Google Maps Setup

To enable map features on the Events page:

1. **Get a Google Maps API key**
   - Go to https://console.cloud.google.com
   - Create a new project or select existing
   - Enable "Maps JavaScript API" and "Maps Static API"
   - Create credentials → API Key

2. **Add to .env**
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Restart the dev server**
   ```bash
   npm run dev
   ```

## Optional: Zapier Automation Setup

To automate catering request handling:

1. **Create a Zapier account** at https://zapier.com

2. **Create a new Zap**
   - Trigger: "Webhooks by Zapier"
   - Choose "Catch Hook"
   - Copy the webhook URL

3. **Add webhook URL to .env**
   ```env
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
   ```

4. **Configure Zap actions** (examples):
   - Send email notification
   - Add to Google Sheets
   - Create calendar event
   - Add to CRM
   - Send Slack notification

5. **Test the integration**
   - Submit a catering request through the form
   - Check that your Zap receives the data
   - Verify all actions execute correctly

## Troubleshooting

### Database Connection Issues

**Problem**: Can't connect to database
```
Error: getaddrinfo ENOTFOUND ...
```

**Solution**:
- Verify your `DATABASE_URL` is correct
- Ensure your IP is whitelisted in Neon (check Security settings)
- Try regenerating the connection string in Neon

### Port Already in Use

**Problem**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:
- Change the PORT in your .env file
- Or kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

### Module Not Found Errors

**Problem**:
```
Error: Cannot find module '...'
```

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

**Problem**: TypeScript compilation errors

**Solution**:
```bash
npm run build:server
```
Check the output for specific type errors and fix them

## Next Steps

- **Add real menu items**: Update data in `server/db/seed.ts` or use Drizzle Studio
- **Add real events**: Create events with actual locations and times
- **Customize styling**: Modify CSS files in `client/src/pages/` and `client/src/components/`
- **Deploy to Vercel**: See main README.md for deployment instructions

## Getting Help

If you encounter issues:

1. Check the console output for error messages
2. Verify all environment variables are set correctly
3. Ensure the database is accessible
4. Check that all dependencies installed successfully
5. File an issue on the repository with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
