import UserCreateDto from '@core/application/dto/users/user.create.dto';
import UserLoggedDto from '@core/application/dto/users/user.logged.dto';
import UserSigninDto from '@core/application/dto/users/user.signin.dto';
import UserService from '@core/application/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        private readonly service: UserService,
    ) { }

    async signup(dto: UserCreateDto): Promise<UserLoggedDto> {
        return await this.service.signup(dto);
    }

    async signin(dto: UserSigninDto): Promise<UserLoggedDto> {

        const user: UserLoggedDto = await this.service.signin(dto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;

    }
}


