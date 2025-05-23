// src/loan-types/loan-type.entity.ts

import { LoanApplication } from 'src/loan-application/entities/LoanApplication';
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

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interestRate: number;

  @Column({ type: 'enum', enum: ['flat', 'reducing_balance'] })
  interestType: InterestType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  minimumAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
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

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 }) // penalty rate %
  penaltyRate: number;

  @Column({ type: 'int', default: 18 }) // min age for borrower
  minimumAge: number;

  @Column({ default: false })
  collateralRequired: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  processingFee: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  insuranceFee: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.0 })
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
