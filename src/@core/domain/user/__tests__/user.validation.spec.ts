
import { createStubUser } from 'src/@stubs/user.stub';
import DomainError from '../../@shared/exceptions/domain.error';
import DomainException from '../../@shared/exceptions/domain.exception';
import UserEntity from '../user.entity';
import UserValidation from '../user.validation';

describe('UserValidation', () => {
    let user: UserEntity;
    let validator: UserValidation;

    beforeEach(() => {
        user = createStubUser();
        validator = new UserValidation(user);
    });


    it('should validate a user', () => {
        validator.validate();
        expect(validator.getErrors()).toHaveLength(0);
    });

    it('should validate a user without name', () => {
        jest.spyOn(user, 'getName').mockReturnValue('');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Name is required', 'name'));
    });

    it('should validate a user with name less than 3 characters', () => {
        jest.spyOn(user, 'getName').mockReturnValue('ab');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Name must have at least 3 characters', 'name'));
    })

    it('should validate a user without email', () => {
        jest.spyOn(user, 'getEmail').mockReturnValue('');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Email is required', 'email'));
    });

    it('should validate a user with invalid email', () => {
        jest.spyOn(user, 'getEmail').mockReturnValue('invalid-email');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Invalid email', 'email'));
    });

    it('should validate a user without password', () => {
        jest.spyOn(user, 'getPassword').mockReturnValue('');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Password is required', 'password'));
    });

    it('should validate a user with password less than 6 characters', () => {
        jest.spyOn(user, 'getPassword').mockReturnValue('12345');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Password must have at least 6 characters', 'password'));
    });

    it('should validate a user without cpf', () => {
        jest.spyOn(user, 'getCpf').mockReturnValue('');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('CPF is required', 'cpf'));
    });

    it('should validate a user with invalid cpf', () => {
        jest.spyOn(user, 'getCpf').mockReturnValue('invalid-cpf');
        expect(() => validator.validate()).toThrow(DomainException);
        expect(validator.getErrors()).toContainEqual(DomainError.create('Invalid CPF', 'cpf'));
    });
});