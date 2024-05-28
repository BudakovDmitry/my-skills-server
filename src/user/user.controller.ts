import { Controller, Get, Post, Body, Put, Patch, Param, Delete, ValidationPipe, HttpCode, UsePipes } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CurrentUser } from '../auth/decorators/user.decorator.js';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { UserDto } from './dto/user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async getUserById(@CurrentUser('id') id: string) {
    return this.userService.getById(id)
  }

  @HttpCode(200)
  @Get('all')
  getAll() {
    return this.userService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateUser(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

}
