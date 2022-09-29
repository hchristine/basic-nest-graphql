import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      global: true,
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('SECRET'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService],
      exports: [AuthService],
    };
  }
}
