# PieBomber Quick Start

Get PieBomber running locally in under 5 minutes.

## Prerequisites

- Node.js 18+ installed
- A Neon Postgres database account (free at [neon.tech](https://neon.tech))

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

**Create Neon Database:**
1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy your connection string

**Configure Environment:**
```bash
cp .env.template .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL=postgresql://your-connection-string-here
PORT=3000
NODE_ENV=development
VITE_API_URL=http://localhost:3000/api
```

### 3. Run Migrations

```bash
npm run db:generate
npm run db:migrate
```

### 4. Seed Sample Data (Optional)

```bash
npm run db:seed
```

This adds:
- 6 menu items (various pies)
- 2 upcoming events

### 5. Start Development Server

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Verify It Works

1. **Open frontend**: http://localhost:5173
2. **Check API**: http://localhost:3000/api/health
3. **View menu**: http://localhost:5173/menu
4. **View events**: http://localhost:5173/events

## Optional Enhancements

### Add Google Maps

1. Get API key from https://console.cloud.google.com
2. Add to `.env`:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   ```
3. Restart dev server

### Add Zapier Automation

1. Create Zapier webhook at https://zapier.com
2. Add to `.env`:
   ```env
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
   ```
3. Restart dev server
4. Test by submitting catering request

## Next Steps

- Read [README.md](README.md) for full documentation
- Read [SETUP.md](docs/SETUP.md) for detailed setup guide
- Read [DEPLOYMENT.md](docs/DEPLOYMENT.md) for deployment instructions

## Need Help?

- Check [SETUP.md](docs/SETUP.md) troubleshooting section
- Review error logs in terminal
- Verify all environment variables are set

## Common Issues

**Database connection error?**
- Verify `DATABASE_URL` is correct
- Check Neon database is active

**Port already in use?**
- Change `PORT` in `.env`
- Or: `lsof -ti:3000 | xargs kill -9`

**Module not found?**
- Run `npm install` again
- Delete `node_modules` and reinstall

## Development Commands

```bash
npm run dev              # Start both frontend and backend
npm run dev:client       # Start frontend only
npm run dev:server       # Start backend only
npm run build            # Build for production
npm run db:studio        # Open database GUI
npm run db:seed          # Add sample data
```

Happy coding! 🍕
