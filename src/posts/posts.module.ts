import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Post]), forwardRef(() => UsersModule)],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
