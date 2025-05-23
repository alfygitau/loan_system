import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Borrower } from '../../borrower/entities/Borrower';

export type BusinessOwnership = 'family' | 'sole_proprietor' | 'partnership';

@Entity()
export class IncomeDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceOfIncome: string;

  @Column({ unique: true })
  kraPin: string;

  @Column()
  businessName: string;

  @Column()
  yearsOfOperation: number;

  @Column({
    type: 'enum',
    enum: ['family', 'sole_proprietor', 'partnership'],
  })
  businessOwnership: BusinessOwnership;

  @Column()
  typeOfBusiness: string;

  @Column()
  licenseRequired: boolean;

  @Column({ type: 'text', nullable: true })
  risksAssociated: string;

  @Column({ type: 'text', nullable: true })
  strengthOfBusiness: string;

  @Column()
  levelOfStability: string;

  @Column({ nullable: true })
  mpesaStatementUrl: string;

  @Column({ nullable: true })
  mpesaCode: string;

  @Column({ nullable: true })
  businessLatitude: string;

  @Column({ nullable: true })
  businessLongitude: string;

  @Column({ type: 'text', nullable: true })
  businessPhysicalAddress: string;

  @Column({ nullable: true })
  businessImageUrl: string;

  @Column({ type: 'text', nullable: true })
  businessLocationDescription: string;

  @Column({ nullable: true })
  residenceLatitude: string;

  @Column({ nullable: true })
  residenceLongitude: string;

  @Column({ type: 'text', nullable: true })
  residencePhysicalAddress: string;

  @Column({ nullable: true })
  residenceImageUrl: string;

  @Column({ type: 'text', nullable: true })
  residenceLocationDescription: string;

  @OneToOne(() => Borrower, (borrower) => borrower.incomeDetails)
  borrower: Borrower;
}
