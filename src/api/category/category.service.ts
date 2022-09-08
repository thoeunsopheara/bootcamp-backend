import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private PrismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.PrismaService.category.findUnique({
      where: { name: createCategoryDto.name },
    });
    if (result) return { msg: 'category already exists' };
    return await this.PrismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.PrismaService.category.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    const result = await this.PrismaService.category.findUnique({
      where: { id },
      include: { products: true },
    });
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.PrismaService.category.update({
      data: updateCategoryDto,
      where: { id },
    });
    return result;
  }

  async remove(id: string) {
    await this.PrismaService.category.delete({ where: { id } });
    return { msg: 'category have been delete' };
  }
}
