import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const data = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (data && bcrypt.compare(data.password, password)) return data;
    return null;
  }

  async signJwt(user: any) {
    return {
      token: this.jwtService.sign(user, {
        expiresIn: '30d',
        secret: this.configService.get('JWT_SECRET') || 'secret',
      }),
    };
  }
}
