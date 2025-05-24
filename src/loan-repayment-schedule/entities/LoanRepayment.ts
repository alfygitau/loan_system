import { columnNumericTransformer } from 'src/loan-application/transformers/decimal.transformer';
import { Loan } from 'src/loan/entities/Loan';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LoanRepaymentSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Loan, (loan) => loan.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'loanId' })
  loan: Loan;

  @Column()
  dueDate: Date;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  installmentAmount: number;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    default: 0,
    transformer: columnNumericTransformer,
  })
  amountPaid: number;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  balance: number;

  @Column({ nullable: true })
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: ['unpaid', 'paid', 'partial', 'late'],
    default: 'unpaid',
  })
  status: 'unpaid' | 'paid' | 'partial' | 'late';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
