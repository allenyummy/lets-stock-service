import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new NotFoundException('Not Found');
    }

    const isPasswordMatch = await argon2.verify(
      user.hashPassword,
      dto.password,
    );
    if (!isPasswordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const accessToken = this.getAccessToken(user.id, user.email);
    return accessToken;
  }

  async signup(dto: AuthDto) {
    const hashPassword = await argon2.hash(dto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hashPassword: hashPassword,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const accessToken = this.getAccessToken(user.id, user.email);
      return accessToken;
    } catch (error) {
      // console.error(error);
      throw new ForbiddenException('Credentials taken');
    }
  }

  async getAccessToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const ttl = '15m';
    const secret = this.configService.get('JWT_SECRET');
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: ttl,
      secret: secret,
    });

    return { accessToken };
  }
}
