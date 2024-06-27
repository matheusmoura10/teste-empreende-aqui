import { UserModel } from "@core/infra/model/user.model";
import RepositoryInterface from "../@shared/repository/repository.interface";
import UserEntity from "./user.entity";

export default interface UserRepositoryInterface extends RepositoryInterface<UserEntity> {
    findByEmail(email: string): UserEntity | PromiseLike<UserEntity>;
}