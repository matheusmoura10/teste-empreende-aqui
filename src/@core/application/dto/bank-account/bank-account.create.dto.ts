import AccountType from "src/@core/domain/bank-account/account.type.enum";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class BankAccountCreateDto {

    @IsNotEmpty({ message: 'Please inform the account holder name' })
    @IsString({ message: 'Account holder name must be a string' })
    @IsEnum([AccountType.CONTA_CORRENTE, AccountType.CONTA_POUPANCA], { message: 'Account type must be CONTA_CORRENTE or CONTA_POUPANCA' })
    @ApiProperty({ example: 'CONTA_CORRENTE' })
    public accountType: string;

    @IsNotEmpty({ message: 'Please inform the account holder name' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Balance must be a number' })
    @Min(0.01, { message: 'Balance must be greater than 0' })
    @ApiProperty({ minimum: 0.01, example: 1 })
    public balance: number;
}