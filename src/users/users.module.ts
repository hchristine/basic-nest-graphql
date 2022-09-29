import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsModule } from 'src/posts/posts.module';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => PostsModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
