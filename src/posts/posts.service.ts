import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { CreatePostInput } from './models/create-post.input';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  create(userId: number, args: CreatePostInput) {
    return this.postModel.create({ userId, ...args });
  }

  getByUserId(id: number) {
    return this.postModel.findAll({
      where: {
        userId: id,
      },
    });
  }

  getAll() {
    return this.postModel.findAll({
      include: [User],
    });
  }
}
