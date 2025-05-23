// src/loan-repayment/loan-repayment.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanRepaymentDto } from './dtos/CreateLoanRepayment.dto';
import { UpdateLoanRepaymentDto } from './dtos/UpdateLoanRepayment.dto';
import { Loan } from 'src/loan/entities/Loan';
import { LoanRepayment } from './entities/Repayment';
import { LoanRepaymentSchedule } from 'src/loan-repayment/entities/LoanRepayment';

@Injectable()
export class RepaymentService {
  constructor(
    @InjectRepository(LoanRepayment)
    private repaymentRepo: Repository<LoanRepayment>,

    @InjectRepository(Loan)
    private loanRepo: Repository<Loan>,

    @InjectRepository(LoanRepaymentSchedule)
    private scheduleRepo: Repository<LoanRepaymentSchedule>,
  ) {}

  async repayLoan(dto: CreateLoanRepaymentDto): Promise<LoanRepayment> {
    const loan = await this.loanRepo.findOne({
      where: { id: dto.loanId },
      relations: ['schedule'],
    });
    if (!loan) throw new NotFoundException('Loan not found');
    if (loan.status !== 'active')
      throw new BadRequestException('Loan is not active');

    let remainingPayment = dto.amount;

    // Sort schedule by dueDate ascending, unpaid or partial only
    const schedules = loan.schedule
      .filter((s) => s.status === 'unpaid' || s.status === 'partial')
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    for (const schedule of schedules) {
      if (remainingPayment <= 0) break;

      const amountDue = +schedule.installmentAmount - +schedule.amountPaid;
      if (remainingPayment >= amountDue) {
        // Full payment for this schedule
        schedule.amountPaid = +schedule.amountPaid + amountDue;
        schedule.balance = 0;
        schedule.paymentDate = dto.paymentDate;
        schedule.status = 'paid';

        remainingPayment -= amountDue;
      } else {
        // Partial payment
        schedule.amountPaid = +schedule.amountPaid + remainingPayment;
        schedule.balance = +schedule.installmentAmount - +schedule.amountPaid;
        schedule.paymentDate = dto.paymentDate;
        schedule.status = 'partial';

        remainingPayment = 0;
      }

      await this.scheduleRepo.save(schedule);
    }

    // Update loan outstanding balance
    loan.outstandingBalance -= dto.amount;
    if (loan.outstandingBalance <= 0) {
      loan.outstandingBalance = 0;
      loan.status = 'closed';
    }

    await this.loanRepo.save(loan);

    // Create repayment record
    const repayment = this.repaymentRepo.create({
      loan,
      amount: dto.amount,
      paymentDate: dto.paymentDate,
      method: dto.method,
      phoneNumber: dto.phoneNumber,
      status: dto.status || 'success',
      balanceAfterPayment: loan.outstandingBalance,
    });

    return this.repaymentRepo.save(repayment);
  }

  findAll(): Promise<LoanRepayment[]> {
    return this.repaymentRepo.find({ relations: ['loan'] });
  }

  async findOne(id: number): Promise<LoanRepayment> {
    const repayment = await this.repaymentRepo.findOne({
      where: { id },
      relations: ['loan'],
    });
    if (!repayment) throw new NotFoundException('Repayment not found');
    return repayment;
  }

  async getRepaymentsByLoanId(loanId: string): Promise<LoanRepayment[]> {
    return this.repaymentRepo.find({
      where: { loan: { id: loanId } },
      order: { paymentDate: 'ASC' },
    });
  }

  async update(
    id: number,
    dto: UpdateLoanRepaymentDto,
  ): Promise<LoanRepayment> {
    const repayment = await this.findOne(id);
    Object.assign(repayment, dto);
    return this.repaymentRepo.save(repayment);
  }

  async remove(id: number): Promise<void> {
    const repayment = await this.findOne(id);
    await this.repaymentRepo.remove(repayment);
  }
}
