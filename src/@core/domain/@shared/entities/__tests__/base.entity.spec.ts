import DomainError from "../../exceptions/domain.error";
import DomainException from "../../exceptions/domain.exception";
import { BaseEntity } from "../base.entity";

class TestEntity extends BaseEntity {
  private child: ChildEntity;

  constructor(id: string, child: ChildEntity, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
    this.child = child;
  }

  validate(): void {
    if (!this.id) {
      const error: DomainError = DomainError.create('ID is required', 'id');
      throw new DomainException([error], 'TestEntity validation error');
    }
  }
}

class ChildEntity extends BaseEntity {
  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
  }

  validate(): void {
    if (!this.id) {
      const error: DomainError = DomainError.create('ID is required', 'id');
      throw new DomainException([error], 'BaseEntity validation error');
    }
  }
}

describe('BaseEntity', () => {
  test('should create an entity with provided id and dates', () => {
    const id = 'test-id';
    const createdAt = new Date('2024-01-01');
    const updatedAt = new Date('2024-01-02');

    const entity = new TestEntity(id, new ChildEntity('child-id'), createdAt, updatedAt);

    expect(entity.getId()).toBe(id);
    expect(entity.getCreatedAt()).toEqual(createdAt);
    expect(entity.getUpdatedAt()).toEqual(updatedAt);
  });

  test('should use current date for createdAt and updatedAt if not provided', () => {
    const id = 'test-id';
    const child = new ChildEntity('child-id');

    const entity = new TestEntity(id, child);

    expect(entity.getId()).toBe(id);
    expect(entity.getCreatedAt()).toBeInstanceOf(Date);
    expect(entity.getUpdatedAt()).toBeInstanceOf(Date);
  });

  test('toArray should return properties in snake_case', () => {
    const id = 'test-id';
    const createdAt = new Date('2024-01-01');
    const updatedAt = new Date('2024-01-02');
    const child = new ChildEntity('child-id', createdAt, updatedAt);

    const entity = new TestEntity(id, child, createdAt, updatedAt);

    const result = entity.toArray();

    expect(result).toEqual({
      id: id,
      created_at: createdAt,
      updated_at: updatedAt,
      child: {
        id: 'child-id',
        created_at: createdAt,
        updated_at: updatedAt,
      },
    });
  });

  test('toArray should handle nested BaseEntity properties', () => {
    const childId = 'child-id';
    const childCreatedAt = new Date('2024-01-03');
    const childUpdatedAt = new Date('2024-01-04');
    const child = new ChildEntity(childId, childCreatedAt, childUpdatedAt);

    const entityId = 'parent-id';
    const entityCreatedAt = new Date('2024-01-01');
    const entityUpdatedAt = new Date('2024-01-02');
    const entity = new TestEntity(entityId, child, entityCreatedAt, entityUpdatedAt);

    const result = entity.toArray();

    expect(result).toEqual({
      id: entityId,
      created_at: entityCreatedAt,
      updated_at: entityUpdatedAt,
      child: {
        id: childId,
        created_at: childCreatedAt,
        updated_at: childUpdatedAt,
      },
    });
  });

  test('validate method should throw error if id is empty', () => {
    expect(() => new TestEntity('', new ChildEntity('child-id'))).toThrow(DomainException);
  });
});
