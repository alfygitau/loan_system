// src/guarantors/guarantor.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Borrower } from '../../borrower/entities/Borrower';
import { Chattel } from '../../chattel/entities/Chattel';

@Entity()
export class Guarantor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guarantorName: string;

  @Column()
  residence: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ nullable: true })
  signature: string;

  @ManyToOne(() => Borrower, (borrower) => borrower.guarantors, {
    onDelete: 'CASCADE',
  })
  borrower: Borrower;

  @OneToOne(() => Chattel, { cascade: true })
  @JoinColumn()
  chattel: Chattel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
