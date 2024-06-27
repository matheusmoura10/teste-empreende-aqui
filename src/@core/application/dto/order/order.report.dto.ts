
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export default class OrderReportDto {

    @IsDate({ message: 'Initial date must be a date' })
    @Transform(({ value }) => {
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date;
    })
    @ApiProperty({ example: '2021-01-01' })
    public initialDate: Date;


    @IsDate({ message: 'Final date must be a date' })
    @Transform(({ value }) => {
        const date = new Date(value);
        date.setHours(23, 59, 59, 999);
        return date;
    })
    @ApiProperty({ example: '2021-01-01' })
    public finalDate: Date;

    @IsString({ message: 'Account id must be a string' })
    @IsNotEmpty({ message: 'Account id is required' })
    @ApiProperty({ example: 'account_id' })
    public accountId: string;



}