// src/chattels/chattel.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Borrower } from '../../borrower/entities/Borrower';
import { Guarantor } from '../../guarantor/entities/Guarantor';

export type ChattelCondition = 'new' | 'good' | 'fair' | 'poor';

@Entity()
export class Chattel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ['new', 'good', 'fair', 'poor'],
    default: 'good',
  })
  condition: ChattelCondition;

  @ManyToOne(() => Borrower, (borrower) => borrower.chattelDetails, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  borrower: Borrower;

  @ManyToOne(() => Guarantor, (guarantor) => guarantor.chattel, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  guarantor: Guarantor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
