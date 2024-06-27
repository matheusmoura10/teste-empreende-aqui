
import OrderRepositoryInterface from "@core/domain/order/order.repository.interface";
import OrderCreateDto from "./dto/order/order.create.dto";
import OrderEntity from "@core/domain/order/order.entity";
import UserEntity from "@core/domain/user/user.entity";
import OrderPayDto from "./dto/order/order.pay.dto";
import { NotFoundException } from "@nestjs/common";
import OrderReportDto from "./dto/order/order.report.dto";
import { PaymentSummary } from "./dto/order/order.summary.dto";
import BankAccountRepositoryInterface from "@core/domain/bank-account/bank-account.repository.interface";
import { ImageService } from "@core/domain/@shared/services/image.storage";
import { S3ImageStorage } from "@core/infra/s3/s3.storage";

export default class OrderServices {

    constructor(
        private orderRepository: OrderRepositoryInterface,
        private bankAccountRepository: BankAccountRepositoryInterface,
        private imageService: ImageService,
    ) { }


    async create(orderCreateDto: OrderCreateDto, userEntity: UserEntity): Promise<OrderEntity> {
        const orderEntity: OrderEntity = OrderEntity.create({
            value: orderCreateDto.value,
            description: orderCreateDto.description,
            user: userEntity,
        });

        await this.orderRepository.save(orderEntity);

        return await this.orderRepository.findById(orderEntity.getId());
    }

    async pay(orderPay: OrderPayDto): Promise<OrderEntity> {
        const orderEntity: OrderEntity = await this.orderRepository.findById(orderPay.orderId);

        if (!orderEntity) {
            throw new NotFoundException('Order not found');
        }

        const accountEntity = await this.bankAccountRepository.findById(orderPay.accountId);

        if (!accountEntity) {
            throw new NotFoundException('Account not found');
        }

        orderEntity.payOrder(accountEntity, orderPay.value);

        const location = await this.imageService.uploadImage(orderPay.file, 'teste-empreende-aqui-s3');
        orderEntity.setImage(location);
        await this.orderRepository.save(orderEntity);
        await this.bankAccountRepository.save(accountEntity);

        return orderEntity;
    }

    async report(reportDto: OrderReportDto, userEntity: UserEntity): Promise<PaymentSummary> {
        const result = await this.orderRepository.report(reportDto, userEntity);
        const account = await this.bankAccountRepository.findById(reportDto.accountId);

        if (!account) {
            throw new NotFoundException('Account not found');
        }

        if (result.length === 0) {
            return {
                payments: [],
                total_pay: 0,
                total_open: 0,
                bank_account_balance: account.getBalance()
            }
        }

        return {
            payments: result.map((payment) => {
                return {
                    id: payment.id,
                    description: payment.description,
                    amount: payment.value,
                    payment_status: payment.payment_status ? 'paid' : 'pending',
                    payment_date: payment.payment_date,
                } as any;
            }),
            total_pay: Number(result[0].total) || 0,
            total_open: Number(result[0].total_open) || 0,
            bank_account_balance: result[0].balance || 0
        }

    }


}