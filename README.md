## node v18

## yarn start

## yarn add, remove, yarn

## dataloader

```
resolve problem n+1 query

Step 1: config DataLoader
'''
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
'''
step2: add Dataloader into context middleware

'''
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
'''
step 3: handle field resolver

'''
    @FieldResolver(_returns => [Post])
    async posts(@Root() user: User, @Ctx() context: Context<Post>): Promise<Post[]> {
        return await context.loaders.postsLoader.load(`${user.id}`);
    }
'''
```

## base resolver

```
    export function createBaseResolver<T extends ClassType, X extends ClassTypeCustom>(
        nameResolver: string,
        entity: T,
        input: X
    ) {
        @Resolver({ isAbstract: true })
        abstract class BaseResolver implements BaseResolverInterfaced<T> {
            @Query(() => [entity], { name: `getAll${nameResolver}` })
            async getAll(): Promise<T[]> {
                return await AppDataSource.getRepository(entity).find();
            }
        }
    }
```

## custom class-validate

```
    @ValidatorConstraint({ async: true })
    export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
        async validate(userName: any): Promise<boolean> {
            return AppDataSource.getRepository(User)
                .findOne({ where: { firstName: userName } })
                .then(user => {
                    if (user) return false;
                    return true;
                });
        }
    }

    export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return function (object: Object, propertyName: string) {
            registerDecorator({
                target: object.constructor,
                propertyName: propertyName,
                options: validationOptions,
                constraints: [],
                validator: IsUserAlreadyExistConstraint,
            });
        };
    }
```

```
    @IsUserAlreadyExist({message: 'User $value already exists. Choose another name.' })
    firstName: string;
```
