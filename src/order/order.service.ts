import OrderCreateDto from '@core/application/dto/order/order.create.dto';
import OrderPayDto from '@core/application/dto/order/order.pay.dto';
import OrderReportDto from '@core/application/dto/order/order.report.dto';
import OrderServices from '@core/application/order.service';
import OrderEntity from '@core/domain/order/order.entity';
import UserEntity from '@core/domain/user/user.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class OrderService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly orderServices: OrderServices,
    ) { }

    async create(orderCreateDto: OrderCreateDto): Promise<OrderEntity> {
        const userEntity = UserEntity.create(this.request['user']);
        return await this.orderServices.create(orderCreateDto, userEntity);
    }
    async pay(orderPay: OrderPayDto): Promise<OrderEntity | PromiseLike<OrderEntity>> {
        return await this.orderServices.pay(orderPay);
    }

    report(reportDto: OrderReportDto): any {
        const userEntity = UserEntity.create(this.request['user']);
        return this.orderServices.report(reportDto, userEntity);
    }
}
