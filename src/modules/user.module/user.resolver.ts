import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { User } from './user.entity';
import { createBaseResolver } from '../base.module/base.resolver';
import { UserInput } from './user.types/user.input';
import { Post } from '../post.module/post.entity';
import { Context } from '../base.module/context.interface';

const userBaseResolver = createBaseResolver('User', User, UserInput);

@Resolver(of => User)
export class UserResolver extends userBaseResolver {
    @Query(() => String)
    Helloworld() {
        return 'hello';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @FieldResolver(_returns => [Post])
    async posts(@Root() user: User, @Ctx() context: Context<Post>): Promise<Post[]> {
        return await context.loaders.postsLoader.load(`${user.id}`);
    }
}
