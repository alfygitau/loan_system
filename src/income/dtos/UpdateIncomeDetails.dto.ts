import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDetailsDto } from './CreateIncomeDetails.dto';

export class UpdateIncomeDetailsDto extends PartialType(
  CreateIncomeDetailsDto,
) {}
