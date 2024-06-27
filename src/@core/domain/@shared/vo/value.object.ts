export abstract class ValueObject<T> {
    protected readonly _value: T;

    constructor(value: T) {
        if (value === null || value === undefined) {
            throw new Error('Value cannot be null or undefined');
        }
        this._value = Object.freeze(value); // Ensure immutability
    }

    equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        return JSON.stringify(this._value) === JSON.stringify(vo._value);
    }

    get value(): T {
        return this._value;
    }
}