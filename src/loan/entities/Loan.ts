import { LoanApplication } from 'src/loan-application/entities/LoanApplication';
import { columnNumericTransformer } from 'src/loan-application/transformers/decimal.transformer';
import { LoanRepaymentSchedule } from 'src/loan-repayment/entities/LoanRepayment';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  loanCode: string;

  @Column({ type: 'decimal', transformer: columnNumericTransformer })
  disbursedAmount: number;

  @Column({ type: 'decimal', transformer: columnNumericTransformer })
  repaymentAmount: number;

  @Column({ type: 'decimal', transformer: columnNumericTransformer })
  outstandingBalance: number;

  @Column({ nullable: true })
  disbursementDate: Date;

  @Column({ default: 'active' })
  status: 'active' | 'closed' | 'defaulted' | 'pending_disbursement';

  @ManyToOne(() => LoanApplication, { eager: true })
  application: LoanApplication;

  @OneToMany(() => LoanRepaymentSchedule, (s) => s.loan)
  schedule: LoanRepaymentSchedule[];
}
