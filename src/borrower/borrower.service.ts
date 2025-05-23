import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrower } from './entities/Borrower';
import { UpdateBorrowerDto } from './dtos/UpdateBorrower.dto';
import { Repository } from 'typeorm';
import { CreateBorrowerDto } from './dtos/CreateBorrower.dto';

@Injectable()
export class BorrowerService {
  constructor(
    @InjectRepository(Borrower)
    private readonly borrowerRepository: Repository<Borrower>,
  ) {}

  async create(createBorrowerDto: CreateBorrowerDto): Promise<Borrower> {
    const borrower = this.borrowerRepository.create(createBorrowerDto);
    return this.borrowerRepository.save(borrower);
  }

  async findAll(): Promise<Borrower[]> {
    return this.borrowerRepository.find();
  }

  async findOne(id: number): Promise<Borrower> {
    const borrower = await this.borrowerRepository.findOne({ where: { id } });
    if (!borrower) {
      throw new NotFoundException(`Borrower with ID ${id} not found`);
    }
    return borrower;
  }

  async update(
    id: number,
    updateBorrowerDto: UpdateBorrowerDto,
  ): Promise<Borrower> {
    await this.findOne(id);
    await this.borrowerRepository.update(id, updateBorrowerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.borrowerRepository.delete(id);
  }
}
