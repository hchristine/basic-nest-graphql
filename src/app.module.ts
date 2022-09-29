import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: 'postgresql://christine:pass1@0.0.0.0:5432/users',
      autoLoadModels: true,
      synchronize: true,
    }),
    PostsModule,
    AuthModule.forRoot(),
  ],
})
export class AppModule {}
