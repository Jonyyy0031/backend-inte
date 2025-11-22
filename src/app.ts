import express, { Application } from 'express';
import cors from 'cors'
import { connectToDatabase } from './database/connection';

export default async (): Promise<Application> => {
    const app = express();

    await connectToDatabase();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.json({
            status: 'OK',
            message: 'API is running',
            timeStamp: new Date().toISOString()
         });
    });

    return app;
}