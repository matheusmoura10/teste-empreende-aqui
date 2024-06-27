import { DataSource, Repository } from "typeorm";
import UserEntity from "src/@core/domain/user/user.entity";
import RepositoryException from "../exceptions/repository.exception";
import BankAccountRepositoryInterface from "src/@core/domain/bank-account/bank-account.repository.interface";
import { BankAccountModel } from "../model/bank-account.model";
import BankAccountEntity from "src/@core/domain/bank-account/bank-account.entity";
import AccountType from "src/@core/domain/bank-account/account.type.enum";

export default class BankAccountRepository implements BankAccountRepositoryInterface {

    private repository: Repository<BankAccountModel>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(BankAccountModel);
    }

    private toEntity(model: BankAccountModel): BankAccountEntity {
        return BankAccountEntity.create({
            accountType: AccountType[model.account_type],
            balance: model.balance,
            user: UserEntity.create(model.user),
            id: model.id,
        })
    }


    private toModel(entity: BankAccountEntity): BankAccountModel {
        return Object.assign(new BankAccountModel(), {
            id: entity.getId(),
            account_type: entity.getAccountType(),
            balance: entity.getBalance(),
            created_at: entity.getCreatedAt(),
            updated_at: entity.getUpdatedAt(),
            user: entity.getUser(),
        });
    }

    async findByUser(userEntity: UserEntity): Promise<BankAccountEntity[]> {
        const models = await this.repository.find({
            where: {
                user: {
                    id: userEntity.getId()
                }
            },
            relations: ['user']
        })

        return models.map(model => this.toEntity(model));
    }

    async save(entity: BankAccountEntity): Promise<void> {
        try {
            const model = this.toModel(entity);
            await this.repository.save(model); // save() handles both insert and update
        } catch (error) {
            throw new RepositoryException('Error saving user')
        }
    }
    update(entity: BankAccountEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(entity: BankAccountEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<BankAccountEntity | null> {
        try {
            const model = await this.repository.findOne({
                where: { id },
                relations: ['user']
            });

            return model ? this.toEntity(model) : null;
        } catch (error) {
            throw new RepositoryException('Error finding user')
        }
    }
    findAll(): Promise<BankAccountEntity[]> {
        throw new Error("Method not implemented.");
    }
    findBy(conditions: Partial<BankAccountEntity>): Promise<BankAccountEntity[]> {
        throw new Error("Method not implemented.");
    }



}