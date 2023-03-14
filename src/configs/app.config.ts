import { connectDatabase } from './database.config';
import express, { Express } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import path from 'path';
import { postDataLoader } from '../utils/dataLoader/user-post';

const app = express();
export const App = async (): Promise<Express> => {
    //config app
    app.use(cors());
    app.use(express.json());

    //config apollo server

    const schema = await buildSchema({
        resolvers: [path.join(__dirname + '/../modules/**/*.resolver.ts')],
        validate: true,
    });

    const serverApollo = new ApolloServer({
        schema,
        debug: false,
        cache: 'bounded',
        context: ({ req, res }) => ({
            req,
            res,
            loaders: {
                postsLoader: postDataLoader(),
            },
        }),
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });

    await serverApollo.start();
    serverApollo.applyMiddleware({ app, cors: false });

    //database connect
    connectDatabase();
    return app;
};
