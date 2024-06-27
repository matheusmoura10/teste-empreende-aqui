import DomainError from "../@shared/exceptions/domain.error";
import AbstractValidation from "../@shared/validation/abstract.validation";
import DomainException from "../@shared/exceptions/domain.exception";
import BankAccount from "./bank-account.entity";

export default class BankAccountValidation extends AbstractValidation {

    private account: BankAccount;
    private errors: DomainError[] = [];

    constructor(account: BankAccount) {
        super();
        this.account = account;
    }

    getErrors(): DomainError[] {
        return this.errors;
    }


    validate(): void {
        if (!this.account.getAccountType()) {
            this.errors.push(DomainError.create('Account type is required', 'accountType'));
        }

        if (!this.account.getUser()) {
            this.errors.push(DomainError.create('User is required', 'user'));
        }

        if (this.account.getBalance() < 0) {
            this.errors.push(DomainError.create('Balance cannot be negative', 'balance'));
        }

        if (this.errors.length > 0) {
            throw new DomainException(this.errors, 'Bank account validation error');

        }
    }



}