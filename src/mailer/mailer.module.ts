import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerConfig } from './mailer.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...MailerConfig
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [NestMailerModule],
})
export class MailerModule {}
