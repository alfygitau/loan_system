import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User';
import { LoanProductsModule } from './loan-products/loan-products.module';
import { BorrowerModule } from './borrower/borrower.module';
import { ChattelModule } from './chattel/chattel.module';
import { GuarantorModule } from './guarantor/guarantor.module';
import { NextOfKinModule } from './next-of-kin/next-of-kin.module';
import { IncomeModule } from './income/income.module';
import { ContactModule } from './contact/contact.module';
import { LoanApplicationModule } from './loan-application/loan-application.module';
import { LoanModule } from './loan/loan.module';
import { LoanRepaymentModule } from './loan-repayment-schedule/loan-repayment.module';
import { RepaymentModule } from './repayment/repayment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere without importing module again
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    LoanProductsModule,
    BorrowerModule,
    ChattelModule,
    GuarantorModule,
    NextOfKinModule,
    IncomeModule,
    ContactModule,
    LoanApplicationModule,
    LoanModule,
    LoanRepaymentModule,
    RepaymentModule,
    AuthModule,
  ],
})
export class AppModule {}
