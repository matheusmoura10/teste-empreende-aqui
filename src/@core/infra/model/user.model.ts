import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BankAccountModel } from './bank-account.model';

@Entity('users')
export class UserModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthdate: Date;

    @Column()
    cpf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => BankAccountModel, bankAccount => bankAccount.user)
    bankAccounts: BankAccountModel[];
}
