import { IsBoolean, IsEmail, MaxLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post.module/post.entity';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    @MaxLength(30)
    firstName: string;

    @Column()
    @Field({ nullable: true })
    @MaxLength(30)
    lastName: string;

    @Column()
    @Field({ nullable: true })
    @IsEmail()
    email: string;

    @Column()
    @Field()
    @IsBoolean()
    isActive: boolean;

    @OneToMany(() => Post, post => post.user)
    @Field(() => [Post])
    posts: Promise<Post[]>;
}
