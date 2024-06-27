import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import OrderRepository from '@core/infra/repository/order.repository';
import BankAccountRepository from '@core/infra/repository/bank-account.repository';
import OrderServices from '@core/application/order.service';
import { OrderService } from './order.service';
import { S3ImageStorage } from '@core/infra/s3/s3.storage';
import { ImageService, ImageStorage } from '@core/domain/@shared/services/image.storage';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forFeature([
      BankAccountRepository,
      OrderRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: BankAccountRepository,
      useFactory: (dataSource: any) => new BankAccountRepository(dataSource),
      inject: [getDataSourceToken()],
    },
    {
      provide: OrderRepository,
      useFactory: (dataSource: any) => new OrderRepository(dataSource),
      inject: [getDataSourceToken()],
    },
    {
      provide: OrderServices,
      useFactory: (
        bankAccountRepository: BankAccountRepository,
        orderRepository: OrderRepository,
        imageService: ImageService
      ) => new OrderServices(orderRepository, bankAccountRepository, imageService),
      inject: [BankAccountRepository, OrderRepository, ImageService],
    },
    {
      provide: 'ImageStorage',
      useClass: S3ImageStorage,
    },
    {
      provide: ImageService,
      useFactory: (storage: ImageStorage) => new ImageService(storage),
      inject: ['ImageStorage'],
    },
    OrderService,
  ],
})
export class OrderModule { }