import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from './user.model';

@Entity('bank_accounts')
export class BankAccountModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    account_type: string;

    @Column({
        type: 'decimal', precision: 10, scale: 2, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    balance: number;

    @ManyToOne(() => UserModel, user => user.bankAccounts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserModel;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
