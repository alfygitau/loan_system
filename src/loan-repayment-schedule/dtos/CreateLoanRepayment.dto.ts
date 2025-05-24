// dto/create-loan-repayment-schedule.dto.ts
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateLoanRepaymentScheduleDto {
  @IsNotEmpty()
  loanId: string;

  @IsDateString()
  dueDate: Date;

  @IsNumber()
  installmentAmount: number;

  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsNumber()
  balance: number;

  @IsOptional()
  @IsDateString()
  paymentDate?: Date;

  @IsOptional()
  @IsEnum(['unpaid', 'paid', 'partial', 'late'])
  status?: 'unpaid' | 'paid' | 'partial' | 'late';
}
