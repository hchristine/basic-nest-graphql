import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRequired } from 'src/auth/auth-required.decorator';
import { CurrentUserId } from 'src/auth/current-user-id.decorator';
import { UsersService } from 'src/users/users.service';
import { CreatePostInput } from './models/create-post.input';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@AuthRequired()
@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Post)
  createPost(
    @Args('input') args: CreatePostInput,
    @CurrentUserId() userId: number,
  ) {
    return this.postsService.create(userId, args);
  }

  @Query(() => [Post])
  getAllPosts() {
    return this.postsService.getAll();
  }
}
