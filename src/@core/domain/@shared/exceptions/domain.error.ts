export type DomainErrorProps = {
  message: string;
  field: string;
};

export default class DomainError {
  private errors: DomainErrorProps[] = [];
  field: any;

  constructor(errors: DomainErrorProps[]) {
    this.errors = errors;
  }

  getErrors(): DomainErrorProps[] {
    return this.errors;
  }

  getErrorByField(field: string): DomainErrorProps | undefined {
    return this.errors.find(error => error.field === field);
  }

  static create(message: string, field: string): DomainError {
    const errors = [{ message, field }];
    const retorno = new DomainError(errors);

    return retorno;
  }

  toPlainObject(): any {
    return this.errors.map(error => ({
      message: error.message,
      field: error.field
    }));
  }
}