import { BaseEntity } from "../@shared/entities/base.entity";
import ID from "../@shared/vo/id.vo";
import CPFVO from "../@shared/vo/cpf.vo";
import UserValidation from "./user.validation";

export type UserProps = {
    id?: string;
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    cpf: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class UserEntity extends BaseEntity {

    private name: string;
    private email: string;
    private password: string;
    private birthdate: Date;
    private cpf: CPFVO;

    private constructor(
        id: ID,
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        cpf: CPFVO,
        createAt?: Date,
        updatedAt?: Date,
    ) {
        super(id.toString(), createAt, updatedAt);
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.cpf = new CPFVO(cpf.toString());

        this.validate();
    }


    static create(props: UserProps): UserEntity {
        return new UserEntity(
            new ID(props.id),
            props.name,
            props.email,
            props.password,
            props.birthdate,
            new CPFVO(props.cpf),
            props.createdAt,
            props.updatedAt,
        );
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getBirthdate(): Date {
        return this.birthdate;
    }

    public getCpf(): string {
        return this.cpf.format();
    }

    validate(): void {
        new UserValidation(this).validate();
    }

    update({ name, email, password, birthdate, cpf }: Partial<UserProps>): void {
        if (name !== undefined) this.name = name;
        if (email !== undefined) this.email = email;
        if (password !== undefined) this.password = password;
        if (birthdate !== undefined) this.birthdate = birthdate;
        if (cpf !== undefined) this.cpf = new CPFVO(cpf);

        this.validate();
    }

    comparePassword(pass: string) {
        return this.password === pass;
    }
}
