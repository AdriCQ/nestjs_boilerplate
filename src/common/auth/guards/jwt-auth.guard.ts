import {
    Injectable,
    ExecutionContext,
    // CanActivate,
    // UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
// import { User } from '@/modules/users';
// import { Observable } from 'rxjs';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request;
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw (
                err ||
                new AuthenticationError('Could not authenticate with token')
            );
        }
        return user;
    }
}
/**
 * JwtAuthGuard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

/**
 * AuthVerifiedGuard
 */
// @Injectable()
// export class AuthVerifiedGuard implements CanActivate {
/**
 * Determines whether activate can
 * @param context
 * @returns activate
 */
// canActivate(
//     context: ExecutionContext,
// ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();
//     if (req.user && (req.user as User).emailVerifiedAt) return true;
//     else {
//         throw new UnauthorizedException();
//     }
// }
// }
