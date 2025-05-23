// src/loan-repayment/loan-repayment.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateLoanRepaymentDto } from './dtos/CreateLoanRepayment.dto';
import { UpdateLoanRepaymentDto } from './dtos/UpdateLoanRepayment.dto';
import { RepaymentService } from './repayment.service';

@Controller('loan-repayments')
export class RepaymentController {
  constructor(private readonly repaymentService: RepaymentService) {}

  @Post()
  repayLoan(@Body() dto: CreateLoanRepaymentDto) {
    return this.repaymentService.repayLoan(dto);
  }

  @Get()
  findAll() {
    return this.repaymentService.findAll();
  }

  @Get('loan/:loanId')
  async getByLoanId(@Param('loanId') loanId: string) {
    return this.repaymentService.getRepaymentsByLoanId(loanId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.repaymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateLoanRepaymentDto) {
    return this.repaymentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.repaymentService.remove(id);
  }
}
