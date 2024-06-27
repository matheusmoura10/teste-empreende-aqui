import { isValidCPF, isValidEmail } from "@brazilian-utils/brazilian-utils";
import DomainError from "../@shared/exceptions/domain.error";
import AbstractValidation from "../@shared/validation/abstract.validation";
import UserEntity from "./user.entity";
import DomainException from "../@shared/exceptions/domain.exception";

export default class UserValidation extends AbstractValidation {

    private user: UserEntity;
    private errors: DomainError[] = [];

    constructor(user: UserEntity) {
        super();
        this.user = user;
    }

    getErrors(): DomainError[] {
        return this.errors;
    }

    validate(): void {

        if (!this.user.getName()) {
            this.errors.push(DomainError.create('Name is required', 'name'));
        }

        if (this.user.getName().length < 3) {
            this.errors.push(DomainError.create('Name must have at least 3 characters', 'name'));
        }

        if (!this.user.getEmail()) {
            this.errors.push(DomainError.create('Email is required', 'email'));
        }

        if (!isValidEmail(this.user.getEmail())) {
            this.errors.push(DomainError.create('Invalid email', 'email'));
        }

        if (!this.user.getPassword()) {
            this.errors.push(DomainError.create('Password is required', 'password'));
        }

        if (this.user.getPassword().length < 6) {
            this.errors.push(DomainError.create('Password must have at least 6 characters', 'password'));
        }



        if (!this.user.getCpf()) {
            this.errors.push(DomainError.create('CPF is required', 'cpf'));
        }

        if (!isValidCPF(this.user.getCpf().toString())) {
            this.errors.push(DomainError.create('Invalid CPF', 'cpf'));
        }

        if (this.errors.length > 0) {
            throw new DomainException(this.errors, 'User validation error');
        }
    }
}

