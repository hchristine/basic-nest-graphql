import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthRequiredGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = context.switchToHttp().getNext() as { req: Request };
    const { authorization } = req.headers;

    if (!authorization) {
      return false;
    }

    const token = authorization.slice(7);

    if (!token) {
      return false;
    }

    try {
      const user = await this.authService.verify(token);
      // @ts-expect-error since type definition is not set
      req.user = user;
      return true;
    } catch {
      return false;
    }
  }
}
