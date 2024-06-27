
import { createStubOrderObject, createStubOrder } from "src/@stubs/order.stubs";
import { createStubBank } from "src/@stubs/bank-account.stub";
import { createStubUser } from "src/@stubs/user.stub";
import BankAccountEntity from "@core/domain/bank-account/bank-account.entity";
import OrderEntity, { OrderProps } from "../order.entity";
import UserEntity from "src/@core/domain/user/user.entity";
import DomainException from "src/@core/domain/@shared/exceptions/domain.exception";


describe('OrderEntity', () => {
    test('should create an order entity with provided properties', () => {
        const user = createStubUser();
        const stubOrder = createStubOrder(
            {
                user: user,
                account: createStubBank({
                    balance: 1000,
                    user: user
                }),
                value: 100,
            }
        );

        expect(stubOrder).toBeDefined();

        expect(stubOrder.getAccount()).toBeDefined();
        expect(stubOrder.getDescription()).toBeDefined();
        expect(stubOrder.getUser()).toBeDefined();
        expect(stubOrder.getValue()).toBeDefined();
        expect(stubOrder.getImage()).toBeDefined();
    });

    test('should create an order and debit the account', () => {

        const userEntity: UserEntity = createStubUser();

        const bankEntity: BankAccountEntity = createStubBank(
            { balance: 1000, user: userEntity }
        );

        const stubOrder: OrderProps = createStubOrderObject({
            account: bankEntity,
            value: 100,
            user: userEntity
        });

        const order: OrderEntity = OrderEntity.create(stubOrder);

        expect(order).toBeDefined();
        expect(order.getAccount().getBalance()).toBe(1000);
        expect(order.getValue()).toBe(100);
        expect(order.getDescription()).toBe(stubOrder.description);
        expect(order.getUser()).toBe(stubOrder.user);
        expect(order.getImage()).toBe(stubOrder.image);

        order.payOrder(bankEntity, 100);
        expect(order.getAccount().getBalance()).toBe(900);
        expect(order.getPaymentDate()).toBeDefined();
        expect(order.getPaymentStatus()).toBe(true);
    });
});