export default () => ({
    app: {
        name: process.env.APP_NAME || 'NestJS',
        host: process.env.APP_HOST || 'localhost',
        port: process.env.APP_PORT || 3000,
        secret: process.env.APP_SECRET || 'secret',
        env: process.env.APP_ENV || 'dev',
    },
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || 3306,
        connection: process.env.DATABASE_CONNECTION || 'mysql',
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'root',
        name: process.env.DATABASE_NAME || 'nestjs',
        sync: process.env.TYPEORM_SYNCHRONIZE || false,
    },
});
