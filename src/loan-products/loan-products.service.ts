import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanProduct } from './entities/LoanProduct';
import { Repository } from 'typeorm';
import { CreateLoanProductDto } from './dtos/CreateLoanProduct.dto';

@Injectable()
export class LoanProductsService {
  constructor(
    @InjectRepository(LoanProduct)
    private loanRepo: Repository<LoanProduct>,
  ) {}

  create(dto: CreateLoanProductDto) {
    const loan = this.loanRepo.create(dto);
    return this.loanRepo.save(loan);
  }

  findAll() {
    return this.loanRepo.find();
  }

  async findOne(id: number) {
    const loan = await this.loanRepo.findOneBy({ id });
    if (!loan) throw new NotFoundException('Loan product not found');
    return loan;
  }

  async update(id: number, dto: CreateLoanProductDto) {
    await this.findOne(id);
    await this.loanRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.loanRepo.delete(id);
  }
}
