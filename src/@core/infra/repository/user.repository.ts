import UserRepositoryInterface from "@core/domain/user/user.repository.interface";
import { UserModel } from "../model/user.model";
import { DataSource, Repository } from "typeorm";
import UserEntity from "@core/domain/user/user.entity";
import RepositoryException from "../exceptions/repository.exception";

export default class UserRepository implements UserRepositoryInterface {

    private repository: Repository<UserModel>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(UserModel);
    }

    private toEntity(model: UserModel): UserEntity {
        return UserEntity.create({
            id: model.id,
            name: model.name,
            email: model.email,
            password: model.password,
            birthdate: model.birthdate,
            cpf: model.cpf
        });
    }

    private toModel(entity: UserEntity): UserModel {
        return Object.assign(new UserModel(), {
            id: entity.getId(),
            name: entity.getName(),
            email: entity.getEmail(),
            password: entity.getPassword(),
            birthdate: entity.getBirthdate(),
            cpf: entity.getCpf()
        });
    }

    async save(entity: UserEntity): Promise<void> {
        try {
            const model = this.toModel(entity);
            await this.repository.save(model); // save() handles both insert and update
        } catch (error) {
            throw new RepositoryException('Error saving user')
        }
    }

    async update(entity: UserEntity): Promise<void> {
        try {
            await this.repository.update(entity.getId(), this.toModel(entity));
        } catch (error) {
            throw new RepositoryException('Error updating user')
        }
    }

    async delete(entity: UserEntity): Promise<void> {
        try {
            await this.repository.delete(entity.getId());
        } catch (error) {
            throw new RepositoryException('Error deleting user')
        }
    }

    async findById(id: string): Promise<UserEntity | null> {
        try {
            const model = await this.repository.findOneBy({ id });
            return model ? this.toEntity(model) : null;
        } catch (error) {
            throw new RepositoryException('Error finding user by id')
        }
    }

    async findAll(): Promise<UserEntity[]> {
        try {
            const models = await this.repository.find();
            return models.map(this.toEntity);
        } catch (error) {
            throw new RepositoryException('Error finding all users')
        }
    }

    async findBy(conditions: Partial<UserEntity>): Promise<UserEntity[]> {
        try {
            const where = Object.entries(conditions).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Partial<UserModel>);

            const results = await this.repository.find({ where });
            return results.map(this.toEntity);
        } catch (error) {
            throw new RepositoryException('Error finding users by conditions')
        }
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const model = await this.repository.findOneBy({
            email
        });

        return model ? this.toEntity(model) : null;
    }

}