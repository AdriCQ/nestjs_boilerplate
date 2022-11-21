import { Module } from '@nestjs/common';
import { DatabaseModuleConfig } from '@/common/database';
import { ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@common/config';
// import { GQLModule } from '@common/graphql';
import { UsersModule } from '@common/users';
import { AuthModule } from '@common/auth';
import { CaslModule } from '@common/casl';
/**
 * Modules
 */

@Module({
    imports: [
        // Load Multer
        MulterModule.register({
            dest: './storage',
        }),
        /**
         * -----------------------------------------
         *	Configuration
         * -----------------------------------------
         */
        ConfigModule,
        /**
         * -----------------------------------------
         *	Database
         * -----------------------------------------
         */
        DatabaseModuleConfig,
        /**
         * -----------------------------------------
         *	Limit Requests
         * -----------------------------------------
         */
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        /**
         * -----------------------------------------
         *	Comomon Modules
         * -----------------------------------------
         */
        UsersModule,
        AuthModule,
        CaslModule,
        // GQLModule,
    ],
})
export class AppModule {}
