import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@common/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
/**
 *
 */
export const DatabaseModuleConfig = TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.name,
        entities: [__dirname + '../**/*.model{.ts,.js}'],
        synchronize: configService.database.sync,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
});

config();

const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

export default new DataSource({
    type: 'mariadb',
    host: configService.database.host,
    port: configService.database.port,
    username: configService.database.username,
    password: configService.database.password,
    database: configService.database.name,
    entities: [__dirname + '../src/modules/**/*.entity.ts'],
    migrations: [__dirname + '/migrations/**/*.migration.ts'],
});
