import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chattel } from './entities/Chattel';
import { Repository } from 'typeorm';
import { Borrower } from 'src/borrower/entities/Borrower';
import { Guarantor } from 'src/guarantor/entities/Guarantor';
import { CreateChattelDto } from './dtos/CreateChattel.dto';
import { UpdateChattelDto } from './dtos/UpdateChattel.dto';

@Injectable()
export class ChattelService {
  constructor(
    @InjectRepository(Chattel)
    private readonly chattelRepository: Repository<Chattel>,

    @InjectRepository(Borrower)
    private readonly borrowerRepository: Repository<Borrower>,

    @InjectRepository(Guarantor)
    private readonly guarantorRepository: Repository<Guarantor>,
  ) {}

  async create(createChattelDto: CreateChattelDto): Promise<Chattel> {
    const chattel = new Chattel();
    chattel.location = createChattelDto.location;
    chattel.description = createChattelDto.description;
    chattel.imageUrl = createChattelDto.imageUrl;
    chattel.condition = createChattelDto.condition;

    if (createChattelDto.borrowerId) {
      const borrower = await this.borrowerRepository.findOne({
        where: { id: createChattelDto.borrowerId },
      });
      if (!borrower) throw new NotFoundException('Borrower not found');
      chattel.borrower = borrower;
    }

    if (createChattelDto.guarantorId) {
      const guarantor = await this.guarantorRepository.findOne({
        where: { id: createChattelDto.guarantorId },
      });
      if (!guarantor) throw new NotFoundException('Guarantor not found');
      chattel.guarantor = guarantor;
    }

    return this.chattelRepository.save(chattel);
  }

  async findAll(): Promise<Chattel[]> {
    return this.chattelRepository.find({});
  }

  async findOne(id: number): Promise<Chattel> {
    const chattel = await this.chattelRepository.findOne({
      where: { id },
    });
    if (!chattel) {
      throw new NotFoundException(`Chattel with id ${id} not found`);
    }
    return chattel;
  }

  async update(
    id: number,
    updateChattelDto: UpdateChattelDto,
  ): Promise<Chattel> {
    const chattel = await this.findOne(id);

    if (updateChattelDto.location !== undefined) {
      chattel.location = updateChattelDto.location;
    }
    if (updateChattelDto.description !== undefined) {
      chattel.description = updateChattelDto.description;
    }
    if (updateChattelDto.imageUrl !== undefined) {
      chattel.imageUrl = updateChattelDto.imageUrl;
    }
    if (updateChattelDto.condition !== undefined) {
      chattel.condition = updateChattelDto.condition;
    }

    if (updateChattelDto.borrowerId !== undefined) {
      if (updateChattelDto.borrowerId === null) {
        chattel.borrower = null;
      } else {
        const borrower = await this.borrowerRepository.findOne({
          where: { id: updateChattelDto.borrowerId },
        });
        if (!borrower) throw new NotFoundException('Borrower not found');
        chattel.borrower = borrower;
      }
    }

    if (updateChattelDto.guarantorId !== undefined) {
      if (updateChattelDto.guarantorId === null) {
        chattel.guarantor = null;
      } else {
        const guarantor = await this.guarantorRepository.findOne({
          where: { id: updateChattelDto.guarantorId },
        });
        if (!guarantor) throw new NotFoundException('Guarantor not found');
        chattel.guarantor = guarantor;
      }
    }

    return this.chattelRepository.save(chattel);
  }

  async remove(id: number): Promise<void> {
    const chattel = await this.findOne(id);
    await this.chattelRepository.remove(chattel);
  }
}
