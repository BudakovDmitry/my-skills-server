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

  getAll() {
    return this.prisma.pageLink.findMany({
      orderBy: {
        order: 'asc'
      }
    });
  }

  getOne(id: string) {
    return this.prisma.pageLink.findUnique({
      where: {
        id
      }
    });
  }

  update(id: string, dto: PageLinkDto) {
    return this.prisma.pageLink.update({
      where: {
        id
      }, 
      data: dto
    });
  }

  remove(id: string) {
    return this.prisma.pageLink.delete({
      where: {
        id
      }
    });
  }
}
