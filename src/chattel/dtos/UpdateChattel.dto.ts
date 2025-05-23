import { PartialType } from '@nestjs/mapped-types';
import { CreateChattelDto } from './CreateChattel.dto';

export class UpdateChattelDto extends PartialType(CreateChattelDto) {}
