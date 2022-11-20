import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '@modules/users';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@common/config';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.APP_SECRET,
            signOptions: {
                expiresIn: '600s',
            },
        }),
        ConfigModule,
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
