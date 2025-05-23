import { Module } from '@nestjs/common';
import { ChattelService } from './chattel.service';
import { ChattelController } from './chattel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chattel } from './entities/Chattel';
import { Borrower } from 'src/borrower/entities/Borrower';
import { Guarantor } from 'src/guarantor/entities/Guarantor';

@Module({
  imports: [TypeOrmModule.forFeature([Chattel, Borrower, Guarantor])],
  providers: [ChattelService],
  controllers: [ChattelController],
})
export class ChattelModule {}
