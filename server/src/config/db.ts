import { Pool } from 'pg'

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME
});

export const initializeDatabase = async () => {
    // Creating User
    const createUser = `
    CREATE TABLE IF NOT EXISTS Users (
        Id SERIAL PRIMARY KEY,
        Username VARCHAR(30) NOT NULL CONSTRAINT unqiue_username UNIQUE,
        Password TEXT NOT NULL,
        Role TEXT CONSTRAINT role_enum CHECK (Role IN ('classic', 'admin')) NOT NULL DEFAULT 'classic'
    );
    `;
    await pool.query(createUser);

    console.info("\x1b[34mDatabase is successfully initialized!\x1b[0m");
}