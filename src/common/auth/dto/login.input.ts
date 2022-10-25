import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
    @Field(() => String)
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsString()
    password: string;
}
