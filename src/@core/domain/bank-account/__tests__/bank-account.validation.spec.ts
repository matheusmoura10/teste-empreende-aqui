import DomainError from '../../@shared/exceptions/domain.error';
import DomainException from '../../@shared/exceptions/domain.exception';
import { createStubBank } from '../../../../@stubs/bank-account.stub';
import BankAccountEntity from '../bank-account.entity';
import BankAccountValidation from '../bank-account.validation';

describe('BankAccount Validation', () => {
    let account: BankAccountEntity;
    let validator: BankAccountValidation;

    beforeEach(() => {
        account = createStubBank();
        validator = new BankAccountValidation(account);
    });


    it('should validate a user', () => {
        validator.validate();
        expect(validator.getErrors()).toHaveLength(0);
    });

    it('should validate a user without account type', () => {
        jest.spyOn(account, 'getAccountType').mockReturnValue(undefined);
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Account type is required', 'accountType'));
    });

    it('should validate a user without user', () => {
        jest.spyOn(account, 'getUser').mockReturnValue(undefined);
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('User is required', 'user'));
    });

    it('should validate a user with negative balance', () => {
        jest.spyOn(account, 'getBalance').mockReturnValue(-1);
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Balance cannot be negative', 'balance'));
    });
});