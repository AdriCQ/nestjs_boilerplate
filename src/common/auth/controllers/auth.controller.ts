import { CreateUserInput, User } from '@/common/users';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// Local
import { AuthService } from '../auth.service';
import { AuthResponse } from '../dto/auth.response';
import { LoginInput } from '../dto/login.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../guards/jwt-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    /**
     * Creates an instance of auth controller.
     */
    constructor(private readonly _authService: AuthService) {}
    /**
     * Signins auth controller
     * @param _body
     * @returns signin
     */
    @Post('login')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Login User',
        type: () => AuthResponse,
    })
    async login(@Body() _body: LoginInput): Promise<AuthResponse> {
        return this._authService.login({
            email: _body.email,
            password: _body.password,
        });
    }
    /**
     * Signups auth controller
     * @param _body
     * @returns signup
     */
    @Post('register')
    @ApiResponse({
        status: 201,
        description: 'Register User',
        type: () => AuthResponse,
    })
    async register(@Body() _body: CreateUserInput): Promise<AuthResponse> {
        return this._authService.register(_body);
    }

    /**
     * Profiles auth controller
     * @param user
     * @returns
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: () => User })
    profile(@CurrentUser() user) {
        return user;
    }
}
