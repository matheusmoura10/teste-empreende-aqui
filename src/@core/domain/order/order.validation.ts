import DomainError from "../@shared/exceptions/domain.error";
import AbstractValidation from "../@shared/validation/abstract.validation";
import DomainException from "../@shared/exceptions/domain.exception";
import OrderEntity from "./order.entity";

export default class OrderValidation extends AbstractValidation {

    private order: OrderEntity;
    private errors: DomainError[] = [];


    constructor(order: OrderEntity) {
        super();
        this.order = order;
    }

    getErrors(): DomainError[] {
        return this.errors;
    }

    validate(): void {


        if (!this.order.getUser()) {
            this.errors.push(DomainError.create('User is required', 'user'));
        }

        if (!this.order.getValue()) {
            this.errors.push(DomainError.create('Value is required', 'value'));
        }

        if (this.order.getValue() <= 0) {
            this.errors.push(DomainError.create('Value must be greater than 0', 'value'));
        }

        if (!this.order.getDescription()) {
            this.errors.push(DomainError.create('Description is required', 'description'));
        }

        if (this.order.getDescription().length < 3) {
            this.errors.push(DomainError.create('Description must have at least 3 characters', 'description'));
        }

        if (!this.order.getUser()) {
            this.errors.push(DomainError.create('User is required', 'user'));
        }


        if (this.errors.length > 0) {
            throw new DomainException(this.errors, 'Order validation failed');
        }
    }



}