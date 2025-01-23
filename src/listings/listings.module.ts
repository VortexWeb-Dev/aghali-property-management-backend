import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { PropertiesModule } from 'src/properties/properties.module';
import { Contact } from 'src/contacts/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, Contact]),
    PropertiesModule,
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
