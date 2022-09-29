import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const { req } = ctx.switchToHttp().getNext();

    return req.user.id;
  },
);
