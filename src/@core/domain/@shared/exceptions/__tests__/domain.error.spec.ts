import DomainError from "../domain.error";

describe('DomainError', () => {
  test('should create a DomainError instance with provided errors', () => {
    const errors = [
      { message: 'Field is required', field: 'username' },
      { message: 'Invalid email', field: 'email' },
    ];

    const domainError = new DomainError(errors);
    expect(domainError.getErrors()).toEqual(errors);
  });

  test('getErrors should return all errors', () => {
    const errors = [
      { message: 'Field is required', field: 'username' },
      { message: 'Invalid email', field: 'email' },
    ];

    const domainError = new DomainError(errors);
    expect(domainError.getErrors()).toEqual(errors);
  });

  test('getErrorByField should return the error for a specific field', () => {
    const errors = [
      { message: 'Field is required', field: 'username' },
      { message: 'Invalid email', field: 'email' },
    ];

    const domainError = new DomainError(errors);
    const error = domainError.getErrorByField('email');
    expect(error).toEqual({ message: 'Invalid email', field: 'email' });
  });

  test('getErrorByField should return undefined if no error found for the field', () => {
    const errors = [
      { message: 'Field is required', field: 'username' },
    ];

    const domainError = new DomainError(errors);
    const error = domainError.getErrorByField('email');
    expect(error).toBeUndefined();
  });

  test('create should create a DomainError instance with a single error', () => {
    const message = 'Field is required';
    const field = 'username';

    const domainError = DomainError.create(message, field);
    expect(domainError.getErrors()).toEqual([{ message, field }]);
  });
});