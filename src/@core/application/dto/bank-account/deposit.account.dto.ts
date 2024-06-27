import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export default class DepositAccountDto {
    @IsNotEmpty({ message: 'Amount is required' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Amount must be a number' })
    @Min(1, { message: 'Amount must be greater than 0' })
    @ApiProperty({ minimum: 1, example: 1 })
    amount: number;

    @IsNotEmpty({ message: 'Account id is required' })
    @IsString({ message: 'Account id must be a string' })
    @ApiProperty({ example: 'account_id' })
    accountId: string;
}