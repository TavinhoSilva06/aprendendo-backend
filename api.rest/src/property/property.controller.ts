import {
  Controller,
  Get,
  Post,
  ParseIntPipe,
  ParseBoolPipe,
  Query,
  Body,
  Param,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreatePropertydto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './dto/parseIdppipe';

@Controller('property')
export class PropertyController {
  @Get()
  findall() {
    return 'All propiertys';
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
  create(
    @Body()
    body: CreatePropertydto,
  ) {
    return body;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertydto,
  ) {
    return body;
  }
}
