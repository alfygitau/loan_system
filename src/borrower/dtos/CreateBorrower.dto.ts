import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { Gender, IdType } from '../entities/Borrower';

export class CreateBorrowerDto {
  @IsEnum(['National Id', 'Passport Id'])
  idType: IdType;

  @IsString()
  country: string;

  @IsString()
  idNumber: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsEnum(['male', 'female', 'other'])
  gender: Gender;

  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  signature?: string;
}
