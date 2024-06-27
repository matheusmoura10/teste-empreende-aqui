import DomainError from '../../@shared/exceptions/domain.error';
import DomainException from '../../@shared/exceptions/domain.exception';
import { createStubBank } from '../../../../@stubs/bank-account.stub';
import OrderEntity from '../order.entity';
import OrderValidation from '../order.validation';
import { createStubUser } from 'src/@stubs/user.stub';
import AccountType from 'src/@core/domain/bank-account/account.type.enum';
import { createStubOrder } from 'src/@stubs/order.stubs';

describe('BankAccount Validation', () => {
    let order: OrderEntity;
    let validator: OrderValidation;

    const user = createStubUser();
    const account = createStubBank({
        user: user,
        accountType: AccountType.CONTA_CORRENTE,
        balance: 1000
    });

    beforeEach(() => {
        order = createStubOrder(
            {
                account: account,
                value: 100,
                user: user
            }
        );
        validator = new OrderValidation(order);
    });


    it('should validate a user', () => {
        validator.validate();
        expect(validator.getErrors()).toHaveLength(0);
    });

    it('should throw a DomainException when user is not provided', () => {
        jest.spyOn(order, 'getUser').mockReturnValue(null);

        expect(() => { validator.validate() }).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(
            DomainError.create('User is required', 'user')
        );
    });

    it('should throw a DomainException when value is not provided', () => {
        jest.spyOn(order, 'getValue').mockReturnValue(null);

        expect(() => { validator.validate() }).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(
            DomainError.create('Value is required', 'value')
        );
    });

    it('should throw a DomainException when value is less than 0', () => {
        jest.spyOn(order, 'getValue').mockReturnValue(-1);

        expect(() => { validator.validate() }).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(
            DomainError.create('Value must be greater than 0', 'value')
        );
    });

    it('should throw a DomainException when description is not provided', () => {
        jest.spyOn(order, 'getDescription').mockReturnValue('');

        expect(() => { validator.validate() }).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(
            DomainError.create('Description is required', 'description')
        );
    });

    it('should throw a DomainException when description has less than 3 characters', () => {
        jest.spyOn(order, 'getDescription').mockReturnValue('ab');

        expect(() => { validator.validate() }).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(
            DomainError.create('Description must have at least 3 characters', 'description')
        );
    });
});