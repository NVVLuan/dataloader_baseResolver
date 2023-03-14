import { AppDataSource } from './../../configs/database.config';
import DataLoader from 'dataloader';
import { groupBy, map } from 'ramda';
import { Post } from '../../modules/post.module/post.entity';

export const postDataLoader = () => {
    return new DataLoader(postsByIds);
};

async function postsByIds(userIds: Array<string>): Promise<unknown[][]> {
    const sql = `select * from post where "post"."userId" = ANY($1);`;
    const params = [userIds];
    const posts = (await AppDataSource.query(sql, params)) as [Post];
    const groupedById = groupBy<Post>(post => `${post.userId}`, posts);
    return map(userId => groupedById[userId] ?? [], userIds);
}
