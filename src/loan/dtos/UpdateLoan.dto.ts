import { IsOptional, IsEnum, IsDecimal } from 'class-validator';

export class UpdateLoanDto {
  @IsOptional()
  @IsDecimal()
  outstandingBalance?: number;

  @IsOptional()
  @IsEnum(['active', 'closed', 'defaulted'])
  status?: 'active' | 'closed' | 'defaulted';
}
