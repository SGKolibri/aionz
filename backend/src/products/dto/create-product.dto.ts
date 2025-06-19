import { IsString, IsNumber, IsNotEmpty, IsOptional, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Mouse Logitech G305' })
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio.' })
  @IsString({ message: 'O nome do produto deve ser uma string.' })
  @MaxLength(100, { message: 'O nome do produto não pode ter mais de 100 caracteres.' })
  nome: string;

  @ApiProperty({ description: 'Descrição detalhada do produto', example: 'O G305 apresenta o sensor HERO de última geração com sensibilidade de 200 a 12.000 DPI para precisão de nível de competição.' })
  @IsNotEmpty({ message: 'A descrição do produto não pode ser vazia.' })
  @IsString({ message: 'A descrição do produto deve ser uma string.' })
  descricao: string;

  @ApiProperty({ description: 'Preço do produto', example: 249.99 })
  @IsNotEmpty({ message: 'O preço do produto não pode ser vazio.' })
  @Type (() => Number)
  @IsNumber({}, { message: 'O preço do produto deve ser um número.' })
  @Min(0.01, { message: 'O preço do produto deve ser maior que zero.' })
  preco: number;

  @ApiProperty({ description: 'Categoria do produto', example: 'Periféricos' })
  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia.' })
  @IsString({ message: 'A categoria do produto deve ser uma string.' })
  categoria: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Arquivo de imagem do produto (upload)',
    required: false
  })
  @IsOptional()
  @IsString()
  imagem?: string;
}