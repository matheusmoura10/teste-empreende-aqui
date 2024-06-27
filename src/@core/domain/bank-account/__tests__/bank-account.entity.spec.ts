import BankAccountEntity, { BankAccountProps } from '../bank-account.entity';
import DomainException from '../../@shared/exceptions/domain.exception';
import { createStubObjectBank } from 'src/@stubs/bank-account.stub';

describe('BankAccountEntity', () => {
    const bankAccountProps: BankAccountProps = createStubObjectBank();

    it('should create a new BankAccountEntity instance', () => {
        const bankAccount = BankAccountEntity.create(bankAccountProps);
        expect(bankAccount).toBeInstanceOf(BankAccountEntity);
        expect(bankAccount.getAccountType()).toBe(bankAccountProps.accountType);
        expect(bankAccount.getBalance()).toBe(bankAccountProps.balance);
        expect(bankAccount.getUser()).toBe(bankAccountProps.user);
    });

    it('should deposit money into the bank account', () => {
        const bankAccount = BankAccountEntity.create(bankAccountProps);
        const initialBalance = bankAccount.getBalance();
        const depositAmount = 500;
        bankAccount.deposit(depositAmount);
        expect(bankAccount.getBalance()).toBe(initialBalance + depositAmount);
    });

    it('should throw an error when trying to deposit a negative value', () => {
        const bankAccount = BankAccountEntity.create(bankAccountProps);
        const negativeDepositAmount = -500;
        expect(() => bankAccount.deposit(negativeDepositAmount)).toThrow(DomainException);
    });

    it('should withdraw money from the bank account', () => {
        const bankAccount = BankAccountEntity.create({
            ...bankAccountProps,
            balance: 1000,
        });
        const initialBalance = bankAccount.getBalance();
        const withdrawalAmount = 500;
        bankAccount.withdraw(withdrawalAmount);

        expect(bankAccount.getBalance()).toBe(initialBalance - withdrawalAmount);
    });

    it('should throw an error when trying to withdraw more than the available balance', () => {
        const bankAccount = BankAccountEntity.create({
            ...bankAccountProps,
            balance: 1000,
        });
        const withdrawalAmount = bankAccount.getBalance() + 100;
        expect(() => bankAccount.withdraw(withdrawalAmount)).toThrow(DomainException);
    });

});