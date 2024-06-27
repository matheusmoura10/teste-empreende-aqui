import { ValueObject } from "../value.object";

export class TestValueObject extends ValueObject<any> {
    constructor(value: any) {
        super(value);
    }
}

describe('ValueObject', () => {
    test('should throw error when value is null or undefined', () => {
        expect(() => new TestValueObject(null)).toThrow('Value cannot be null or undefined');
        expect(() => new TestValueObject(undefined)).toThrow('Value cannot be null or undefined');
    });

    test('should create a value object with a valid value', () => {
        const value = { key: 'value' };
        const vo = new TestValueObject(value);
        expect(vo.value).toEqual(value);
    });

    test('should freeze the value to make it immutable', () => {
        const value = { key: 'value' };
        const vo = new TestValueObject(value);

        expect(Object.isFrozen(vo.value)).toBe(true);
    });

    test('equals should return true for identical value objects', () => {
        const value = { key: 'value' };
        const vo1 = new TestValueObject(value);
        const vo2 = new TestValueObject(value);

        expect(vo1.equals(vo2)).toBe(true);
    });

    test('equals should return false for different value objects', () => {
        const value1 = { key: 'value1' };
        const value2 = { key: 'value2' };
        const vo1 = new TestValueObject(value1);
        const vo2 = new TestValueObject(value2);

        expect(vo1.equals(vo2)).toBe(false);
    });

    test('equals should return false when comparing with null or undefined', () => {
        const value = { key: 'value' };
        const vo = new TestValueObject(value);

        expect(vo.equals(null)).toBe(false);
        expect(vo.equals(undefined)).toBe(false);
    });
});