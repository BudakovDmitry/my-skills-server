import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { AuthDto } from './dto/auth.dto.js';
import { verify } from 'argon2';
import { Response } from 'express';
import { RegistrationDto } from './dto/registration.dto.js';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1
  REFRESH_TOKEN_NAME = 'refreshToken'

  constructor(
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto)
    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  async registration(dto: RegistrationDto) {
    const oldUser = await this.userService.getByEmail(dto.email)
    if(oldUser) {
      throw new BadRequestException('User already exists')
    }

    const { password, ...user } = await this.userService.create(dto)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const { password, ...user } = await this.userService.getById(result.id)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  private issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isValid = await verify(user.password, dto.password)

    if (!isValid) {
      throw new UnauthorizedException('Invalid password')
    }

    return user
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: process.env.DOMAIN || 'localhost',
      expires: expiresIn,
      secure: true,
      // 'lax' for production
      sameSite: 'none'
    })
  }


  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: process.env.DOMAIN || 'localhost',
      expires: new Date(0),
      secure: true,
      // 'lax' for production
      sameSite: 'none'
    })
  }


  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}