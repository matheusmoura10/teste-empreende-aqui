import { DataSource, Repository } from "typeorm";
import UserEntity from "@core/domain/user/user.entity";
import OrderRepositoryInterface from "@core/domain/order/order.repository.interface";
import { OrderModel } from "../model/order.model";
import OrderEntity from "@core/domain/order/order.entity";
import RepositoryException from "../exceptions/repository.exception";
import BankAccountEntity from "@core/domain/bank-account/bank-account.entity";
import AccountType from "@core/domain/bank-account/account.type.enum";
import OrderReportDto from "@core/application/dto/order/order.report.dto";

export default class OrderRepository implements OrderRepositoryInterface {

    private repository: Repository<OrderModel>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(OrderModel);
    }

    private toEntity(model: OrderModel): any {
        return OrderEntity.create({
            id: model.id,
            description: model.description,
            value: model.value,
            user: UserEntity.create(model.user),
            account: model.account ? BankAccountEntity.create({
                id: model.account.id,
                user: UserEntity.create(model.user),
                accountType: AccountType[model.account.account_type],
                balance: model.account.balance,
                createdAt: model.account.created_at,
                updatedAt: model.account.updated_at,
            }) : null,
            image: model.image,
            paymentDate: model.payment_date,
            paymentStatus: model.payment_status,
            createdAt: model.created_at,
            updatedAt: model.updated_at,
        })

    }

    private toModel(entity: OrderEntity): OrderModel {
        return Object.assign(new OrderModel(), {
            id: entity.getId(),
            value: entity.getValue(),
            description: entity.getDescription(),
            user: entity.getUser(),
            account: entity.getAccount(),
            image: entity.getImage(),
            payment_date: entity.getPaymentDate(),
            payment_status: entity.getPaymentStatus(),
            created_at: entity.getCreatedAt(),
            updated_at: entity.getUpdatedAt(),
        });
    }


    async save(entity: OrderEntity): Promise<void> {
        try {
            const model = this.toModel(entity);
            await this.repository.save(model);
        } catch (error) {
            throw new RepositoryException('Error saving user')
        }
    }
    update(entity: OrderEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(entity: OrderEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<OrderEntity | null> {
        try {
            const model = await this.repository.findOne({
                where: { id },
                relations: ['user']
            });
            return model ? this.toEntity(model) : null;
        } catch (error) {
            throw new RepositoryException('Error finding user by id')
        }
    }
    findAll(): Promise<OrderEntity[]> {
        throw new Error("Method not implemented.");
    }
    findBy(conditions: Partial<OrderEntity>): Promise<OrderEntity[]> {
        throw new Error("Method not implemented.");
    }

    async report(reportDto: OrderReportDto, userEntity: UserEntity): Promise<[]> {

        const sql = `
            WITH orders_cte AS (
                SELECT * FROM orders
                WHERE user_id = '${userEntity.getId()}'
            ),
            orders_with_pay AS (
                SELECT * FROM orders_cte
                WHERE payment_date BETWEEN '${reportDto.initialDate}' AND '${reportDto.finalDate}'
            ),
            orders_withou_pay AS (
                SELECT * FROM orders_cte
                WHERE payment_date IS NULL
                and created_at BETWEEN '${reportDto.initialDate}' AND '${reportDto.finalDate}'
            ),
            union_orders AS (
                SELECT * FROM orders_with_pay
                UNION
                SELECT * FROM orders_withou_pay
            ),
            total_pay AS (
                SELECT sum(value) as total FROM orders_with_pay
            ),
            total_open AS (
                SELECT sum(value) as total_open FROM orders_withou_pay
            ),
            result_with_total AS (
                SELECT * FROM union_orders, total_pay, total_open
            ),
            result_with_account AS (
                select rwt.*, ba.balance from result_with_total as rwt
                left join bank_accounts as ba on rwt.account_id = ba.id
            )
            SELECT * FROM result_with_account
        `;

        return await this.repository.query(sql);
    }


}