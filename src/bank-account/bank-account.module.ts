import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { ConfigModule } from '@nestjs/config';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import BankAccountRepository from 'src/@core/infra/repository/bank-account.repository';
import BankAccountServices from '../@core/application/bank-account.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forFeature([
      BankAccountRepository,
    ]),
  ],
  controllers: [BankAccountController],
  providers: [
    {
      provide: BankAccountRepository,
      useFactory: (dataSource: any) => new BankAccountRepository(dataSource),
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountServices,
      useFactory: (repository: BankAccountRepository) => new BankAccountServices(repository),
      inject: [BankAccountRepository],
    }, BankAccountService]
})
export class BankAccountModule { }
