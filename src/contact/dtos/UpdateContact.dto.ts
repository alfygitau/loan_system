import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './CreateContact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
