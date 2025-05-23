import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Borrower } from '../../borrower/entities/Borrower';

export type MaritalStatus =
  | 'single'
  | 'married'
  | 'divorced'
  | 'widowed'
  | 'separated';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  alternatePhoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['single', 'married', 'divorced', 'widowed', 'separated'],
    nullable: true,
  })
  maritalStatus: MaritalStatus;

  @Column({ type: 'int', nullable: true })
  numberOfDependants: number;

  @Column({ nullable: true })
  poBox: string;

  @OneToOne(() => Borrower, (borrower) => borrower.contact)
  borrower: Borrower;
}
