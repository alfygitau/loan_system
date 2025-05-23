import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanProductsService } from './loan-products.service';
import { LoanProductsController } from './loan-products.controller';
import { LoanProduct } from './entities/LoanProduct';

@Module({
  imports: [TypeOrmModule.forFeature([LoanProduct])],
  controllers: [LoanProductsController],
  providers: [LoanProductsService],
})
export class LoanProductsModule {}
