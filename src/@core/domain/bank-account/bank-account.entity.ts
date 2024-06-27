import { BaseEntity } from '../@shared/entities/base.entity';
import DomainError from '../@shared/exceptions/domain.error';
import DomainException from '../@shared/exceptions/domain.exception';
import ID from '../@shared/vo/id.vo';
import UserEntity from '../user/user.entity';
import AccountType from './account.type.enum';
import BankAccountValidation from './bank-account.validation';

export type BankAccountProps = {
    id?: string;
    accountType: AccountType;
    balance: number;
    user: UserEntity;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class BankAccountEntity extends BaseEntity {
    private accountType: AccountType;
    private balance: number;
    private user: UserEntity;

    private constructor(id: ID, accountType: AccountType, balance: number, user: UserEntity, createdAt?: Date, updatedAt?: Date) {
        super(id.toString(), createdAt, updatedAt);
        this.accountType = accountType;
        this.balance = balance;
        this.user = user;

        this.validate();
    }

    validate(): void {
        new BankAccountValidation(this).validate();
    }

    static create(props: BankAccountProps): BankAccountEntity {
        return new BankAccountEntity(
            new ID(props.id),
            props.accountType,
            props.balance,
            props.user,
            props.createdAt,
            props.updatedAt,
        );
    }

    public getAccountType(): AccountType {
        return this.accountType;
    }

    public getBalance(): number {
        return this.balance || 0;
    }

    public getUser(): UserEntity {
        return this.user;
    }

    public deposit(value: number): void {
        if (value < 0) {
            const error: DomainError = DomainError.create('Deposit value cannot be negative', 'value');
            throw new DomainException([error], 'Deposit error');
        }

        this.balance += value;
    }

    public withdraw(value: number): void {
        if (this.balance < value) {
            const error: DomainError = DomainError.create('Insufficient balance', 'value');
            throw new DomainException([error], 'Withdraw error');
        }

        this.balance -= value;
    }

}
