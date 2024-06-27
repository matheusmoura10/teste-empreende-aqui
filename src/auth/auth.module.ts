import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@core/infra/model/user.model';
import { AuthService } from './auth.service';
import UserRepository from '@core/infra/repository/user.repository';
import UserService from '@core/application/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forFeature([
      UserModel,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: UserRepository,
      useFactory: (dataSource: any) => new UserRepository(dataSource),
      inject: [getDataSourceToken()],
    },
    {
      provide: UserService,
      useFactory: (repository: UserRepository) => new UserService(repository, new JwtService),
      inject: [UserRepository],
    }
    , AuthService]
})
export class AuthModule { }
