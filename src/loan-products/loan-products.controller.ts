import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LoanProductsService } from './loan-products.service';
import { CreateLoanProductDto } from './dtos/CreateLoanProduct.dto';

@Controller('loan-products')
export class LoanProductsController {
  constructor(private readonly service: LoanProductsService) {}

  @Post()
  create(@Body() dto: CreateLoanProductDto) {
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
  update(@Param('id') id: string, @Body() dto: CreateLoanProductDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
