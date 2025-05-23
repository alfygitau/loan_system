import {
  IsString,
  IsOptional,
  IsNumber,
  IsDecimal,
  IsEmail,
  IsInt,
} from 'class-validator';

export class CreateGuarantorDto {
  @IsString()
  guarantorName: string;

  @IsString()
  residence: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 7 })
  longitude?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 7 })
  latitude?: number;

  @IsOptional()
  @IsString()
  signature?: string;

  @IsInt()
  borrowerId: number;

  @IsInt()
  chattelId: number;
}
