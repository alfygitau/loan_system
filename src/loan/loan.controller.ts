import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dtos/CreateLoan.dto';
import { UpdateLoanDto } from './dtos/UpdateLoan.dto';
import { Loan } from './entities/Loan';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() dto: CreateLoanDto) {
    return this.loanService.create(dto);
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLoanDto) {
    return this.loanService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanService.remove(id);
  }

  @Patch(':id/disburse')
  async disburseLoan(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('amount') amount: number,
  ): Promise<Loan> {
    return this.loanService.disburseLoan(id, amount);
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') loanId: string) {
    return this.loanService.getScheduleByLoanId(loanId);
  }
}
