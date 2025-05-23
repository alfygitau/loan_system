// src/loan-repayment/dtos/CreateLoanRepayment.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLoanRepaymentDto {
  @IsUUID()
  @IsNotEmpty()
  loanId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  paymentDate: Date;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEnum(['success', 'failed', 'pending'])
  @IsOptional()
  status?: 'success' | 'failed' | 'pending';
}
