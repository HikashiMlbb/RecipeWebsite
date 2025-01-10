import { Pool } from 'pg'
import { createComment, createIngredient, createRecipe, createRecipeRating, createUser } from './tables-definition';

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME
});

export const initializeDatabase = async () => {
    try {
        await pool.connect();
    } catch {
        throw new Error("Unable to connect to the database.");
    }

    // Creating User
    await pool.query(createUser);

    // Creating Recipe
    await pool.query(createRecipe);

    // Creating Comment
    await pool.query(createComment);

    // Creating RecipeRating
    await pool.query(createRecipeRating);

    // Creating Ingredient
    await pool.query(createIngredient);

    console.info("\x1b[34mDatabase is successfully initialized!\x1b[0m");
}