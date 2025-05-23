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

export class UpdateLoanApplicationDto {
  @IsOptional()
  @IsInt()
  borrowerId?: number;

  @IsOptional()
  @IsInt()
  loanTypeId?: number;

  @IsOptional()
  @IsInt()
  loanOfficerId?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMonths?: number;

  @IsOptional()
  @IsEnum(['pending', 'approved', 'rejected', 'disbursed', 'closed'])
  status?: LoanStatus;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  purpose?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  repaymentAmount?: number;
}
