import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
