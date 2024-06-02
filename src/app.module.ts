import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import {PrismaService} from "./prisma.service.js";
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { TodoModule } from './todo/todo.module.js';
import { Database, Resource } from '@adminjs/prisma'
import { PageModule } from './page/page.module.js';
import { PageLinkModule } from './page-link/page-link.module.js';
import AdminJS from 'adminjs';

AdminJS.registerAdapter({ Database, Resource })


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        const adminjs = new AdminJS()
        
        adminjs.watch()

        return {
          adminJsOptions: options,
          auth: {
            provider,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
          },
        };
      },
    }),
    AuthModule,
    UserModule,
    TodoModule,
    PageModule,
    PageLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
