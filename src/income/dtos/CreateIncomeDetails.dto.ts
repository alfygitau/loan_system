import {
  IsString,
  IsEnum,
  IsBoolean,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateIncomeDetailsDto {
  @IsString()
  sourceOfIncome: string;

  @IsString()
  kraPin: string;

  @IsString()
  businessName: string;

  @IsInt()
  yearsOfOperation: number;

  @IsEnum(['family', 'sole_proprietor', 'partnership'])
  businessOwnership: 'family' | 'sole_proprietor' | 'partnership';

  @IsString()
  typeOfBusiness: string;

  @IsBoolean()
  licenseRequired: boolean;

  @IsOptional()
  @IsString()
  risksAssociated?: string;

  @IsOptional()
  @IsString()
  strengthOfBusiness?: string;

  @IsString()
  levelOfStability: string;

  @IsOptional()
  @IsString()
  mpesaStatementUrl?: string;

  @IsOptional()
  @IsString()
  mpesaCode?: string;

  @IsOptional()
  @IsString()
  businessLatitude?: string;

  @IsOptional()
  @IsString()
  businessLongitude?: string;

  @IsOptional()
  @IsString()
  businessPhysicalAddress?: string;

  @IsOptional()
  @IsString()
  businessImageUrl?: string;

  @IsOptional()
  @IsString()
  businessLocationDescription?: string;

  @IsOptional()
  @IsString()
  residenceLatitude?: string;

  @IsOptional()
  @IsString()
  residenceLongitude?: string;

  @IsOptional()
  @IsString()
  residencePhysicalAddress?: string;

  @IsOptional()
  @IsString()
  residenceImageUrl?: string;

  @IsOptional()
  @IsString()
  residenceLocationDescription?: string;

  @IsInt()
  borrowerId: number;
}
