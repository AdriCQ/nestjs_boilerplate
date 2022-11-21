import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
    @Field(() => String)
    @IsEmail()
    @ApiProperty()
    email: string;

    @Field(() => String)
    @IsString()
    @ApiProperty()
    password: string;
}
