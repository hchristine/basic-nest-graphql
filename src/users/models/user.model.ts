import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';

@ObjectType({
  description: 'This is a User object (for fools), для особо тупих ^_^ :D',
})
@Table
export class User extends Model {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @AllowNull(false)
  @Column
  name: string;

  @Field({ nullable: true })
  @AllowNull(false)
  @Column
  married?: boolean;

  @Field()
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Field(() => [Post])
  @HasMany(() => Post)
  posts: Post[];
}
