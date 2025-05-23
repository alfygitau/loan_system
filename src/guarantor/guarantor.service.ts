import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guarantor } from './entities/Guarantor';
import { Repository } from 'typeorm';
import { Borrower } from 'src/borrower/entities/Borrower';
import { Chattel } from 'src/chattel/entities/Chattel';
import { CreateGuarantorDto } from './dtos/CreateGuarantor.dto';
import { UpdateGuarantorDto } from './dtos/UpdateGuarantor.dto';

@Injectable()
export class GuarantorService {
  constructor(
    @InjectRepository(Guarantor)
    private readonly guarantorRepository: Repository<Guarantor>,

    @InjectRepository(Borrower)
    private readonly borrowerRepository: Repository<Borrower>,

    @InjectRepository(Chattel)
    private readonly chattelRepository: Repository<Chattel>,
  ) {}

  async create(createDto: CreateGuarantorDto): Promise<Guarantor> {
    const borrower = await this.borrowerRepository.findOneBy({
      id: createDto.borrowerId,
    });
    if (!borrower) {
      throw new NotFoundException(
        `Borrower with ID ${createDto.borrowerId} not found`,
      );
    }

    const chattel = await this.chattelRepository.findOneBy({
      id: createDto.chattelId,
    });
    if (!chattel) {
      throw new NotFoundException(
        `Chattel with ID ${createDto.chattelId} not found`,
      );
    }

    const guarantor = this.guarantorRepository.create({
      ...createDto,
      borrower,
      chattel,
    });
    return this.guarantorRepository.save(guarantor);
  }

  findAll(): Promise<Guarantor[]> {
    return this.guarantorRepository.find({});
  }

  async findOne(id: number): Promise<Guarantor> {
    const guarantor = await this.guarantorRepository.findOne({
      where: { id },
    });
    if (!guarantor) {
      throw new NotFoundException(`Guarantor with ID ${id} not found`);
    }
    return guarantor;
  }

  async update(id: number, updateDto: UpdateGuarantorDto): Promise<Guarantor> {
    const guarantor = await this.findOne(id);

    if (updateDto.borrowerId) {
      const borrower = await this.borrowerRepository.findOneBy({
        id: updateDto.borrowerId,
      });
      if (!borrower) {
        throw new NotFoundException(
          `Borrower with ID ${updateDto.borrowerId} not found`,
        );
      }
      guarantor.borrower = borrower;
    }

    if (updateDto.chattelId) {
      const chattel = await this.chattelRepository.findOneBy({
        id: updateDto.chattelId,
      });
      if (!chattel) {
        throw new NotFoundException(
          `Chattel with ID ${updateDto.chattelId} not found`,
        );
      }
      guarantor.chattel = chattel;
    }

    Object.assign(guarantor, updateDto);

    return this.guarantorRepository.save(guarantor);
  }

  async remove(id: number): Promise<void> {
    const guarantor = await this.findOne(id);
    await this.guarantorRepository.remove(guarantor);
  }
}
