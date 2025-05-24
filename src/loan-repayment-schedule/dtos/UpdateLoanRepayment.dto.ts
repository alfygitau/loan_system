// dto/update-loan-repayment-schedule.dto.ts
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateLoanRepaymentScheduleDto {
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsNumber()
  installmentAmount?: number;

  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsDateString()
  paymentDate?: Date;

  @IsOptional()
  @IsEnum(['unpaid', 'paid', 'partial', 'late'])
  status?: 'unpaid' | 'paid' | 'partial' | 'late';
}
