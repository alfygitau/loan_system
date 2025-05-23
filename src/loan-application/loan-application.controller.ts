import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
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
  findAll() {
    return this.loanAppService.findAll();
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
