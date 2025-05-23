import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateIncomeDetailsDto } from './dtos/UpdateIncomeDetails.dto';
import { CreateIncomeDetailsDto } from './dtos/CreateIncomeDetails.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly service: IncomeService) {}

  @Post()
  create(@Body() dto: CreateIncomeDetailsDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIncomeDetailsDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
