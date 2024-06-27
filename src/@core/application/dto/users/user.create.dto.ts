import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { fakerBr } from '@js-brasil/fakerbr';

export default class UserCreateDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
    @ApiProperty({ minLength: 3, maxLength: 255, example: 'User name' })
    public name: string;

    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    @ApiProperty({ example: 'example@gmail.com' })
    public email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 255, { message: 'Password must be between 6 and 255 characters' })
    @ApiProperty({ example: 'password' })
    public password: string;

    @IsDate({ message: 'Birthdate must be a date' })
    @Transform(({ value }) => new Date(value))
    @ApiProperty({ example: '2021-01-01' })
    public birthdate: Date;

    @IsString({ message: 'CPF must be a string' })
    @IsNotEmpty({ message: 'CPF is required' })
    @Length(11, 11, { message: 'CPF must be 11 characters' })
    @ApiProperty({ example: fakerBr.cpf().replace(/\D/g, '') })
    public cpf: string;
}