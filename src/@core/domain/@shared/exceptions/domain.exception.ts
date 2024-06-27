import DomainError from "./domain.error";

export default class DomainException extends Error {
  public readonly errors: DomainError[];

  constructor(
    errors: DomainError[],
    public message: string
  ) {
    super(message);
    this.errors = errors;
  }


}
