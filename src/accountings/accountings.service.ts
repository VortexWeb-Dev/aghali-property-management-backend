import { Injectable } from '@nestjs/common';
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

  create(createAccountingDto: CreateAccountingDto) {
    const accounting = this.accountingRepository.create(createAccountingDto);
    return this.accountingRepository.save(accounting);
  }

  findAll() {
    return this.accountingRepository.find();
  }

  findOne(id: number) {
    return this.accountingRepository.findOne({ where: { id }, relations: ['property', 'tenant'] });
  }

  update(id: number, updateAccountingDto: UpdateAccountingDto) {
    return this.accountingRepository.update(id, updateAccountingDto);
  }

  remove(id: number) {
    return this.accountingRepository.delete(id);
  }
}
