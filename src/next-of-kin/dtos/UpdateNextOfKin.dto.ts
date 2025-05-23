import { PartialType } from '@nestjs/mapped-types';
import { CreateNextOfKinDto } from './CreateNextOfKin.dto';

export class UpdateNextOfKinDto extends PartialType(CreateNextOfKinDto) {}
