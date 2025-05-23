import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateNextOfKinDto {
  @IsString()
  fullName: string;

  @IsString()
  relationship: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  residence?: string;

  @IsOptional()
  @IsString()
  nearestLandmark?: string;

  @IsInt()
  borrowerId: number;
}
