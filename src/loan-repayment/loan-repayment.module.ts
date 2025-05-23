import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRepaymentSchedule } from './entities/LoanRepayment';
import { Loan } from 'src/loan/entities/Loan';
import { LoanRepaymentService } from './loan-repayment.service';
import { LoanRepaymentController } from './loan-repayment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRepaymentSchedule, Loan])],
  controllers: [LoanRepaymentController],
  providers: [LoanRepaymentService],
})
export class LoanRepaymentModule {}
