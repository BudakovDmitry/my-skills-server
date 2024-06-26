import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { MailService } from './mail.service.js';
import { MailDto } from './dto/mail.dto.js';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(200)
  @Post()
  create(@Body() dto: MailDto) {
    return this.mailService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(id);
  }

  @HttpCode(200)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MailDto) {
    return this.mailService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(id);
  }
}
