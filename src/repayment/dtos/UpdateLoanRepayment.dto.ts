// src/loan-repayment/dtos/UpdateLoanRepayment.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanRepaymentDto } from './CreateLoanRepayment.dto';

export class UpdateLoanRepaymentDto extends PartialType(CreateLoanRepaymentDto) {}
