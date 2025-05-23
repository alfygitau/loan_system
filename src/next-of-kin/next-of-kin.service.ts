import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextOfKin } from './entities/NextOfKin';
import { Repository } from 'typeorm';
import { Borrower } from 'src/borrower/entities/Borrower';
import { CreateNextOfKinDto } from './dtos/CreateNextOfKin.dto';
import { UpdateNextOfKinDto } from './dtos/UpdateNextOfKin.dto';

@Injectable()
export class NextOfKinService {
  constructor(
    @InjectRepository(NextOfKin)
    private nextOfKinRepo: Repository<NextOfKin>,

    @InjectRepository(Borrower)
    private borrowerRepo: Repository<Borrower>,
  ) {}

  async create(dto: CreateNextOfKinDto): Promise<NextOfKin> {
    const borrower = await this.borrowerRepo.findOne({
      where: { id: dto.borrowerId },
    });
    if (!borrower) throw new NotFoundException('Borrower not found');

    const nextOfKin = this.nextOfKinRepo.create({ ...dto, borrower });
    return this.nextOfKinRepo.save(nextOfKin);
  }

  findAll(): Promise<NextOfKin[]> {
    return this.nextOfKinRepo.find({});
  }

  findOne(id: number): Promise<NextOfKin> {
    return this.nextOfKinRepo.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateNextOfKinDto): Promise<NextOfKin> {
    const nextOfKin = await this.nextOfKinRepo.findOneBy({ id });
    if (!nextOfKin) throw new NotFoundException('Next of Kin not found');

    if (dto.borrowerId) {
      const borrower = await this.borrowerRepo.findOneBy({
        id: dto.borrowerId,
      });
      if (!borrower) throw new NotFoundException('Borrower not found');
      nextOfKin.borrower = borrower;
    }

    Object.assign(nextOfKin, dto);
    return this.nextOfKinRepo.save(nextOfKin);
  }

  async remove(id: number): Promise<void> {
    const result = await this.nextOfKinRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Next of Kin not found');
  }
}
