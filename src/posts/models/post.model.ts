import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@ObjectType()
@Table
export class Post extends Model {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @AllowNull(false)
  @Column
  title: string;

  @Field()
  @AllowNull(false)
  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;
}
