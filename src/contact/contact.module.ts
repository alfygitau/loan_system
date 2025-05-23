import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from '../borrower/entities/Borrower';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact } from './entities/Contact';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Borrower])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
