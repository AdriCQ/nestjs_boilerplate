import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService, User, CreateUserInput } from '@modules/users';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { ConfigService } from '@common/config';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth.response';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private _usersService: UsersService,
        private _jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    /**
     * login
     * @param credentials
     * @returns
     */
    async login(credentials: LoginInput): Promise<AuthResponse> {
        const user = await this._usersService.findOne(
            {
                email: credentials.email,
            },
            true,
        );
        if (!user) throw new BadRequestException('Email no existe');

        const isValid = await user.validatePassword(credentials.password);
        if (!isValid)
            throw new UnauthorizedException('Credenciales incorrectas');
        return this.authResponse(user);
    }
    /**
     * register
     * @param params
     * @returns
     */
    async register(params: CreateUserInput) {
        const exists = await this._usersService.findOne({
            email: params.email,
        });
        if (exists)
            throw new BadRequestException('El email ya esta registrado');
        const user = await this._usersService.create(params);
        return this.authResponse(user);
    }
    /**
     * validateUserByPassword
     * @param credentials
     * @returns
     */
    async validateUserByPassword(
        credentials: LoginInput,
    ): Promise<AuthResponse | undefined> {
        const user = await this._usersService.findOne({
            email: credentials.email,
        });

        return user && (await user.validatePassword(credentials.password))
            ? this.authResponse(user)
            : undefined;
    }

    /**
     * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
     *
     * @param {JwtPayload} payload
     * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
     * @memberof {(AuthService JwtStrategy)}
     */
    async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
        // This will be used when the user has already logged in and has a JWT
        const user = await this._usersService.findOne({ email: payload.email });
        return user ? user : undefined;
    }
    /**
     * authResponse
     * @param user
     * @returns
     */
    private authResponse(user: User): AuthResponse {
        const data: JwtPayload = {
            email: user.email,
            id: user.id,
        };
        const jwt = this._jwtService.sign(data);
        user.password = undefined;
        return {
            user,
            token: jwt,
        };
    }
}
