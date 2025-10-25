import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migrateNeon } from 'drizzle-orm/neon-http/migrator';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { neon } from '@neondatabase/serverless';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech');

async function main() {
  console.log('Running migrations...');

  if (isNeonDatabase) {
    // Use Neon for production
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzleNeon(sql);
    await migrateNeon(db, { migrationsFolder: './server/db/migrations' });
  } else {
    // Use node-postgres for local development
    const { Pool } = pg;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const db = drizzlePg(pool);
    await migratePg(db, { migrationsFolder: './server/db/migrations' });
    await pool.end();
  }

  console.log('Migrations completed successfully!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
