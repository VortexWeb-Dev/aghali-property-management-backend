import { Module } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Maintenance])],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {}
