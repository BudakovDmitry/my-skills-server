import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { PageLinkService } from './page-link.service.js';
import { PageLinkDto } from './dto/page-link.dto.js';

@Controller('page-link')
export class PageLinkController {
  constructor(private readonly pageLinkService: PageLinkService) {}

  @HttpCode(200)
  @Post()
  create(@Body() dto: PageLinkDto) {
    return this.pageLinkService.create(dto);
  }

  @HttpCode(200)
  @Get()
  getAll() {
    return this.pageLinkService.getAll();
  }

  @HttpCode(200)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.pageLinkService.getOne(id);
  }

  @HttpCode(200)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PageLinkDto) {
    return this.pageLinkService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageLinkService.remove(id);
  }
}
