import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { appConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  // Global pipes configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // API prefix and CORS configuration
  app.setGlobalPrefix('api');
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Swagger documentation setup with basic auth
  setupSwagger(app);

  // Start the application
  await app.listen(appConfig.port);

  // Log application details
  logApplicationDetails();
}

function setupSwagger(app: INestApplication) {
  app.use(
    '/api/docs',
    basicAuth({
      users: { [appConfig.adminUser]: appConfig.adminPassword },
      challenge: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('BookShop API')
    .setDescription('Comprehensive API for BookShop application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

function logApplicationDetails() {
  const { host, port } = appConfig;
  console.log(`Application is running on: http://${host}:${port}`);
  console.log(`Swagger documentation: http://${host}:${port}/api/docs`);
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
