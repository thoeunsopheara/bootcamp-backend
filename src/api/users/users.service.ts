import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from "@users/entities/user.entity";
import { PrismaService } from "@src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    user.password = await this.hashPassword(user.password);
    return await this.prismaService.user.create({ data: user });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prismaService.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id: Number(id)
      },
      data: updateUserDto
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id: Number(id)
      }
    });
  }


  async hashPassword(password: string): Promise<string> {
    const round = 10;
    return await bcrypt.hash(password, round);
  }

  async verifyPassword(password: string, hash: string): Promise<Boolean> {
    return await bcrypt.compare(password, hash);
  }
}
