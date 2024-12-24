import { drizzle } from 'drizzle-orm/node-postgres';
import schema from './schema';
import { Pool } from 'pg';
import 'dotenv/config';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// const client = postgres(process.env.DATABASE_URL as string);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema, logger: true });
