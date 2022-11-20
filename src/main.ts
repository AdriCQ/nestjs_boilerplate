import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
// import * as csurf from 'csurf';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    /**
     * -----------------------------------------
     *	Middlewares
     * -----------------------------------------
     */
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.use(compression());
    // TODO Setup HEADER middleware
    // app.use(csurf());
    if (process.env.NODE_ENV === 'production') app.use(helmet());
    /**
     * -----------------------------------------
     *	Swagger
     * -----------------------------------------
     */
    const config = new DocumentBuilder()
        .setTitle('API DOCS')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.APP_PORT);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
