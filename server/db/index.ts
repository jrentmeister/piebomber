import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { neon } from '@neondatabase/serverless';
import pg from 'pg';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Use Neon driver for Neon databases (production), pg for local PostgreSQL
const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech');

let db: ReturnType<typeof drizzleNeon<typeof schema>> | ReturnType<typeof drizzlePg<typeof schema>>;

if (isNeonDatabase) {
  // Use Neon serverless driver for production
  const sql = neon(process.env.DATABASE_URL);
  db = drizzleNeon(sql, { schema });
} else {
  // Use node-postgres for local development
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  db = drizzlePg(pool, { schema });
}

export { db };
