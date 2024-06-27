import RepositoryInterface from "../@shared/repository/repository.interface";
import UserEntity from "../user/user.entity";
import BankAccountEntity from "./bank-account.entity";

export default interface BankAccountRepositoryInterface extends RepositoryInterface<BankAccountEntity> {
    findByUser(userEntity: UserEntity): BankAccountEntity[] | PromiseLike<BankAccountEntity[]>;
}