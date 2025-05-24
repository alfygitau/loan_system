import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanApplication } from 'src/loan-application/entities/LoanApplication';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { Loan } from './entities/Loan';
import { LoanRepaymentSchedule } from 'src/loan-repayment-schedule/entities/LoanRepayment';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan, LoanApplication, LoanRepaymentSchedule]),
  ],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
