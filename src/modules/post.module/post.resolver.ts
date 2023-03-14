import { Resolver } from 'type-graphql';
import { createBaseResolver } from '../base.module/base.resolver';
import { Post } from './post.entity';
import { PostInput } from './post.types/post.input';

const postResolver = createBaseResolver('Post', Post, PostInput);
@Resolver()
export class PostResolver extends postResolver {}
