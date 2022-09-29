import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  married: boolean;

  @Field()
  email: string;

  @Field()
  password: string;
}
