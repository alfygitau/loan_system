import { Module } from '@nestjs/common';
import { GuarantorController } from './guarantor.controller';
import { GuarantorService } from './guarantor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guarantor } from './entities/Guarantor';
import { Borrower } from 'src/borrower/entities/Borrower';
import { Chattel } from 'src/chattel/entities/Chattel';

@Module({
  imports: [TypeOrmModule.forFeature([Guarantor, Borrower, Chattel])],
  providers: [GuarantorService],
  controllers: [GuarantorController],
})
export class GuarantorModule {}
