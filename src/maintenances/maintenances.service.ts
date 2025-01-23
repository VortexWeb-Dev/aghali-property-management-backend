import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenancesService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  create(createMaintenanceDto: CreateMaintenanceDto) {
    const maintenance = this.maintenanceRepository.create(createMaintenanceDto);
    return this.maintenanceRepository.save(maintenance);
  }

  findAll() {
    return this.maintenanceRepository.find();
  }

  findOne(id: number) {
    return this.maintenanceRepository.findOne({ where: { id }, relations: ['property', 'tenant'] });
  }

  update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return this.maintenanceRepository.update(id, updateMaintenanceDto);
  }

  remove(id: number) {
    return this.maintenanceRepository.delete(id);
  }
}
