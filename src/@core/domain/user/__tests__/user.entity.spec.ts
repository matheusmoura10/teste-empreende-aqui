import { createStubObjectUser, createStubUser } from 'src/@stubs/user.stub';
import UserEntity, { UserProps } from '../user.entity';
import { fakerBr } from '@js-brasil/fakerbr';

describe('UserEntity', () => {
    const userProps: UserProps = createStubObjectUser({
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    it('should create a new UserEntity instance', () => {
        const user = UserEntity.create(userProps);

        expect(user).toBeInstanceOf(UserEntity);
        expect(user.getName()).toBe(userProps.name);
        expect(user.getEmail()).toBe(userProps.email);
        expect(user.getPassword()).toBe(userProps.password);
        expect(user.getBirthdate()).toBe(userProps.birthdate);
        expect(user.getCpf()).toBe(userProps.cpf);
        expect(user.getCreatedAt()).toBe(userProps.createdAt);
        expect(user.getUpdatedAt()).toBe(userProps.updatedAt);
    });

    it('should update UserEntity instance', () => {
        const user = createStubUser();
        const updatedProps = {
            name: 'matheus',
            email: 'matheusgonzales10@gmail.com',
            password: '123456',
            birthdate: new Date(),
            cpf: fakerBr.cpf(),
        };

        user.update(updatedProps);

        expect(user.getName()).toBe(updatedProps.name);
    });
});