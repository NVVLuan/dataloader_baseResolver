import { AppDataSource } from './../../configs/database.config';
import { Arg, ClassType, Mutation, Query, Resolver } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import { BaseResolverInterfaced } from './base.interface';

interface ClassTypeCustom extends ClassType {
    id?: string;
}

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

        @Mutation(() => entity, { name: `create${nameResolver}` })
        async create(@Arg('input', () => input) dataInput: X): Promise<T> {
            return await AppDataSource.getRepository(entity).save({ ...dataInput });
        }

        @Mutation(() => Boolean, { name: `delete${nameResolver}` })
        async delete(@Arg('input') dataInput: string): Promise<boolean | ApolloError> {
            const entityFind = await AppDataSource.getRepository(entity).findOne({
                where: { id: Number(dataInput) },
            });

            if (!entityFind) return new ApolloError('entity not fund');

            const deleted = await AppDataSource.getRepository(entity).delete(dataInput);

            return deleted.affected > 0 ? true : false;
        }

        @Mutation(() => Boolean, { name: `update${nameResolver}` })
        async update(@Arg('input', () => input) dataInput: X): Promise<boolean | ApolloError> {
            const entityFind = await AppDataSource.getRepository(entity).findOne({
                where: { id: dataInput.id },
            });

            if (!entityFind) return new ApolloError('entity not fund');

            const update = await AppDataSource.getRepository(entity).save({ ...dataInput });

            return update.affected > 0 ? true : false;
        }
    }

    return BaseResolver;
}
