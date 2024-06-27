import DomainError from "../exceptions/domain.error";
import DomainException from "../exceptions/domain.exception";

export abstract class BaseEntity {
  protected id: string;
  protected createdAt: Date = new Date();
  protected updatedAt: Date = new Date();

  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    if (!id) {
      const error: DomainError = DomainError.create('ID is required', 'id');
      throw new DomainException([error], 'BaseEntity validation error');
    }
    this.id = id;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getId(): string {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  abstract validate(): void;

  toArray(): Record<string, unknown> {
    return Object.getOwnPropertyNames(this)
      .filter((property) => property !== 'constructor')
      .reduce(
        (obj, property) => {
          const value = this[property];

          if (value instanceof BaseEntity) {
            obj[this.transformPropertyName(property)] = value.toArray();
          } else {
            obj[this.transformPropertyName(property)] = value;
          }
          return obj;
        },
        {} as Record<string, unknown>,
      );
  }

  private transformPropertyName(property: string): string {
    return property
      .replace(/([A-Z])/g, '_$1')
      .replace(/^get_/, '')
      .replace(/^_/, '')
      .toLowerCase();
  }
}
