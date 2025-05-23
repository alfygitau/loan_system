import {
  IsString,
  IsOptional,
  IsNumber,
  IsEmail,
  IsInt,
} from 'class-validator';

export class UpdateGuarantorDto {
  @IsOptional()
  @IsString()
  guarantorName?: string;

  @IsOptional()
  @IsString()
  residence?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

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

  @IsOptional()
  @IsInt()
  borrowerId?: number;

  @IsOptional()
  @IsInt()
  chattelId?: number;
}
