import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { LoanApplicationService } from './loan-application.service';
import { CreateLoanApplicationDto } from './dtos/CreateApplication.dto';
import { UpdateLoanApplicationDto } from './dtos/UpdateApplication.dto';
import { Loan } from 'src/loan/entities/Loan';

@Controller('loan-applications')
export class LoanApplicationController {
  constructor(private readonly loanAppService: LoanApplicationService) {}

  @Post()
  create(@Body() createDto: CreateLoanApplicationDto) {
    return this.loanAppService.create(createDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('loanType') loanType?: string,
    @Query('minRepayment') minRepayment?: string,
    @Query('maxRepayment') maxRepayment?: string,
  ) {
    return this.loanAppService.findAll({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      status,
      loanType,
      minRepayment: minRepayment ? Number(minRepayment) : undefined,
      maxRepayment: maxRepayment ? Number(maxRepayment) : undefined,
    });
  }

  @Patch(':id/approve')
  async approveLoanApplication(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Loan> {
    return this.loanAppService.approveApplication(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.loanAppService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLoanApplicationDto,
  ) {
    return this.loanAppService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.loanAppService.remove(id);
  }
}
