import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BankAccountModel } from './bank-account.model';
import { UserModel } from './user.model';

@Entity('orders')
export class OrderModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserModel, user => user.bankAccounts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserModel;

    @ManyToOne(() => BankAccountModel, bankAccount => bankAccount.user)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
    account: BankAccountModel;

    @Column({
        type: 'decimal', precision: 10, scale: 2, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    value: number;

    @Column({ type: 'date', nullable: true })
    payment_date: Date;

    @Column({ type: 'boolean', default: false })
    payment_status: boolean;

    @Column()
    description: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
