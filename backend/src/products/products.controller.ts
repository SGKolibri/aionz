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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo produto', description: 'Registrar um novo produto com os dados fornecidos.' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
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
  @ApiOperation({ summary: 'Listar todos os produtos', description: 'Retorna uma lista de todos os produtos cadastrados.' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhum produto encontrado.' })
  async getAllProducts() {
    return this.productService.findAll();
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID', description: 'Retorna os detalhes de um produto específico pelo seu ID.' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async getProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar produto por ID', description: 'Remove um produto específico pelo seu ID.' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async deleteProduct(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    if (!product) {
      return { message: 'Produto não encontrado' };
    }
    await this.productService.remove(id);
    return { message: 'Produto removido com sucesso' };
  }

  @Patch (':id')
  @ApiOperation({ summary: 'Atualizar produto por ID', description: 'Atualiza os dados de um produto específico pelo seu ID.' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
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
