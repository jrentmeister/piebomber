# PieBomber

A mobile pizza pie business platform with event tracking, menu management, and catering request automation.

## Features

- **Menu Management**: Dynamic menu system with categories, dietary filters, and allergen information
- **Event Tracking**: Real-time event schedule with Google Maps integration
- **Catering Requests**: Automated catering request pipeline with Zapier and Square integration
- **Mobile-First Design**: Responsive design optimized for all devices
- **Real-Time API**: RESTful API built with Express and Drizzle ORM
- **Modern Stack**: React + TypeScript + Vite frontend with React Query for data fetching

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **React Query** (@tanstack/react-query) for server state management
- **Axios** for HTTP requests

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **Neon Postgres** for serverless database
- **Zod** for request validation

### Deployment
- **Vercel** for hosting and serverless functions
- **Neon** for managed Postgres database

## Project Structure

```
piebomber/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # API client and utilities
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   └── index.html
├── server/                  # Express backend
│   ├── db/
│   │   ├── schema.ts       # Database schema definitions
│   │   ├── index.ts        # Database connection
│   │   ├── migrate.ts      # Migration runner
│   │   └── seed.ts         # Seed data script
│   ├── routes/             # API route handlers
│   │   ├── menu.ts
│   │   ├── events.ts
│   │   └── catering.ts
│   └── index.ts            # Express server setup
├── api/                     # Vercel serverless functions
├── docs/                    # Documentation
├── package.json
├── tsconfig.json           # TypeScript config (frontend)
├── tsconfig.server.json    # TypeScript config (backend)
├── vite.config.ts          # Vite configuration
├── drizzle.config.ts       # Drizzle ORM configuration
└── vercel.json             # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon Postgres database (free tier available at [neon.tech](https://neon.tech))
- Optional: Zapier account for catering automation
- Optional: Square developer account for payments
- Optional: Google Maps API key for enhanced maps

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd piebomber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.template .env
   ```

   Edit `.env` and add your configuration:
   - `DATABASE_URL`: Your Neon Postgres connection string
   - `ZAPIER_WEBHOOK_URL`: (Optional) Zapier webhook for catering automation
   - `SQUARE_ACCESS_TOKEN`: (Optional) Square API credentials
   - `VITE_GOOGLE_MAPS_API_KEY`: (Optional) Google Maps API key

4. **Generate and run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Seed the database** (optional - adds sample data)
   ```bash
   npx tsx server/db/seed.ts
   ```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

This starts:
- Frontend dev server at `http://localhost:5173`
- Backend API server at `http://localhost:3000`

Or run them separately:

```bash
npm run dev:client    # Frontend only
npm run dev:server    # Backend only
```

### Database Management

```bash
npm run db:generate   # Generate migrations from schema changes
npm run db:migrate    # Run pending migrations
npm run db:push       # Push schema changes directly (dev only)
npm run db:studio     # Open Drizzle Studio (database GUI)
```

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
  - Query params: `category`, `available`
- `GET /api/menu/:id` - Get a specific menu item

### Events
- `GET /api/events` - Get all events
  - Query params: `status`, `upcoming`
- `GET /api/events/:id` - Get a specific event

### Catering
- `POST /api/catering` - Submit a catering request
- `GET /api/catering/:id` - Get a catering request (admin)

### Health Check
- `GET /api/health` - API health check

## Deployment

### Deploying to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Configure environment variables in Vercel**

   Go to your Vercel dashboard → Project Settings → Environment Variables

   Add all variables from `.env.template`:
   - `DATABASE_URL`
   - `ZAPIER_WEBHOOK_URL`
   - `SQUARE_ACCESS_TOKEN`
   - `SQUARE_LOCATION_ID`
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_API_URL` (set to your Vercel domain + `/api`)

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Database Migrations on Vercel

Migrations should be run as part of your deployment process. You can:

1. Run migrations manually after each deployment:
   ```bash
   vercel env pull .env.production
   npm run db:migrate
   ```

2. Or add a build hook in `package.json` to run migrations automatically

## Configuration

### Zapier Integration

To enable automated catering request handling:

1. Create a Zapier account and set up a new Zap
2. Use "Webhooks by Zapier" as the trigger
3. Copy the webhook URL to `ZAPIER_WEBHOOK_URL` in your `.env`
4. Configure actions (e.g., send email, create Google Calendar event, add to CRM)

### Square Integration

To enable payment processing (future feature):

1. Create a Square developer account
2. Get your Access Token and Location ID
3. Add them to your `.env` file

### Google Maps

To enable enhanced map features:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps JavaScript API and Static Maps API
3. Add the key to `VITE_GOOGLE_MAPS_API_KEY` in your `.env`

## Development Notes

- **No Replicate Dependencies**: This project does not include any AI image generation or Replicate integrations
- **Drizzle Migrations**: All schema changes are tracked in `server/db/migrations/`
- **Type Safety**: Full TypeScript coverage on both frontend and backend
- **React Query**: Automatic caching and revalidation of API data
- **Responsive Design**: Mobile-first CSS with desktop enhancements

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Run both client and server in development mode |
| `npm run dev:client` | Run only the Vite dev server |
| `npm run dev:server` | Run only the Express server |
| `npm run build` | Build both client and server for production |
| `npm run build:client` | Build only the client |
| `npm run build:server` | Build only the server |
| `npm start` | Start production server |
| `npm run db:generate` | Generate new migration from schema changes |
| `npm run db:migrate` | Run pending database migrations |
| `npm run db:push` | Push schema changes (dev only) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run lint` | Run ESLint |

## License

MIT

## Support

For issues or questions, please file an issue on the repository.
