import ID from '../id.vo';

describe('ID', () => {
    it('should create a valid ID instance with a UUID', () => {
        const id = new ID();
        expect(id.toString()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should create a valid ID instance with a provided UUID', () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000';
        const id = new ID(uuid);
        expect(id.toString()).toBe(uuid);
    });

    it('should throw an error for an invalid UUID format', () => {
        const invalidUuid = 'invalid-uuid';
        expect(() => new ID(invalidUuid)).toThrow(Error);
    });
});