import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Post } from './../post.entity';

@InputType()
export class PostInput {
    @Field()
    @MaxLength(30)
    url: string;

    @Field()
    @MaxLength(100)
    userId: string;
}
