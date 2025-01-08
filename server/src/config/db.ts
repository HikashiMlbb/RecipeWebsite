import { Pool } from 'pg'

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME
});

export const initializeDatabase = async () => {
    await pool.query(`SELECT VERSION()`);
    console.info("\x1b[34mDatabase is successfully initialized!\x1b[0m");
}