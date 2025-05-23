import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateIncomeDetailsDto } from './dtos/UpdateIncomeDetails.dto';
import { CreateIncomeDetailsDto } from './dtos/CreateIncomeDetails.dto';
import { IncomeDetails } from './entities/IncomeDetails';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeDetails)
    private readonly incomeRepo: Repository<IncomeDetails>,
  ) {}

  create(createDto: CreateIncomeDetailsDto) {
    const income = this.incomeRepo.create({
      ...createDto,
      borrower: { id: createDto.borrowerId },
    });
    return this.incomeRepo.save(income);
  }

  findAll() {
    return this.incomeRepo.find({});
  }

  async findOne(id: number) {
    const income = await this.incomeRepo.findOne({
      where: { id },
    });
    if (!income) throw new NotFoundException(`IncomeDetails #${id} not found`);
    return income;
  }

  async update(id: number, updateDto: UpdateIncomeDetailsDto) {
    const income = await this.incomeRepo.preload({
      id,
      ...updateDto,
      borrower: updateDto.borrowerId ? { id: updateDto.borrowerId } : undefined,
    });
    if (!income) throw new NotFoundException(`IncomeDetails #${id} not found`);
    return this.incomeRepo.save(income);
  }

  async remove(id: number) {
    const income = await this.findOne(id);
    return this.incomeRepo.remove(income);
  }
}
