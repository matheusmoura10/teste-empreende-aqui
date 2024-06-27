import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserCreateDto from '@core/application/dto/users/user.create.dto';
import UserSigninDto from '@core/application/dto/users/user.signin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async create(@Body() user: UserCreateDto) {
        return await this.authService.signup(user);
    }

    @Post('signin')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async signin(@Body() user: UserSigninDto) {
        return await this.authService.signin(user);
    }
}