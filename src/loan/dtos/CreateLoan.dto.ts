import { IsUUID, IsDecimal, IsDateString, IsEnum } from 'class-validator';

export class CreateLoanDto {
  @IsUUID()
  applicationId: number;

  @IsDecimal()
  disbursedAmount: number;

  @IsDecimal()
  repaymentAmount: number;

  @IsDecimal()
  outstandingBalance: number;

  @IsDateString()
  disbursementDate: Date;

  @IsEnum(['active', 'closed', 'defaulted', 'rejected'])
  status: 'active' | 'closed' | 'defaulted' | 'rejected';

  rejectionReason: string;
}
