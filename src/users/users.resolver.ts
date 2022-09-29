import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthRequired } from 'src/auth/auth-required.decorator';
import { PostsService } from 'src/posts/posts.service';
import { AuthResult } from './models/auth-result.type';
import { CreateUserInput } from './models/create-user.input';
import { LoginInput } from './models/login.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  @AuthRequired()
  @Query(() => User)
  getUser(@Args('id') userId: number) {
    return this.usersService.getUser(userId);
  }

  @ResolveField()
  posts(@Parent() user: User) {
    console.log('Called ?');
    return this.postsService.getByUserId(user.id);
  }

  @Mutation(() => AuthResult)
  register(@Args('input') args: CreateUserInput): Promise<AuthResult> {
    return this.usersService.register(args);
  }

  @Mutation(() => AuthResult)
  login(@Args('input') args: LoginInput): Promise<AuthResult> {
    return this.usersService.login(args);
  }
}
