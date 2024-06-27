import Image from "@core/domain/@shared/entities/image";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export default class OrderPayDto {

    @IsNotEmpty({ message: 'Value is required' })
    @Transform(({ value }) => Number(value))
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    }, {
        message: 'Value must be a number',
    })
    @Min(0.01, { message: 'Value must be greater than 0' })
    @ApiProperty({ minimum: 0.01, example: 1 })
    value: number;

    @IsNotEmpty({ message: 'Account id is required' })
    @IsString({ message: 'Account id must be a string' })
    @ApiProperty({ example: 'account_id' })
    accountId: string;

    @IsNotEmpty({ message: 'Order id is required' })
    @IsString({ message: 'Order id must be a string' })
    @ApiProperty({ example: 'order_id' })
    orderId: string;


    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file: Image
}