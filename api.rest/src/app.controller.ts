import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findall() {
    return "All propiertys"
  }
  
  // //@Get(@Param(':id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
  //   console.log(typeof(id));
  //   console.log(typeof sort);
  //   return id
  // }

  @Post()
  @HttpCode(202)
  create(@Body("name") name) {
    return name;
    }
  }
