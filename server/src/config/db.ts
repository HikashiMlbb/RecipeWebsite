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

    // Creating Recipe
    const createRecipe = `
    CREATE TABLE IF NOT EXISTS Recipes (
        Id SERIAL PRIMARY KEY,
        Author_Id INTEGER NOT NULL REFERENCES Users(Id) ON DELETE CASCADE,
        Title VARCHAR(50) NOT NULL,
        Description TEXT NOT NULL,
        Instruction TEXT NOT NULL,
        Image_Name TEXT NOT NULL,
        Difficulty TEXT NOT NULL CONSTRAINT difficulty_enum CHECK (Difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'easy',
        Rating NUMERIC(2, 1) NOT NULL DEFAULT 0,
        Total_Rates INTEGER NOT NULL DEFAULT 0,
        Created_At TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    `;
    await pool.query(createRecipe);

    // Creating Comment
    const createComment = `
    CREATE TABLE IF NOT EXISTS Comments (
        Recipe_Id INTEGER NOT NULL REFERENCES Recipes(Id) ON DELETE CASCADE,
        Author_Id INTEGER NULL REFERENCES Users(Id) ON DELETE SET NULL,
        Content TEXT NOT NULL,
        Created_At TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    `;
    await pool.query(createComment);

    // Creating RecipeRating
    const createRecipeRating = `
    CREATE TABLE IF NOT EXISTS Recipe_Ratings (
        Recipe_Id INTEGER NOT NULL REFERENCES Recipes(Id) ON DELETE CASCADE,
        User_Id INTEGER NULL REFERENCES Users(Id) ON DELETE SET NULL,
        Rate INTEGER NOT NULL CONSTRAINT rating_range CHECK (Rate BETWEEN 1 AND 5)
    );
    `;
    await pool.query(createRecipeRating);

    // Creating Ingredient
    const createIngredient = `
    CREATE TABLE IF NOT EXISTS Ingredients (
        Recipe_Id INTEGER NOT NULL REFERENCES Recipes(Id) ON DELETE CASCADE,
        Name VARCHAR(50) NOT NULL,
        Count REAL NOT NULL CONSTRAINT count_exists CHECK (COUNT > 0),
        Measurement_Unit TEXT NOT NULL CONSTRAINT measurement_unit_enum CHECK (Measurement_Unit IN ('grams', 'milliliters', 'pieces'))
    );
    `;
    await pool.query(createIngredient);

    console.info("\x1b[34mDatabase is successfully initialized!\x1b[0m");
}