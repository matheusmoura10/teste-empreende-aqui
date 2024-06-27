import UserRepositoryInterface from "@core/domain/user/user.repository.interface";
import UserCreateDto from "./dto/users/user.create.dto";
import UserEntity from "@core/domain/user/user.entity";
import UserSigninDto from "./dto/users/user.signin.dto";
import { UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import UserLoggedDto from "./dto/users/user.logged.dto";

export default class UserService {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private jwtService: JwtService,
    ) { }

    async signup(dto: UserCreateDto): Promise<UserLoggedDto> {
        const userExists = await this.userRepository.findByEmail(dto.email);

        if (userExists) {
            throw new ConflictException('User already exists');
        }

        const userEntity = UserEntity.create(dto);
        await this.userRepository.save(userEntity);

        const token = await this.generateToken(userEntity);

        return new UserLoggedDto(userEntity.getEmail(), userEntity.getName(), token);
    }

    async signin(dto: UserSigninDto): Promise<UserLoggedDto> {
        const userEntity = await this.userRepository.findByEmail(dto.email);

        if (!userEntity || !userEntity.comparePassword(dto.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const token = await this.generateToken(userEntity);

        return new UserLoggedDto(userEntity.getEmail(), userEntity.getName(), token);
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async generateToken(user: UserEntity): Promise<string> {
        return this.jwtService.sign({
            ...user,
            id: user.getId(),
            cpf: user.getCpf(),
        }, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d',
        });
    }
}