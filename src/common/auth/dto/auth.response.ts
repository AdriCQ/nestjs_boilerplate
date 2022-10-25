import { User } from '@/modules/users';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
    @Field(() => User)
    user: User;

    @Field(() => String)
    token: string;
}
