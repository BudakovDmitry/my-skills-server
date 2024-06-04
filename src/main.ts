import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import express, { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  const config = new DocumentBuilder()
    .setTitle('Finance tracker')
    .setDescription('Finance tracker application API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
