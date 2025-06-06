import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanApplication } from './entities/LoanApplication';
import { CreateLoanApplicationDto } from './dtos/CreateApplication.dto';
import { UpdateLoanApplicationDto } from './dtos/UpdateApplication.dto';
import { LoanProduct } from 'src/loan-products/entities/LoanProduct';
import { Borrower } from 'src/borrower/entities/Borrower';
import { User } from 'src/users/entities/User';
import { Loan } from 'src/loan/entities/Loan';

@Injectable()
export class LoanApplicationService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanAppRepo: Repository<LoanApplication>,
    @InjectRepository(LoanProduct)
    private readonly loanProductRepo: Repository<LoanProduct>,
    @InjectRepository(Borrower)
    private readonly borrowerRepo: Repository<Borrower>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Loan)
    private readonly loanRepo: Repository<Loan>,
  ) {}

  async create(createDto: CreateLoanApplicationDto): Promise<LoanApplication> {
    // Fetch borrower entity
    const borrower = await this.borrowerRepo.findOne({
      where: { id: createDto.borrowerId },
    });
    if (!borrower) {
      throw new Error(`Borrower with id ${createDto.borrowerId} not found`);
    }

    // Fetch loan product entity
    const loanProduct = await this.loanProductRepo.findOne({
      where: { id: createDto.loanTypeId },
    });
    if (!loanProduct) {
      throw new Error(`Loan product with id ${createDto.loanTypeId} not found`);
    }

    // Calculate repayment amount based on loan product's interest rate and type
    const principal = createDto.amount;
    const durationMonths = createDto.durationMonths;
    const interestRate = loanProduct.interestRate;
    const interestType = loanProduct.interestType;

    let repaymentAmount = 0;
    if (interestType === 'flat') {
      const totalInterest =
        principal * (interestRate / 100) * (durationMonths / 12);
      repaymentAmount = principal + totalInterest;
    } else if (interestType === 'reducing_balance') {
      const monthlyInterestRate = interestRate / 100 / 12;
      const emi = this.calculateEMI(
        principal,
        monthlyInterestRate,
        durationMonths,
      );
      repaymentAmount = emi * durationMonths;
    } else {
      throw new Error('Unknown interest type');
    }
    repaymentAmount = parseFloat(repaymentAmount.toFixed(2));

    // Optionally fetch loan officer if provided
    let loanOfficer = null;
    if (createDto.loanOfficerId) {
      loanOfficer = await this.userRepo.findOne({
        where: { id: createDto.loanOfficerId },
      });
      if (!loanOfficer) {
        throw new Error(
          `Loan officer with id ${createDto.loanOfficerId} not found`,
        );
      }
    }

    // Create entity with related entities instead of IDs
    const loanApp = this.loanAppRepo.create({
      amount: createDto.amount,
      durationMonths: createDto.durationMonths,
      purpose: createDto.purpose,
      repaymentAmount,
      borrower, // assign full borrower entity
      loanType: loanProduct, // assign full loan product entity
      loanOfficer, // optional loan officer entity or null
    });

    return this.loanAppRepo.save(loanApp);
  }

  // Your EMI calculation helper method
  private calculateEMI(
    principal: number,
    monthlyInterestRate: number,
    totalMonths: number,
  ): number {
    if (principal <= 0 || monthlyInterestRate < 0 || totalMonths <= 0) {
      return 0;
    }
    if (monthlyInterestRate === 0) {
      return parseFloat((principal / totalMonths).toFixed(2));
    }
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    return parseFloat(emi.toFixed(2));
  }

  //   approve a loan
  async approveApplication(applicationId: number): Promise<Loan> {
    const loanApp = await this.loanAppRepo.findOne({
      where: { id: applicationId },
      relations: ['borrower', 'loanType', 'loanOfficer'],
    });

    if (!loanApp) throw new NotFoundException('Loan application not found');
    if (loanApp.status === 'approved')
      throw new Error('Application already approved');

    // const disbursedAmount = loanApp.amount;
    const repaymentAmount = loanApp.repaymentAmount;
    const outstandingBalance = repaymentAmount;

    const loan = this.loanRepo.create({
      loanCode: `LN${Date.now()}`,
      application: loanApp,
      disbursedAmount: 0,
      repaymentAmount,
      outstandingBalance,
      disbursementDate: null,
      status: 'pending_disbursement',
    });

    const savedLoan = await this.loanRepo.save(loan);

    // Update application status
    loanApp.status = 'approved';
    await this.loanAppRepo.save(loanApp);

    return savedLoan;
  }

  async rejectApplication(
    applicationId: number,
    reason?: string,
  ): Promise<Loan> {
    const loanApp = await this.loanAppRepo.findOne({
      where: { id: applicationId },
      relations: ['borrower', 'loanType', 'loanOfficer'],
    });

    if (!loanApp) {
      throw new NotFoundException('Loan application not found');
    }

    if (loanApp.status === 'approved') {
      throw new BadRequestException('Cannot reject an approved application');
    }

    if (loanApp.status === 'rejected') {
      throw new BadRequestException('Application is already rejected');
    }

    // Update application status
    loanApp.status = 'rejected';
    await this.loanAppRepo.save(loanApp);

    // Create rejected loan record
    const loan = this.loanRepo.create({
      loanCode: `LN${Date.now()}`,
      application: loanApp,
      disbursedAmount: 0,
      repaymentAmount: 0,
      outstandingBalance: 0,
      disbursementDate: null,
      status: 'rejected',
      rejectionReason: reason,
    });

    return this.loanRepo.save(loan);
  }

  async findAll(filters: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    loanType?: string;
    minRepayment?: number;
    maxRepayment?: number;
  }): Promise<{
    data: LoanApplication[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const query = this.loanAppRepo
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.borrower', 'borrower')
      .leftJoinAndSelect('loan.loanType', 'loanType');

    // Search by borrower's full name
    if (filters.search) {
      query.andWhere(
        `LOWER(CONCAT(borrower.firstName, ' ', borrower.middleName, ' ', borrower.lastName)) LIKE LOWER(:search)`,
        { search: `%${filters.search.trim()}%` },
      );
    }

    // Filter by loan status
    if (filters.status) {
      query.andWhere('loan.status = :status', { status: filters.status });
    }

    // Filter by loan type
    if (filters.loanType) {
      query.andWhere('loanType.loanName ILIKE :loanType', {
        loanType: `%${filters.loanType.trim()}%`,
      });
    }

    // Filter by repayment amount
    if (!isNaN(filters.minRepayment)) {
      query.andWhere('loan.repaymentAmount >= :minRepayment', {
        minRepayment: filters.minRepayment,
      });
    }

    if (!isNaN(filters.maxRepayment)) {
      query.andWhere('loan.repaymentAmount <= :maxRepayment', {
        maxRepayment: filters.maxRepayment,
      });
    }

    // Pagination defaults
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<LoanApplication> {
    const loanApp = await this.loanAppRepo.findOne({ where: { id } });
    if (!loanApp)
      throw new NotFoundException(`LoanApplication #${id} not found`);
    return loanApp;
  }

  async update(
    id: number,
    updateDto: UpdateLoanApplicationDto,
  ): Promise<LoanApplication> {
    const loanApp = await this.findOne(id);
    Object.assign(loanApp, updateDto);
    return this.loanAppRepo.save(loanApp);
  }

  async remove(id: number): Promise<void> {
    const result = await this.loanAppRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`LoanApplication #${id} not found`);
    }
  }
}
