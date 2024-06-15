import { Controller, Get, Post, Body, Put, Param, ValidationPipe, HttpCode, UsePipes, UploadedFile, UseInterceptors, Res, Req, Query } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CurrentUser } from '../auth/decorators/user.decorator.js';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { UserDto } from './dto/user.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { Request, Response } from 'express';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async getCurrentUserById(@CurrentUser('id') id: string) {
    return this.userService.getById(id)
  }
  
  @HttpCode(200)
  @Get('all/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @HttpCode(200)
  @Get('all')
  getAll(@Query('pageNumber') pageNumber: string = '1', @Query('pageSize') pageSize: string = '10') {
    return this.userService.getAll(parseInt(pageNumber), parseInt(pageSize))
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateUser(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

  @HttpCode(200)
  @Put('plan')
  @Auth()
  async updateUserPlan(@CurrentUser('id') id: string, @Body() dto: { newPlanName: string}) {
    return this.userService.updatePlan(id, dto.newPlanName)
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../../uploads'),
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }))
  async uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Res() res: Response, @Req() req: Request) {
    const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    await this.userService.updateProfilePictureUrl(id, profilePictureUrl);

    return { profilePictureUrl };
  }

}
