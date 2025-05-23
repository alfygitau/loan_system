import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanRepaymentSchedule } from './entities/LoanRepayment';
import { Loan } from 'src/loan/entities/Loan';
import { CreateLoanRepaymentScheduleDto } from './dtos/CreateLoanRepayment.dto';
import { UpdateLoanRepaymentScheduleDto } from './dtos/UpdateLoanRepayment.dto';

@Injectable()
export class LoanRepaymentService {
  constructor(
    @InjectRepository(LoanRepaymentSchedule)
    private scheduleRepo: Repository<LoanRepaymentSchedule>,

    @InjectRepository(Loan)
    private loanRepo: Repository<Loan>,
  ) {}

  async create(dto: CreateLoanRepaymentScheduleDto) {
    const loan = await this.loanRepo.findOne({ where: { id: dto.loanId } });
    if (!loan) throw new NotFoundException('Loan not found');

    const schedule = this.scheduleRepo.create({
      ...dto,
      loan,
    });
    return this.scheduleRepo.save(schedule);
  }

  findAll() {
    return this.scheduleRepo.find({ relations: ['loan'] });
  }

  findOne(id: number) {
    return this.scheduleRepo.findOne({ where: { id }, relations: ['loan'] });
  }

  async update(id: number, dto: UpdateLoanRepaymentScheduleDto) {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Schedule not found');

    Object.assign(schedule, dto);
    return this.scheduleRepo.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Schedule not found');

    return this.scheduleRepo.remove(schedule);
  }
}
