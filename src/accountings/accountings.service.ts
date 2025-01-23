import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounting } from './entities/accounting.entity';

@Injectable()
export class AccountingsService {
  constructor(
    @InjectRepository(Accounting)
    private readonly accountingRepository: Repository<Accounting>,
  ) {}

  // Create a new accounting record
  async create(createAccountingDto: CreateAccountingDto) {
    try {
      const accounting = this.accountingRepository.create(createAccountingDto);
      return await this.accountingRepository.save(accounting);
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(
          'Invalid foreign key. The related record does not exist.',
        );
      } else if (error.code === '23505') {
        throw new ConflictException(
          'Duplicate record. A record with the same unique constraints already exists.',
        );
      } else if (error.message.includes('foreign key constraint')) {
        throw new BadRequestException(
          'Invalid foreign key. The related record does not exist.',
        );
      } else {
        throw new InternalServerErrorException(
          'Failed to create accounting record.',
        );
      }
    }
  }

  // Find all accounting records
  async findAll() {
    try {
      return await this.accountingRepository.find({
        relations: ['property', 'tenant'],
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch accounting records');
    }
  }

  // Find a single accounting record by ID
  async findOne(id: number) {
    const accounting = await this.accountingRepository.findOne({
      where: { id },
      relations: ['property', 'tenant'],
    });

    if (!accounting) {
      throw new NotFoundException(`Accounting record with ID ${id} not found`);
    }

    return accounting;
  }

  // Update an accounting record by ID
  async update(id: number, updateAccountingDto: UpdateAccountingDto) {
    const accounting = await this.findOne(id);

    try {
      await this.accountingRepository.update(id, updateAccountingDto);
      return { ...accounting, ...updateAccountingDto }; // Return the updated record
    } catch (error) {
      throw new BadRequestException('Failed to update accounting record');
    }
  }

  // Delete an accounting record by ID
  async remove(id: number) {
    const accounting = await this.findOne(id);

    try {
      await this.accountingRepository.delete(id);
      return {
        message: `Accounting record with ID ${id} successfully deleted`,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete accounting record');
    }
  }
}
