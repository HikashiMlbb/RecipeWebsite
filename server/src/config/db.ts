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

    // Creating User
    await pool.query(queries.createUser);

    // Creating Recipe
    await pool.query(queries.createRecipe);

    // Creating Comment
    await pool.query(queries.createComment);

    // Creating RecipeRating
    await pool.query(queries.createRecipeRating);

    // Creating Ingredient
    await pool.query(queries.createIngredient);

    // Creating Trigger with Function on RecipeRating
    await pool.query(queries.createCalculateRecipeRatingFunction);
    await pool.query(queries.createRecipeRatingOnChangeTrigger);

    console.info("\x1b[34mDatabase is successfully initialized!\x1b[0m");
}