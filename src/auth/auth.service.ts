import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

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

    const { hashPassword, ...retUser } = user;
    return retUser;
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
      return user;
    } catch (error) {
      // console.error(error);
      throw new ForbiddenException('Credentials taken');
    }
  }
}
