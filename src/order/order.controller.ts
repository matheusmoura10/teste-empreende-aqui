import { Body, ConflictException, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import OrderCreateDto from '@core/application/dto/order/order.create.dto';
import OrderEntity from '@core/domain/order/order.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import OrderPayDto from '@core/application/dto/order/order.pay.dto';
import OrderReportDto from '@core/application/dto/order/order.report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('Orders')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(@Body() orderCreateDto: OrderCreateDto): Promise<OrderEntity> {
        return await this.orderService.create(orderCreateDto);
    }

    @Post('pay')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 1024 * 1024 * 1, // 1MB
            files: 1,
        },
    }))
    @ApiOperation({ summary: 'Pay an order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async pay(@UploadedFile() file, @Body() orderPay: OrderPayDto,) {
        orderPay.file = file;
        orderPay.value = Number(orderPay.value);

        return await this.orderService.pay(orderPay);
    }

    @Post('/report')
    @ApiOperation({ summary: 'Report an orders' })
    @ApiResponse({ status: 201, description: 'Order reported successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async report(@Body() reportDto: OrderReportDto): Promise<any> {
        return await this.orderService.report(reportDto);
    }
}
