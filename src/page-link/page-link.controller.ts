import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageLinkService } from './page-link.service.js';
import { PageLinkDto } from './dto/page-link.dto.js';

@Controller('page-link')
export class PageLinkController {
  constructor(private readonly pageLinkService: PageLinkService) {}

  @Post()
  create(@Body() dto: PageLinkDto) {
    return this.pageLinkService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.pageLinkService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pageLinkService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePageLinkDto) {
  //   return this.pageLinkService.update(id, updatePageLinkDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pageLinkService.remove(id);
  // }
}
