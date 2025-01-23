import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);

  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const property = this.propertyRepository.create(createPropertyDto);
      await this.propertyRepository.save(property);
      this.logger.log(`Property created with ID: ${property.id}`);
      return property;
    } catch (error) {
      this.logger.error(`Error creating property: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const properties = await this.propertyRepository.find();
      if (!properties.length) {
        this.logger.warn('No properties found');
      }
      return properties;
    } catch (error) {
      this.logger.error(`Error fetching properties: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const property = await this.propertyRepository.findOneBy({ id });
      if (!property) {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }
      return property;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error fetching property with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    try {
      const result = await this.propertyRepository.update(
        id,
        updatePropertyDto,
      );
      if (result.affected === 0) {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }
      this.logger.log(`Property with ID ${id} updated`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error updating property with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.propertyRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }
      this.logger.log(`Property with ID ${id} removed`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error removing property with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }
}
