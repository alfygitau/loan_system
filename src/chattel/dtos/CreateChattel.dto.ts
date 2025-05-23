import { IsString, IsOptional, IsEnum, IsInt, IsNumber } from 'class-validator';
import { ChattelCondition } from '../entities/Chattel';

export class CreateChattelDto {
  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsEnum(['new', 'good', 'fair', 'poor'])
  condition: ChattelCondition;

  @IsOptional()
  @IsInt()
  borrowerId?: number;

  @IsOptional()
  @IsInt()
  guarantorId?: number;
}
