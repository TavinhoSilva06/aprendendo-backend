import { Controller, Get, Patch, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("outroendpoint")
  postOutroEndpoint(): string {
    return "Novo end point";
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Patch("endpointatualizado")
  patchOutroendPoint(): string {
    return "End point atualizado";
  }

 @Delete("exluindoendpoint")
 deleteOutroEndpoint(): string {
  return "Apagando End Point"
 }

  @Get("outroendpoint2")
  getOutroEndPoint(): string {
    return "Meu outro end point";
  }
  
}


