import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageService } from './page.service.js';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.pageService.getByName(name);
  }

  // @Post()
  // create(@Body() createPageDto) {
  //   return this.pageService.create(createPageDto);
  // }

  // @Get()
  // findAll() {
  //   return this.pageService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pageService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePageDto) {
  //   return this.pageService.update(id, updatePageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pageService.remove(id);
  // }
}
