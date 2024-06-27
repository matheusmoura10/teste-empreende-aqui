export default class UserLoggedDto {
    public readonly email: string;
    public readonly name: string;
    public readonly token: string;

    constructor(email: string, name: string, token: string) {
        this.email = email;
        this.name = name;
        this.token = token;
    }
}