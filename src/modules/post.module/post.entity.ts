import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user.module/user.entity';

@Entity()
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    url: string;

    @Field()
    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.posts)
    @Field(() => User)
    user: User;
}
