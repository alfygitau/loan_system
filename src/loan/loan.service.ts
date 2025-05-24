import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanApplication } from 'src/loan-application/entities/LoanApplication';
import { Loan } from './entities/Loan';
import { CreateLoanDto } from './dtos/CreateLoan.dto';
import { UpdateLoanDto } from './dtos/UpdateLoan.dto';
import { addMonths } from 'date-fns';
import { LoanRepaymentSchedule } from 'src/loan-repayment-schedule/entities/LoanRepayment';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepo: Repository<Loan>,
    @InjectRepository(LoanApplication)
    private loanAppRepo: Repository<LoanApplication>,
    @InjectRepository(LoanRepaymentSchedule)
    private scheduleRepo: Repository<LoanRepaymentSchedule>,
  ) {}

  async create(dto: CreateLoanDto): Promise<Loan> {
    const application = await this.loanAppRepo.findOne({
      where: { id: dto.applicationId },
    });

    if (!application) throw new NotFoundException('Loan application not found');

    const loan = this.loanRepo.create({
      loanCode: `LN-${Date.now()}`,
      disbursedAmount: dto.disbursedAmount,
      repaymentAmount: dto.repaymentAmount,
      outstandingBalance: dto.outstandingBalance,
      disbursementDate: dto.disbursementDate,
      status: dto.status,
      application,
    });

    return this.loanRepo.save(loan);
  }

  findAll(): Promise<Loan[]> {
    return this.loanRepo.find({ relations: ['schedule'] });
  }

  async findOne(id: string): Promise<Loan> {
    const loan = await this.loanRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!loan) throw new NotFoundException('Loan not found');
    return loan;
  }

  async update(id: string, dto: UpdateLoanDto): Promise<Loan> {
    const loan = await this.findOne(id);
    Object.assign(loan, dto);
    return this.loanRepo.save(loan);
  }

  async remove(id: string): Promise<void> {
    const loan = await this.findOne(id);
    await this.loanRepo.remove(loan);
  }

  async disburseLoan(id: string, amount: number): Promise<Loan> {
    const loan = await this.findOne(id);

    if (loan.status !== 'pending_disbursement') {
      throw new Error('Loan is not in a state that can be disbursed');
    }

    loan.disbursedAmount = amount;
    loan.disbursementDate = new Date();
    loan.status = 'active';

    const savedLoan = await this.loanRepo.save(loan);
    await this.generateRepaymentSchedule(savedLoan);

    return savedLoan;
  }

  async getScheduleByLoanId(loanId: string): Promise<LoanRepaymentSchedule[]> {
    const schedules = await this.scheduleRepo.find({
      where: {
        loan: { id: loanId },
      },
      order: {
        dueDate: 'ASC',
      },
    });

    if (!schedules.length) {
      throw new NotFoundException('No schedule found for this loan');
    }

    return schedules;
  }

  async generateRepaymentSchedule(loan: Loan) {
    const { repaymentAmount, disbursementDate, application } = loan;

    // Example defaults, adapt to your application model
    const durationMonths = application?.durationMonths ?? 12;
    const installmentAmount = Number(
      (repaymentAmount / durationMonths).toFixed(2),
    );

    const schedules: LoanRepaymentSchedule[] = [];

    for (let i = 1; i <= durationMonths; i++) {
      const dueDate = addMonths(disbursementDate, i);

      const schedule = this.loanRepo.manager.create(LoanRepaymentSchedule, {
        loan,
        dueDate,
        installmentAmount,
        amountPaid: 0,
        balance: installmentAmount,
        status: 'unpaid',
      });
      schedules.push(schedule);
    }

    await this.loanRepo.manager.save(LoanRepaymentSchedule, schedules);
  }
}
