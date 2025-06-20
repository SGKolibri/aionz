import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Get('hello')
  @ApiOperation({ summary: 'Healthcheck', description: 'Endpoint raiz da API. Pode ser usada para healthcheck.' })
  @ApiResponse({ status: 200, description: 'API funcionando.' })
  root() {
    return { message: 'API Aionz está ativa!' };
  }
}
