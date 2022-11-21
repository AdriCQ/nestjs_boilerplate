import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
    /**
     * name
     */
    @Field(() => String, { description: 'User Name' })
    @ApiProperty()
    @IsString()
    name: string;
    /**
     * email
     */
    @Field(() => String, { description: 'User email' })
    @ApiProperty()
    @IsEmail()
    email: string;
    /**
     * password
     */
    @Field(() => String, { description: 'User password' })
    @ApiProperty()
    @IsString()
    password: string;
}
