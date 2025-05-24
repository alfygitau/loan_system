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

  async findAll(filters: {
    page: number;
    limit: number;
    search?: string;
    loanOfficer?: string;
    status?: string;
    minRepayment?: number;
    maxRepayment?: number;
    loanType?: string;
    minBalance?: number;
    maxBalance?: number;
  }) {
    // Convert numeric filters from strings to numbers if needed
    const minRepayment =
      filters.minRepayment !== undefined
        ? Number(filters.minRepayment)
        : undefined;
    const maxRepayment =
      filters.maxRepayment !== undefined
        ? Number(filters.maxRepayment)
        : undefined;
    const minBalance =
      filters.minBalance !== undefined ? Number(filters.minBalance) : undefined;
    const maxBalance =
      filters.maxBalance !== undefined ? Number(filters.maxBalance) : undefined;

    const query = this.loanRepo
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.application', 'application')
      .leftJoinAndSelect('application.borrower', 'borrower')
      .leftJoinAndSelect('application.loanType', 'loanType')
      .leftJoinAndSelect('application.loanOfficer', 'loanOfficer');

    // Search by borrower full name
    if (filters.search) {
      query.andWhere(
        `LOWER(CONCAT(borrower.firstName, ' ', borrower.lastName)) LIKE LOWER(:search)`,
        { search: `%${filters.search}%` },
      );
    }

    if (filters.loanOfficer) {
      query.andWhere('loanOfficer.name ILIKE :loanOfficer', {
        loanOfficer: `%${filters.loanOfficer}%`,
      });
    }

    // Filter by loan status
    if (filters.status) {
      query.andWhere('loan.status = :status', { status: filters.status });
    }

    // Filter by loan type name (partial match)
    if (filters.loanType) {
      query.andWhere('loanType.loanName ILIKE :loanType', {
        loanType: `%${filters.loanType}%`,
      });
    }

    // Filter by repayment amount range
    if (!isNaN(minRepayment)) {
      query.andWhere('loan.repaymentAmount >= :minRepayment', {
        minRepayment,
      });
    }
    if (!isNaN(maxRepayment)) {
      query.andWhere('loan.repaymentAmount <= :maxRepayment', {
        maxRepayment,
      });
    }

    // Filter by outstanding balance range
    if (!isNaN(minBalance)) {
      query.andWhere('loan.outstandingBalance >= :minBalance', {
        minBalance,
      });
    }
    if (!isNaN(maxBalance)) {
      query.andWhere('loan.outstandingBalance <= :maxBalance', {
        maxBalance,
      });
    }

    // Pagination
    query.skip((filters.page - 1) * filters.limit).take(filters.limit);
    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(total / filters.limit),
    };
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
