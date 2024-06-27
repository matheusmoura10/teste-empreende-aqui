import BankAccountServices from 'src/@core/application/bank-account.service';
import BankAccountCreateDto from 'src/@core/application/dto/bank-account/bank-account.create.dto';
import DepositAccountDto from 'src/@core/application/dto/bank-account/deposit.account.dto';
import WithdrawAccountDto from 'src/@core/application/dto/bank-account/withdraw.account.dto';
import BankAccountEntity from 'src/@core/domain/bank-account/bank-account.entity';
import UserEntity from 'src/@core/domain/user/user.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class BankAccountService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly bankAccountService: BankAccountServices,
    ) { }

    async create(bank: BankAccountCreateDto): Promise<BankAccountEntity> {
        const userEntity = UserEntity.create(this.request['user']);
        return await this.bankAccountService.create(bank, userEntity);
    }

    async getMyAccounts(): Promise<BankAccountEntity[]> {
        const userEntity = UserEntity.create(this.request['user']);
        return await this.bankAccountService.getMyAccounts(userEntity);
    }

    async deposit(bank: DepositAccountDto): Promise<BankAccountEntity> {
        const userEntity = UserEntity.create(this.request['user']);
        return await this.bankAccountService.deposit(bank, userEntity);
    }

    async withdraw(bank: WithdrawAccountDto) {
        const userEntity = UserEntity.create(this.request['user']);
        return await this.bankAccountService.withdraw(bank, userEntity);
    }

}
