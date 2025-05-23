import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanProductDto } from './CreateLoanProduct.dto';

export class UpdateLoanTypeDto extends PartialType(CreateLoanProductDto) {}
