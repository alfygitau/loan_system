import { Module } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { BorrowerController } from './borrower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from './entities/Borrower';
import { Contact } from '../contact/entities/Contact';
import { Chattel } from '../chattel/entities/Chattel';
import { Guarantor } from '../guarantor/entities/Guarantor';
import { IncomeDetails } from '../income/entities/IncomeDetails';
import { NextOfKin } from '../next-of-kin/entities/NextOfKin';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Borrower,
      Contact,
      Chattel,
      Guarantor,
      IncomeDetails,
      NextOfKin,
    ]),
  ],
  controllers: [BorrowerController],
  providers: [BorrowerService],
})
export class BorrowerModule {}
