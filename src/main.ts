import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { appConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use(
    '/api/docs',
    basicAuth({
      users: {
        [appConfig.adminUser]: appConfig.adminPassword,
      },
      challenge: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('BookShop')
    .setDescription('API for BookShop application.')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(appConfig.port, () => {
    console.log(
      `Application is running on: http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger route: http://${appConfig.host}:${appConfig.port}/api/docs`,
    );
  });
}
bootstrap();
