import { faker } from '@faker-js/faker';
import { createStubUser } from './user.stub';
import OrderEntity from 'src/@core/domain/order/order.entity';
import { createStubBank } from './bank-account.stub';
import UserEntity from '@core/domain/user/user.entity';
import BankAccountEntity from '@core/domain/bank-account/bank-account.entity';
import AccountType from 'src/@core/domain/bank-account/account.type.enum';



type Overrides = {
    user?: UserEntity;
    account?: BankAccountEntity;
    description?: string;
    value?: number;
    image?: string;
};


export function createStubOrder(overrides: Overrides = {}) {
    return OrderEntity.create({
        user: createStubUser(
            overrides.user ? overrides.user : {}
        ),
        account: createStubBank(
            {
                accountType: overrides.account?.getAccountType() || faker.helpers.arrayElement([AccountType.CONTA_CORRENTE, AccountType.CONTA_POUPANCA]),
                balance: overrides.account?.getBalance() || faker.number.float({ min: 0, max: 1000 }),
                user: overrides.account?.getUser() || createStubUser()
            }
        ),
        description: faker.lorem.sentence(),
        value: faker.number.float({ min: 0, max: 1000 }),
        image: faker.image.urlPlaceholder(),
        ...overrides,

    });
}

export function createStubOrderObject(overrides: Overrides = {}) {
    return {
        user: createStubUser(
            overrides.user ? overrides.user : {}
        ),
        account: createStubBank(
            overrides.account ? {
                accountType: overrides.account.getAccountType(),
                balance: overrides.account.getBalance(),
                user: overrides.account.getUser()
            } : {}
        ),
        description: faker.lorem.sentence(),
        value: faker.number.float({ min: 0, max: 1000 }),
        image: faker.image.urlPlaceholder(),
        ...overrides,
    };
}


