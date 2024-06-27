import { BaseEntity } from "../@shared/entities/base.entity";
import ID from "../@shared/vo/id.vo";
import BankAccountEntity from "../bank-account/bank-account.entity";
import UserEntity from "../user/user.entity";
import OrderValidation from "./order.validation";
import DomainError from '../@shared/exceptions/domain.error';
import DomainException from "../@shared/exceptions/domain.exception";

export type OrderProps = {
    id?: string;
    user: UserEntity;
    account?: BankAccountEntity;
    value: number;
    paymentDate?: Date;
    paymentStatus?: boolean;
    description: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class OrderEntity extends BaseEntity {
    private user: UserEntity;
    private account: BankAccountEntity;
    private value: number;
    private paymentDate?: Date;
    private paymentStatus?: boolean
    private description: string;
    private image?: string;


    private constructor(id: ID, user: UserEntity, value: number,
        description: string, account?: BankAccountEntity, paymentDate?: Date, paymentStatus?: boolean, image?: string, createdAt?: Date, updatedAt?: Date) {
        super(id.toString(), createdAt, updatedAt);
        this.user = user;
        this.account = account;
        this.value = value;
        this.description = description;
        this.image = image;
        this.paymentDate = paymentDate;
        this.paymentStatus = paymentStatus || false;

        this.validate();
    }

    static create(props: OrderProps): OrderEntity {
        return new OrderEntity(
            new ID(props.id),
            props.user,
            props.value,
            props.description,
            props.account,
            props.paymentDate,
            props.paymentStatus,
            props.image,
            props.createdAt,
            props.updatedAt
        );
    }

    validate(): void {
        new OrderValidation(this).validate();
    }

    getAccount(): BankAccountEntity | undefined {
        return this.account || undefined;
    }

    getDescription(): string {
        return this.description;
    }

    getUser(): UserEntity {
        return this.user;
    }

    getValue(): number {
        return this.value;
    }

    getImage(): string | undefined {
        return this.image;
    }

    getPaymentDate(): Date | undefined {
        return this.paymentDate;
    }

    getPaymentStatus(): boolean | undefined {
        return this
            .paymentStatus;
    }

    payOrder(account: BankAccountEntity, valuePay: number): void {
        if (this.paymentStatus) {
            throw new DomainException([DomainError.create('Order already paid', 'paymentStatus')], 'Payment error');
        }

        if (this.value !== valuePay) {
            throw new DomainException([DomainError.create('Incorrect payment value - Not allowed partial payment or overpayment', 'value')], 'Payment error');
        }

        if (account.getBalance() < valuePay) {
            throw new DomainException([DomainError.create('Insufficient balance', 'balance')], 'Payment error');
        }

        this.paymentDate = new Date();
        this.paymentStatus = true;
        this.account = account;
        this.account.withdraw(this.value);
    }

    setImage(location: string) {
        this.image = location;
    }
}