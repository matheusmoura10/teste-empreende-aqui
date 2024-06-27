import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@core/infra/model/user.model';
import { BankAccountModule } from './bank-account/bank-account.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BankAccountModel } from '@core/infra/model/bank-account.model';
import { OrderModule } from './order/order.module';
import { OrderModel } from '@core/infra/model/order.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ms-account-mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ms_account',
      entities: [
        UserModel,
        BankAccountModel,
        OrderModel
      ],
      synchronize: true,
    }),
    AuthModule,
    BankAccountModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
