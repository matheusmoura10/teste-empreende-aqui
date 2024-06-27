import DomainError from "../exceptions/domain.error";

export default abstract class AbstractValidation {
    abstract validate(): void;
    abstract getErrors(): DomainError[];
}