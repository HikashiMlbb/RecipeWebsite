import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../', '../', '.env') })

import { NestFactory } from '@nestjs/core';
import { initializeDatabase } from './config/db';
import { AppModule } from './app.module';

const PORT: number = Number(process.env.PORT) || 3001;

const startApp = async () => {
    try {
        await initializeDatabase();

        const app = await NestFactory.create(AppModule);
        
        app.listen(PORT, () => {
            console.info(`\x1b[34mServer currently listening to port ${PORT}...\x1b[0m`);
        });
    } catch (error) {
        console.error(`\x1b[41mAn error occurred while starting the application:\n\x1b[0m\x1b[31m${error}\x1b[0m`);
    }
}

startApp();