import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  sign(payload: AuthPayload) {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string) {
    return this.jwtService.verifyAsync<AuthPayload>(token);
  }
}
