import dotenv from 'dotenv'
import express from 'express'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../', '../', '.env') })

const app = express();

const PORT: number = Number(process.env.PORT) || 3001;

const startApp = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server currently listening to port ${PORT}...`);
        })
    } catch (error) {
        console.error(error);
    }
}

startApp();