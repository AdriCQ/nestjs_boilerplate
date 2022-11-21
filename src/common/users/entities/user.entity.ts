import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEmail, IsString } from 'class-validator';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
} from 'typeorm';
import { hash, verify } from 'argon2';
import { CreateUserInput } from '../dto';
import { Role } from '@common/casl';
/**
 * User
 */
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    /**
     * constructor
     * @param create
     */
    constructor(create: CreateUserInput) {
        super();
        if (create) {
            const { email, name, password } = create;
            this.email = email;
            this.name = name;
            this.password = password;
        }
    }
    /**
     * id
     */
    @Field(() => ID)
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;
    /**
     * name
     */
    @Field(() => String)
    @ApiProperty()
    @IsString()
    @Column({ type: 'varchar', length: 100 })
    name: string;
    /**
     * email
     */
    @Field(() => String)
    @ApiProperty()
    @IsEmail()
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
    /**
     * Email verification
     */
    @Field(() => GraphQLISODateTime, { nullable: true })
    @ApiProperty()
    @IsDate()
    @Column({ type: 'date', nullable: true })
    email_verified_at?: Date;
    /**
     * password
     */
    @IsString()
    @Column({ type: 'varchar', length: 255, select: false })
    password: string;

    /**
     * Roles  of user
     */
    @Column({ type: 'json', default: `["CLIENT"]` })
    @IsArray()
    @ApiProperty({
        isArray: true,
        example:
            '["DEVELOPER", "ADMIN", "VENDOR", "MODERATOR", "DELIVER", "CLIENT"]',
    })
    roles: Role[];
    /**
     * Created at
     */
    @Field(() => GraphQLISODateTime, { nullable: true })
    @ApiProperty()
    @CreateDateColumn()
    created_at: Date;
    /**
     * updated at
     */
    @Field(() => GraphQLISODateTime, { nullable: true })
    @ApiProperty()
    @CreateDateColumn()
    updated_at: Date;
    /**
     * cryptPassword
     */
    async cryptPassword() {
        this.password = await hash(this.password);
    }
    /**
     * beforeInsert
     * @returns
     */
    @BeforeInsert()
    async beforeInsert() {
        return await this.cryptPassword();
    }

    /**
     * Validates password
     * @param password
     * @returns password
     */
    async validatePassword(password: string): Promise<boolean> {
        return await verify(this.password, password);
    }
    /**
     * -----------------------------------------
     *	Getters & Setters
     * -----------------------------------------
     */

    /**
     * Assigns role
     * @param _role
     * @returns role
     */
    assignRole(_role: Role): Role[] {
        if (!this.roles.includes(_role)) this.roles.push(_role);
        return this.roles;
    }
    /**
     * Determines whether any role has
     * @param _roles
     * @returns true if any role
     */
    hasAnyRole(_roles: Role[]): boolean {
        let has = false;
        _roles.forEach((_r) => {
            if (this.hasRole(_r)) has = true;
        });
        return has;
    }
    /**
     * Determines whether role has
     * @param _role
     * @returns true if role
     */
    hasRole(_role: Role): boolean {
        return this.roles.includes(_role);
    }
}
