import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Contact } from '../../contact/entities/Contact';
import { NextOfKin } from '../../next-of-kin/entities/NextOfKin';
import { IncomeDetails } from '../../income/entities/IncomeDetails';
import { Chattel } from '../../chattel/entities/Chattel';
import { Guarantor } from '../../guarantor/entities/Guarantor';
import { LoanApplication } from 'src/loan-application/entities/LoanApplication';

export type IdType = 'National Id' | 'Passport Id';
export type Gender = 'male' | 'female' | 'other';

@Entity()
export class Borrower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['National Id', 'Passport Id'] })
  idType: IdType;

  @Column()
  country: string;

  @Column({ unique: true })
  idNumber: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: Gender;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'text', nullable: true })
  signature: string;

  @OneToOne(() => Contact, (contact) => contact.borrower, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  contact: Contact;

  @OneToOne(() => NextOfKin, (nextOfKin) => nextOfKin.borrower, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  nextOfKin: NextOfKin;

  @OneToOne(() => IncomeDetails, (incomeDetail) => incomeDetail.borrower, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  incomeDetails: IncomeDetails;

  @OneToMany(() => Chattel, (chattelDetail) => chattelDetail.borrower, {
    cascade: true,
    eager: true,
  })
  chattelDetails: Chattel[];

  @OneToMany(() => Guarantor, (guarantor) => guarantor.borrower, {
    cascade: true,
    eager: true,
  })
  guarantors: Guarantor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
