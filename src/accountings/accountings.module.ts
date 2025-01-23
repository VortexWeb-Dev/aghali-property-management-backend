import { Module } from '@nestjs/common';
import { AccountingsService } from './accountings.service';
import { AccountingsController } from './accountings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounting } from './entities/accounting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounting])],
  controllers: [AccountingsController],
  providers: [AccountingsService],
})
export class AccountingsModule {}
