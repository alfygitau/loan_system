import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoanApplicationService } from './loan-application.service';
import { LoanApplicationController } from './loan-application.controller';
import { LoanApplication } from './entities/LoanApplication';
import { LoanProduct } from 'src/loan-products/entities/LoanProduct';
import { Borrower } from 'src/borrower/entities/Borrower';
import { User } from 'src/users/entities/User';
import { Loan } from 'src/loan/entities/Loan';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoanApplication,
      LoanProduct,
      Borrower,
      User,
      Loan,
    ]),
  ],
  providers: [LoanApplicationService],
  controllers: [LoanApplicationController],
  exports: [LoanApplicationService],
})
export class LoanApplicationModule {}
