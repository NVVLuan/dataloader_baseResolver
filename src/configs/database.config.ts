import path from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { LoggerError, LoggerInfo } from '../utils/logger/winston.logger';
import dotenv from 'dotenv';

dotenv.config();

const { HOST, PORT_DATBASE, USERNAME_DATBASE, PASSWORD_DATBASE, DATA_DATBASE } = process.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: HOST,
    port: Number(PORT_DATBASE),
    username: USERNAME_DATBASE,
    password: PASSWORD_DATBASE,
    database: DATA_DATBASE,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname + '/../modules/**/*.entity.ts')],
    migrations: [path.join(__dirname + '/../migrations/*.ts')],
    subscribers: [],
});

export const connectDatabase = () => {
    // console.log(path.join(__dirname + '/../modules/**/*.entity.ts'));
    AppDataSource.initialize()
        .then(async () => {
            LoggerInfo(' connect database successfully ');
        })
        .catch(error => {
            LoggerError(error);
        });
};
