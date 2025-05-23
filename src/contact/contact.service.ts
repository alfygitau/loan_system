import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateContactDto } from './dtos/UpdateContact.dto';
import { Contact } from './entities/Contact';
import { CreateContactDto } from './dtos/CreateContact.dto';
import { Repository } from 'typeorm';
import { Borrower } from 'src/borrower/entities/Borrower';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,

    @InjectRepository(Borrower)
    private borrowerRepo: Repository<Borrower>,
  ) {}

  async create(createDto: CreateContactDto): Promise<Contact> {
    const borrower = await this.borrowerRepo.findOneBy({
      id: createDto.borrowerId,
    });
    if (!borrower) throw new NotFoundException('Borrower not found');

    const contact = this.contactRepo.create({
      ...createDto,
      borrower,
    });
    return this.contactRepo.save(contact);
  }

  findAll(): Promise<Contact[]> {
    return this.contactRepo.find({});
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepo.findOne({
      where: { id },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async update(id: number, updateDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.findOne(id);
    Object.assign(contact, updateDto);

    if (updateDto.borrowerId) {
      const borrower = await this.borrowerRepo.findOneBy({
        id: updateDto.borrowerId,
      });
      if (!borrower) throw new NotFoundException('Borrower not found');
      contact.borrower = borrower;
    }

    return this.contactRepo.save(contact);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.findOne(id);
    await this.contactRepo.remove(contact);
  }
}
