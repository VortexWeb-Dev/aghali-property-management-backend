import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lease } from './entities/lease.entity';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class LeasesService {
  private readonly logger = new Logger(LeasesService.name);

  constructor(
    @InjectRepository(Lease)
    private readonly leaseRepository: Repository<Lease>,
  ) {}

  async create(createLeaseDto: CreateLeaseDto) {
    try {
      const lease = this.leaseRepository.create(createLeaseDto);
      await this.leaseRepository.save(lease);
      this.logger.log(`Lease record created: ${lease.id}`);
      return lease;
    } catch (error) {
      this.logger.error(`Error creating lease record: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const leases = await this.leaseRepository
        .createQueryBuilder('lease')
        .leftJoinAndSelect('lease.property', 'property')
        .leftJoinAndSelect('lease.tenant', 'tenant')
        .getMany();

      if (!leases.length) {
        this.logger.warn('No lease records found');
      }
      return leases;
    } catch (error) {
      this.logger.error(`Error fetching lease records: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const lease = await this.leaseRepository.findOne({
        where: { id },
        relations: ['property', 'tenant'],
      });
      if (!lease) {
        throw new NotFoundException(`Lease record with ID ${id} not found`);
      }
      return lease;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error fetching lease record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async update(id: number, updateLeaseDto: UpdateLeaseDto) {
    try {
      const result = await this.leaseRepository.update(id, updateLeaseDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Lease record with ID ${id} not found`);
      }
      this.logger.log(`Lease record with ID ${id} updated`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error updating lease record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.leaseRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Lease record with ID ${id} not found`);
      }
      this.logger.log(`Lease record with ID ${id} removed`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error removing lease record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }
}
