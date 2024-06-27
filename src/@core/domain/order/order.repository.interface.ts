import RepositoryInterface from "../@shared/repository/repository.interface";
import OrderEntity from "./order.entity";
import OrderReportDto from "@core/application/dto/order/order.report.dto";
import UserEntity from "../user/user.entity";
import { PaymentDTO } from "@core/application/dto/order/order.summary.dto";

export default interface OrderRepositoryInterface extends RepositoryInterface<OrderEntity> {
    report(reportDto: OrderReportDto, userEntity: UserEntity): Promise<PaymentDTO[]>;
}