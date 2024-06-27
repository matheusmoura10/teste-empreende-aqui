import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min, Length, IsString } from "class-validator";

export default class OrderCreateDto {

    @IsNotEmpty({ message: 'Value is required' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Value must be a number' })
    @Min(1, { message: 'Value must be greater than 0' })
    @ApiProperty({ minimum: 1, example: 1 })
    value: number;

    @IsNotEmpty({ message: 'Description is required' })
    @Length(3, 255, { message: 'Description must be between 3 and 255 characters' })
    @IsString({ message: 'Description must be a string' })
    @ApiProperty({ minLength: 3, maxLength: 255, example: 'Order description' })
    description: string;
}