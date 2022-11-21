import { User } from '@/common/users';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

@ObjectType()
export class AuthResponse {
    @ApiProperty()
    @Field(() => User)
    @Type(() => User)
    user: User;

    @ApiProperty()
    @Field(() => String)
    @IsString()
    token: string;
}
