import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export type MaritalStatus =
  | 'single'
  | 'married'
  | 'divorced'
  | 'widowed'
  | 'separated';

export class CreateContactDto {
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  alternatePhoneNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(['single', 'married', 'divorced', 'widowed', 'separated'])
  maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsInt()
  numberOfDependants?: number;

  @IsOptional()
  @IsString()
  poBox?: string;

  @IsInt()
  borrowerId: number;
}
