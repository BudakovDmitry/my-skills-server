import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { UserDto } from './dto/user.dto.js';
import { hash } from 'argon2';
import { RegistrationDto } from 'src/auth/dto/registration.dto.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RegistrationDto) {
    const user = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }
  

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        todos: true
      }
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async update(id: string, dto: UserDto) {
    let data: any = { ...dto };

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password)}
    }

    if (dto.links) {
      const existingSocialLinks = await this.prisma.socialLinks.findUnique({
        where: {
          userId: id,
        },
      });
  
      if (existingSocialLinks) {
        data.links = {
          update: {
            instagram: dto.links.instagram,
            facebook: dto.links.facebook,
            github: dto.links.github,
            linkedIn: dto.links.linkedIn,
          }
        };
      } else {
        data.links = {
          create: {
            instagram: dto.links.instagram,
            facebook: dto.links.facebook,
            github: dto.links.github,
            linkedIn: dto.links.linkedIn,
          }
        };
      }
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select: {
        email: true,
        firstName: true,
        lastName: true
      }
    })
  }
}