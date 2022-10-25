import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthResponse } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { CreateUserInput } from '@modules/users';

@Resolver('Auth')
export class AuthResolver {
    /**
     * constructor
     * @param _authService
     */
    constructor(private readonly _authService: AuthService) {}
    /**
     * login
     * @param credentials
     * @returns
     */
    @Mutation(() => AuthResponse, { name: 'authLogin' })
    async login(
        @Args('credentials') credentials: LoginInput,
    ): Promise<AuthResponse> {
        return this._authService.login(credentials);
    }
    /**
     * register
     * @param userData
     * @returns
     */
    @Mutation(() => AuthResponse, { name: 'authRegister' })
    async register(@Args('userData') userData: CreateUserInput) {
        return this._authService.register(userData);
    }
}
