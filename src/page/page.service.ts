import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto) {
    return 'This action adds a new page';
  }

  findAll() {
    return `This action returns all page`;
  }

  async getByName(name: string) {
    return this.prisma.page.findUnique({
      where: {
        name
      },
    });
  }

  update(id: string, updatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: string) {
    return `This action removes a #${id} page`;
  }
}
