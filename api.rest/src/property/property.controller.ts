import { Controller, Get, Post, ParseIntPipe, ParseBoolPipe, Query, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertydto } from './dto/createProperty.dto';

@Controller('property')
export class PropertyController {
    @Get()
  findall() {
    return "All propiertys";
  }
  
  @Get('id:')
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    console.log(typeof id);
    console.log(typeof sort);
    
    return id;
  }

  @Post()
//   @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
//   HttpCode(202)
  create(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) 
  body: CreatePropertydto) {
    return body;
    }
  }