import DomainError from "../exceptions/domain.error";
import DomainException from "../exceptions/domain.exception";
import { ValueObject } from "./value.object";
import { isValidCPF } from '@brazilian-utils/brazilian-utils';


export default class CPFVO extends ValueObject<string> {

    constructor(cpf: string) {
        super(CPFVO.normalize(cpf));
        this.validate();
    }

    validate(): void {
        let errors: DomainError[] = [];

        if (!CPFVO.isValid(this.value)) {
            errors.push(DomainError.create('Invalid CPF', 'cpf'));
        }

        if (errors.length > 0) {
            throw new DomainException(errors, 'CPF validation error');
        }
    }

    private static normalize(cpf: string): string {
        return cpf.valueOf().replace(/[^0-9]/g, '');
    }

    private static isValid(cpf: string): boolean {
        return isValidCPF(cpf);
    }

    format(): string {
        return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    unformat(): string {
        return this.value;
    }

    toString(): string {
        return this.unformat();
    }
}