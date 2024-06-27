import { faker } from '@faker-js/faker';
import { fakerBr } from '@js-brasil/fakerbr';
import UserEntity from 'src/@core/domain/user/user.entity';
export function createStubUser(overrides = {}) {
    return UserEntity.create({
        ...overrides,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthdate: faker.date.past(),
        cpf: fakerBr.cpf(),

    });
}

export function createStubObjectUser(overrides = {}) {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthdate: faker.date.past(),
        cpf: fakerBr.cpf(),
        ...overrides,
    };
}


