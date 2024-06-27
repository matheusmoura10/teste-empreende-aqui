export default class RepositoryException extends Error {
    constructor(
        public readonly message: string
    ) {
        super(message);
    }
}