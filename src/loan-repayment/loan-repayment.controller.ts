import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoanRepaymentService } from './loan-repayment.service';
import { CreateLoanRepaymentScheduleDto } from './dtos/CreateLoanRepayment.dto';
import { UpdateLoanRepaymentScheduleDto } from './dtos/UpdateLoanRepayment.dto';

@Controller('loan-repayment')
export class LoanRepaymentController {
  constructor(private readonly service: LoanRepaymentService) {}

  @Post()
  create(@Body() dto: CreateLoanRepaymentScheduleDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateLoanRepaymentScheduleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
