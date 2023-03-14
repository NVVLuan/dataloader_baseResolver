import { ClassType } from 'type-graphql';
import { ApolloError } from 'apollo-server';

interface ClassTypeCustom extends ClassType {
    id?: string;
}

export interface BaseResolverInterfaced<T extends ClassType> {
    getAll(): Promise<T[]>;

    create(dataInput: ClassTypeCustom): Promise<T | ApolloError>;

    delete(dataInput: string): Promise<boolean | ApolloError>;

    update(dataInput: ClassTypeCustom): Promise<boolean | ApolloError>;
}
