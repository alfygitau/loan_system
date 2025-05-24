import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/User';
import { Borrower } from 'src/borrower/entities/Borrower';
import { LoanProduct } from 'src/loan-products/entities/LoanProduct';
import { columnNumericTransformer } from '../transformers/decimal.transformer';

export type LoanStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'disbursed'
  | 'closed';

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Borrower, {
    eager: true,
  })
  @JoinColumn({ name: 'borrowerId' })
  borrower: Borrower;

  @ManyToOne(() => LoanProduct, {
    eager: true,
  })
  @JoinColumn({ name: 'loanTypeId' })
  loanType: LoanProduct;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'loanOfficerId' })
  loanOfficer: User;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  amount: number;

  @Column('int')
  durationMonths: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'disbursed', 'closed'],
    default: 'pending',
  })
  status: LoanStatus;

  @Column()
  purpose: string;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  repaymentAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
