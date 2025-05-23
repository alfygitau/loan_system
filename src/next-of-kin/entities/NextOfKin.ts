import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Borrower } from '../../borrower/entities/Borrower';

@Entity()
export class NextOfKin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  relationship: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  residence: string;

  @Column({ nullable: true })
  nearestLandmark: string;

  @OneToOne(() => Borrower, (borrower) => borrower.nextOfKin)
  borrower: Borrower;
}
