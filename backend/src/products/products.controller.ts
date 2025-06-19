import {
  Controller,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { create } from 'domain';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const imgName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${imgName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() imagem: Express.Multer.File,
  ) {
    if (imagem) {
      createProductDto.imagem = imagem.path;
    }
    return this.productService.create(createProductDto);
  }

  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    if (!product) {
      return { message: 'Produto não encontrado' };
    }
    await this.productService.remove(id);
    return { message: 'Produto removido com sucesso' };
  }

  @Patch (':id')
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const imgName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${imgName}${extname(file.originalname)}`);
        }
      }),
    }),
  )
  async udpdateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() imagem: Express.Multer.File
  ){
    if (imagem) {
      updateProductDto.imagem = imagem.path;
    }
    const product = await this.productService.update(id, updateProductDto);
    if (!product) {
      return { message: 'Produto não encontrado' };
    }
    return product;
  }
}
