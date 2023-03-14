import { AppDataSource } from './src/configs/database.config';
import { App } from './src/configs/app.config';
import { LoggerError, LoggerInfo } from './src/utils/logger/winston.logger';
import { Express } from 'express';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const { HOST, PORT } = process.env;

const createApp = async (app: Express): Promise<void> => {
    const server = http.createServer(app);
    try {
        app.listen(PORT, () => {
            LoggerInfo(` server run at http://${HOST}:${PORT} `);
        });

        process.on('SIGINT', () => {
            server.close(() => {
                server.close(() => {
                    AppDataSource.destroy();
                    LoggerInfo(' database disconnect ');
                    process.exit(0);
                });
            });
        });

        process.on('SIGTERM', () => {
            LoggerInfo(' Shutting down server ');
            server.close(() => {
                AppDataSource.destroy();
                LoggerInfo(' database disconnect ');
                process.exit(0);
            });
        });
    } catch (err) {
        LoggerError(' server run error');
    }
};

(async () => {
    try {
        const app = await App();
        await createApp(app);
    } catch (err) {
        LoggerError(` server error: ${err} `);
    }
})();
