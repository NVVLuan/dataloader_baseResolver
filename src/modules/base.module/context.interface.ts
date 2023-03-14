import DataLoader from 'dataloader';
import { Request, Response } from 'express';

export interface Context<T> {
    req: Request;
    rew: Response;
    loaders: {
        postsLoader: DataLoader<string, T[], string>;
    };
}
