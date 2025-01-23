import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  // Create a new contact
  async create(createContactDto: CreateContactDto) {
    try {
      const contact = this.contactRepository.create(createContactDto);
      return await this.contactRepository.save(contact);
    } catch (error) {
      throw new BadRequestException('Failed to create contact');
    }
  }

  // Get all contacts
  async findAll() {
    try {
      return await this.contactRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch contacts');
    }
  }

  // Get a single contact by ID
  async findOne(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  // Update an existing contact
  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id);

    try {
      await this.contactRepository.update(id, updateContactDto);
      return { ...contact, ...updateContactDto }; // Return the updated record
    } catch (error) {
      throw new BadRequestException('Failed to update contact');
    }
  }

  // Remove a contact by ID
  async remove(id: number) {
    const contact = await this.findOne(id);

    try {
      await this.contactRepository.delete(id);
      return { message: `Contact with ID ${id} successfully deleted` };
    } catch (error) {
      throw new BadRequestException('Failed to delete contact');
    }
  }
}
