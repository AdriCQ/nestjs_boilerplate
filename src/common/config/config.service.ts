import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(public filePath: string) {
        let file: Buffer | undefined;
        try {
            file = fs.readFileSync(filePath);
        } catch (error) {
            file = fs.readFileSync('dev.env');
        }

        const config = dotenv.parse(file);
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            APP_NAME: Joi.string().required(),
            APP_HOST: Joi.string().default('localhost'),
            APP_PORT: Joi.number().default(3000),
            APP_SECRET: Joi.string().required(),
            APP_ENV: Joi.string().default('dev'),

            DATABASE_CONNECTION: Joi.string().default('mysql'),
            DATABASE_HOST: Joi.string().default('localhost'),
            DATABASE_PORT: Joi.number().default(3306),
            DATABASE_USERNAME: Joi.string().default('root'),
            DATABASE_PASSWORD: Joi.string().default('root'),
            DATABASE_NAME: Joi.string().default('nestjs'),
            TYPEORM_SYNCHRONIZE: Joi.bool().default(false),
        });

        const { error, value: validatedEnvConfig } =
            envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(
                `Config validation error in your env file: ${error.message}`,
            );
        }
        return validatedEnvConfig;
    }

    get app() {
        return {
            name: this.envConfig.APP_NAME,
            host: this.envConfig.APP_HOST,
            port: this.envConfig.APP_PORT,
            secret: this.envConfig.APP_SECRET,
            env: this.envConfig.APP_ENV,
        };
    }

    get database() {
        return {
            connection: this.envConfig.DATABASE_CONNECTION,
            host: this.envConfig.DATABASE_HOST,
            port: Number(this.envConfig.DATABASE_PORT),
            username: this.envConfig.DATABASE_USERNAME,
            password: this.envConfig.DATABASE_PASSWORD,
            name: this.envConfig.DATABASE_NAME,
            sync: Boolean(this.envConfig.TYPEORM_SYNCHRONIZE),
        };
    }
}
