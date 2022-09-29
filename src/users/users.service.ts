import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginInput } from './models/login.input';
import { CreateUserInput } from './models/create-user.input';
import { User } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private authService: AuthService,
  ) {}

  async register(args: CreateUserInput) {
    const salt = await genSalt(10);
    const hashed = await hash(args.password, salt);
    debugger;
    const user = await this.userModel.create({
      ...args,
      password: hashed,
    });

    const token = await this.authService.sign({
      id: user.id,
    });
    return { token };
  }

  async login(args: LoginInput) {
    const user = await this.userModel.findOne({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isValid = await compare(args.password, user.password);
    if (!isValid) {
      throw new NotFoundException();
    }

    const token = await this.authService.sign({
      id: user.id,
    });
    return { token };
  }

  getUser(userId: number) {
    return this.userModel.findByPk(userId);
  }
}
