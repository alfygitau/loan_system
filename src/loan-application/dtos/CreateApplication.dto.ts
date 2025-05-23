import {
  IsInt,
  IsNumber,
  IsPositive,
  IsEnum,
  IsString,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';

import { LoanStatus } from '../entities/LoanApplication';

export class CreateLoanApplicationDto {
  @IsInt()
  borrowerId: number;

  @IsInt()
  loanTypeId: number;

  @IsOptional()
  @IsInt()
  loanOfficerId?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsInt()
  @Min(1)
  durationMonths: number;

  @IsEnum(['pending', 'approved', 'rejected', 'disbursed', 'closed'])
  status?: LoanStatus = 'pending';

  @IsString()
  @MaxLength(255)
  purpose: string;
}
