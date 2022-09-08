import { IsNotEmpty, IsString } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  categoryId: string;
}
