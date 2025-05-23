// src/loan-types/dto/create-loan-type.dto.ts

import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export enum LoanCategory {
  SALARIED = 'salaried',
  BUSINESS = 'business',
  PERSONAL = 'personal',
  ASSET = 'asset',
}

export enum InterestType {
  FLAT = 'flat',
  REDUCING_BALANCE = 'reducing_balance',
}

export enum RepaymentFrequency {
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
}

export class CreateLoanProductDto {
  @IsEnum(LoanCategory)
  loanCategory: LoanCategory;

  @IsString()
  loanName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  interestRate: number;

  @IsEnum(InterestType)
  interestType: InterestType;

  @IsNumber()
  minimumAmount: number;

  @IsNumber()
  maximumAmount: number;

  @IsInt()
  minimumDuration: number;

  @IsInt()
  maximumDuration: number;

  @IsEnum(RepaymentFrequency)
  repaymentFrequency: RepaymentFrequency;

  @IsInt()
  gracePeriod: number;

  @IsNumber()
  penaltyRate: number;

  @IsInt()
  minimumAge: number;

  @IsBoolean()
  collateralRequired: boolean;

  @IsNumber()
  processingFee: number;

  @IsNumber()
  insuranceFee: number;

  @IsNumber()
  otherCharges: number;

  @IsOptional()
  @IsString()
  termsAndConditions?: string;

  @IsOptional()
  @IsString()
  documentsRequired?: string;
}
