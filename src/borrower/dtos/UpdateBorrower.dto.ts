import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowerDto } from './CreateBorrower.dto';

export class UpdateBorrowerDto extends PartialType(CreateBorrowerDto) {}
