import BankAccountRepositoryInterface from "src/@core/domain/bank-account/bank-account.repository.interface";
import BankAccountCreateDto from "./dto/bank-account/bank-account.create.dto";
import UserEntity from "src/@core/domain/user/user.entity";
import BankAccountEntity from "src/@core/domain/bank-account/bank-account.entity";
import AccountType from "src/@core/domain/bank-account/account.type.enum";
import DepositAccountDto from "./dto/bank-account/deposit.account.dto";
import { ConflictException, NotFoundException } from "@nestjs/common";
import WithdrawAccountDto from "./dto/bank-account/withdraw.account.dto";

export default class BankAccountServices {
    constructor(
        private readonly bankAccountRepository: BankAccountRepositoryInterface,
    ) { }

    async create(bank: BankAccountCreateDto, userEntity: UserEntity): Promise<BankAccountEntity> {
        const bankEntity = BankAccountEntity.create({
            accountType: AccountType[bank.accountType],
            balance: bank.balance,
            user: userEntity,
        });

        await this.bankAccountRepository.save(bankEntity);
        return this.getBankAccountOrThrow(bankEntity.getId());
    }

    async getMyAccounts(userEntity: UserEntity): Promise<BankAccountEntity[]> {
        return this.bankAccountRepository.findByUser(userEntity);
    }

    async deposit(account: DepositAccountDto, userEntity: UserEntity): Promise<BankAccountEntity> {
        const accountEntity = await this.getBankAccountOrThrow(account.accountId);

        this.ensureAccountOwnership(accountEntity, userEntity);

        accountEntity.deposit(account.amount);
        await this.bankAccountRepository.save(accountEntity);

        return accountEntity;
    }

    async withdraw(account: WithdrawAccountDto, userEntity: UserEntity): Promise<BankAccountEntity> {
        const accountEntity = await this.getBankAccountOrThrow(account.accountId);

        this.ensureAccountOwnership(accountEntity, userEntity);

        accountEntity.withdraw(account.amount);
        await this.bankAccountRepository.save(accountEntity);

        return accountEntity;
    }

    private async getBankAccountOrThrow(accountId: string): Promise<BankAccountEntity> {
        const accountEntity = await this.bankAccountRepository.findById(accountId);
        if (!accountEntity) {
            throw new NotFoundException('Account not found');
        }
        return accountEntity;
    }

    private ensureAccountOwnership(accountEntity: BankAccountEntity, userEntity: UserEntity): void {
        if (accountEntity.getUser().getId() !== userEntity.getId()) {
            throw new ConflictException('Account does not belong to user');
        }
    }
}