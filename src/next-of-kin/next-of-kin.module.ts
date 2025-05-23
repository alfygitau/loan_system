import { Module } from '@nestjs/common';
import { NextOfKinController } from './next-of-kin.controller';
import { NextOfKinService } from './next-of-kin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextOfKin } from './entities/NextOfKin';
import { Borrower } from 'src/borrower/entities/Borrower';

@Module({
  imports: [TypeOrmModule.forFeature([NextOfKin, Borrower])],
  controllers: [NextOfKinController],
  providers: [NextOfKinService],
})
export class NextOfKinModule {}
