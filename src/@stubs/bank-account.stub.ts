import { faker } from '@faker-js/faker';
import BankAccountEntity from '../@core/domain/bank-account/bank-account.entity';
import AccountType from 'src/@core/domain/bank-account/account.type.enum';
import { createStubUser } from './user.stub';
import UserEntity from '@core/domain/user/user.entity';

type Overrides = {
    user?: UserEntity;
    balance?: number;
    accountType?: AccountType;
};

export function createStubBank(overrides: Overrides = {}) {
    return BankAccountEntity.create({
        user: createStubUser(
            overrides.user ? overrides.user : {}
        ),
        accountType: faker.helpers.arrayElement([AccountType.CONTA_CORRENTE, AccountType.CONTA_POUPANCA]),
        balance: faker.number.float({ min: 0, max: 1000 }),
        ...overrides,
    });
}

export function createStubObjectBank(overrides: Overrides = {}) {
    return {
        user: createStubUser(),
        accountType: faker.helpers.arrayElement([AccountType.CONTA_CORRENTE, AccountType.CONTA_POUPANCA]),
        balance: faker.number.float({ min: 0, max: 1000 }),
        ...overrides,
    };
}


