import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeDetails } from './entities/IncomeDetails';
import { Borrower } from 'src/borrower/entities/Borrower';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeDetails, Borrower])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
