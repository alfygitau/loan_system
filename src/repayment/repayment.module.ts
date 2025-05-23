// src/loan-repayment/loan-repayment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/loan/entities/Loan';
import { LoanRepayment } from './entities/Repayment';
import { RepaymentService } from './repayment.service';
import { RepaymentController } from './repayment.controller';
import { LoanRepaymentSchedule } from 'src/loan-repayment/entities/LoanRepayment';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanRepayment, Loan, LoanRepaymentSchedule]),
  ],
  providers: [RepaymentService],
  controllers: [RepaymentController],
})
export class RepaymentModule {}
