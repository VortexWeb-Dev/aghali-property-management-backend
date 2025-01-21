import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  findAll() {
    return this.propertyRepository.find();
  }

  findOne(id: number) {
    return this.propertyRepository.findOneBy({ id });
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.propertyRepository.update(id, updatePropertyDto);
  }

  remove(id: number) {
    return this.propertyRepository.delete(id);
  }
}
