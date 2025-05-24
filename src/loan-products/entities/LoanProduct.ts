// src/loan-types/loan-type.entity.ts

import { LoanApplication } from 'src/loan-application/entities/LoanApplication';
import { columnNumericTransformer } from 'src/loan-application/transformers/decimal.transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export type LoanCategory = 'salaried' | 'business' | 'personal' | 'asset';
export type InterestType = 'flat' | 'reducing_balance';
export type RepaymentFrequency =
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly';

@Entity()
export class LoanProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['salaried', 'business', 'personal', 'asset'] })
  loanCategory: LoanCategory;

  @Column()
  loanName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  interestRate: number;

  @Column({ type: 'enum', enum: ['flat', 'reducing_balance'] })
  interestType: InterestType;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  minimumAmount: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: columnNumericTransformer,
  })
  maximumAmount: number;

  @Column({ type: 'int' }) // in months
  minimumDuration: number;

  @Column({ type: 'int' }) // in months
  maximumDuration: number;

  @Column({
    type: 'enum',
    enum: ['weekly', 'biweekly', 'monthly', 'quarterly'],
  })
  repaymentFrequency: RepaymentFrequency;

  @Column({ type: 'int', default: 0 }) // in days
  gracePeriod: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0.0,
    transformer: columnNumericTransformer,
  }) // penalty rate %
  penaltyRate: number;

  @Column({ type: 'int', default: 18 }) // min age for borrower
  minimumAge: number;

  @Column({ default: false })
  collateralRequired: boolean;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
    transformer: columnNumericTransformer,
  })
  processingFee: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
    transformer: columnNumericTransformer,
  })
  insuranceFee: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
    transformer: columnNumericTransformer,
  })
  otherCharges: number;

  @Column({ type: 'text', nullable: true })
  termsAndConditions: string;

  @Column({ type: 'text', nullable: true })
  documentsRequired: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
