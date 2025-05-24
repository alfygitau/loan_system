import { columnNumericTransformer } from 'src/loan-application/transformers/decimal.transformer';
import { Loan } from 'src/loan/entities/Loan';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LoanRepayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Loan, { onDelete: 'CASCADE' })
  loan: Loan;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  amount: number;

  @Column()
  paymentDate: Date;

  @Column({ nullable: true })
  method: string; // e.g., 'mpesa', 'bank'

  @Column({ nullable: true })
  phoneNumber: string; // payer's phone number

  @Column({
    type: 'enum',
    enum: ['success', 'failed', 'pending'],
    default: 'success',
  })
  status: 'success' | 'failed' | 'pending';

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  balanceAfterPayment: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
