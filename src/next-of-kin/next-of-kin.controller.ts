import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateNextOfKinDto } from './dtos/UpdateNextOfKin.dto';
import { CreateNextOfKinDto } from './dtos/CreateNextOfKin.dto';
import { NextOfKinService } from './next-of-kin.service';

@Controller('next-of-kin')
export class NextOfKinController {
  constructor(private readonly service: NextOfKinService) {}

  @Post()
  create(@Body() dto: CreateNextOfKinDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNextOfKinDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
