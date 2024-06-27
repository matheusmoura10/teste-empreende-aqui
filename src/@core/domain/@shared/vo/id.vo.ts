
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from './value.object';

export default class ID extends ValueObject<string> {
    constructor(value?: string) {
        if (!value) {
            value = uuidv4();
        }
        if (!uuidValidate(value)) {
            throw new Error('Invalid UUID format');
        }
        super(value);
    }

    toString(): string {
        return this.value;
    }
}