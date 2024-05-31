import { Injectable } from '@nestjs/common';
import { PageLinkDto } from './dto/page-link.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PageLinkService {
  constructor(private prisma: PrismaService) {}
  
  create(dto: PageLinkDto) {
    return this.prisma.pageLink.create({
      data: dto
    })
  }

  // findAll() {
  //   return `This action returns all pageLink`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} pageLink`;
  // }

  // update(id: string, updatePageLinkDto) {
  //   return `This action updates a #${id} pageLink`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} pageLink`;
  // }
}
