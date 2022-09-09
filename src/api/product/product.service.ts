import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private PrismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.PrismaService.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.PrismaService.product.findMany();
  }

  async findOne(id: string) {
    return await this.PrismaService.product.findUnique({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.PrismaService.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.PrismaService.product.delete({ where: { id } });
    return { msg: 'product have been delete' };
  }
}
