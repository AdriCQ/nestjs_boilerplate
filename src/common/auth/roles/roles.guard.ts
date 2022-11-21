import { ROLE } from './roles.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';

export const RolesGuard = (role: ROLE): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            return user?.roles.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
};
