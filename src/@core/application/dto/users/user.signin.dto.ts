import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class UserSigninDto {

    @IsEmail({}, { message: 'Invalid email' })
    @ApiProperty({ example: 'example@gmail.com' })
    public readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 255, { message: 'Password must be between 6 and 255 characters' })
    @ApiProperty({ example: 'password', minLength: 6, maxLength: 255 })
    public readonly password: string;
}