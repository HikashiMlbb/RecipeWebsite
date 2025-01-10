import { Pool } from 'pg'
import * as queries from './tables-definition';

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

    console.info("\x1b[34mDatabase is currently initializing...\x1b[0m");

    // Creating User
    await pool.query(queries.createUser);
    console.info("\x1b[34m[*] Users table is successfully initialized!\x1b[0m");

    // Creating Recipe
    await pool.query(queries.createRecipe);
    console.info("\x1b[34m[*] Recipes table is successfully initialized!\x1b[0m");

    // Creating Comment
    await pool.query(queries.createComment);
    console.info("\x1b[34m[*] Comments table is successfully initialized!\x1b[0m");

    // Creating RecipeRating
    await pool.query(queries.createRecipeRating);
    console.info("\x1b[34m[*] RecipeRatings table is successfully initialized!\x1b[0m");

    // Creating Ingredient
    await pool.query(queries.createIngredient);
    console.info("\x1b[34m[*] Ingredients table is successfully initialized!\x1b[0m");

    // Creating Trigger with Function on RecipeRating
    await pool.query(queries.createCalculateRecipeRatingFunction);
    await pool.query(queries.createRecipeRatingOnChangeTrigger);
    console.info("\x1b[34m[*] Trigger on RecipeRating is successfully initialized!\x1b[0m");

    console.info("\x1b[34mDatabase is successfully initialized!\x1b[0m");
}