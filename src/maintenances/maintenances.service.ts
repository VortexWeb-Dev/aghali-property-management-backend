import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class MaintenancesService {
  private readonly logger = new Logger(MaintenancesService.name);

  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  async create(createMaintenanceDto: CreateMaintenanceDto) {
    try {
      const maintenance =
        this.maintenanceRepository.create(createMaintenanceDto);
      await this.maintenanceRepository.save(maintenance);
      this.logger.log(`Maintenance record created: ${maintenance.id}`);
      return maintenance;
    } catch (error) {
      this.logger.error(`Error creating maintenance record: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const maintenances = await this.maintenanceRepository.find();
      if (!maintenances.length) {
        this.logger.warn('No maintenance records found');
      }
      return maintenances;
    } catch (error) {
      this.logger.error(`Error fetching maintenance records: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const maintenance = await this.maintenanceRepository.findOne({
        where: { id },
        relations: ['property', 'tenant'],
      });
      if (!maintenance) {
        throw new NotFoundException(
          `Maintenance record with ID ${id} not found`,
        );
      }
      return maintenance;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error fetching maintenance record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    try {
      const result = await this.maintenanceRepository.update(
        id,
        updateMaintenanceDto,
      );
      if (result.affected === 0) {
        throw new NotFoundException(
          `Maintenance record with ID ${id} not found`,
        );
      }
      this.logger.log(`Maintenance record with ID ${id} updated`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error updating maintenance record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.maintenanceRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(
          `Maintenance record with ID ${id} not found`,
        );
      }
      this.logger.log(`Maintenance record with ID ${id} removed`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error removing maintenance record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }
}
