import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Authorization result that contains token',
})
export class AuthResult {
  @Field()
  token: string;
}
